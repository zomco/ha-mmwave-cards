import { LitElement, html, css } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { CalibrationConfig, YawCalibState } from "../types";
import type { RadarModelAdapter } from "../models";
import {
  setupCanvas, drawBase, drawPolygon, drawRadarIcon, drawDot,
  roomToCanvas, canvasToRoom, eventToCanvasPt, type CanvasMetrics,
} from "../utils/canvas";
import { applyTransform, calcYawFromTwoPoints, calcCalibrationResidual } from "../utils/transform";
import { localize } from "../localize/localize";

@customElement("mmwave-yaw-panel")
export class YawPanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = "en";
  /** Room dimensions (cm) — needed for canvas ↔ room coordinate conversion. */
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;

  @state() private _yw: YawCalibState = { sub: 0, capturing: false };

  @query("#yaw-cv") private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) { return localize(k, this.lang); }

  connectedCallback() {
    super.connectedCallback();
    this._rafId = requestAnimationFrame(() => this._draw());
  }
  disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }

  // ── public API called by the card when a new radar reading arrives ────────

  public offerReading(rawX: number, rawY: number): void {
    if (!this._yw.capturing) return;
    this._capture(rawX, rawY);
    this._yw = { ...this._yw, capturing: false };
  }

  // ── canvas interaction ────────────────────────────────────────────────────

  private _m(): CanvasMetrics {
    const cv = this._cv;
    return { W: cv?.offsetWidth ?? 400, H: 155, roomW: this.roomW, roomD: this.roomD };
  }

  private _onCanvasClick(e: MouseEvent) {
    const cv = this._cv; if (!cv) return;
    const yw = this._yw;
    if (yw.sub !== 0 && yw.sub !== 1) return;
    const dpr = window.devicePixelRatio || 1;
    const raw = eventToCanvasPt(e, cv);
    const pt  = { x: raw.x / dpr, y: raw.y / dpr };

    if (yw.sub === 0) {
      this._yw = { ...yw, refA: { canvasPt: pt }, sub: 0.5 };
    } else {
      this._yw = { ...yw, refB: { canvasPt: pt }, sub: 1.5 };
    }
    this.requestUpdate();
  }

  private _onCapture() {
    this._yw = { ...this._yw, capturing: true };
    this.dispatchEvent(new CustomEvent("capture-requested", { bubbles: true, composed: true }));
  }

  private _capture(rawX: number, rawY: number) {
    const yw = this._yw;
    if (yw.sub === 0.5 && yw.refA) {
      this._yw = { ...yw, refA: { ...yw.refA, detPt: { x: rawX, y: rawY } }, sub: 1 };
    } else if (yw.sub === 1.5 && yw.refB) {
      this._yw = { ...yw, refB: { ...yw.refB, detPt: { x: rawX, y: rawY } }, sub: 2 };
      this._computeYaw();
    }
  }

  private _computeYaw() {
    const yw = this._yw;
    if (!yw.refA?.detPt || !yw.refB?.detPt) return;
    const m = this._m();
    const mapA = canvasToRoom(yw.refA.canvasPt.x, yw.refA.canvasPt.y, m);
    const mapB = canvasToRoom(yw.refB.canvasPt.x, yw.refB.canvasPt.y, m);
    const detA = yw.refA.detPt, detB = yw.refB.detPt;
    const newYaw  = calcYawFromTwoPoints(mapA, mapB, detA, detB);
    const updCal  = { ...this.calibration, yaw: newYaw };
    const residual = calcCalibrationResidual(mapA, mapB, detA, detB, updCal);
    this._yw = { ...this._yw, residual };
    this.dispatchEvent(new CustomEvent("calibration-changed",
      { detail: updCal, bubbles: true, composed: true }));
  }

  // ── canvas draw ────────────────────────────────────────────────────────────

  private _draw() {
    const cv = this._cv;
    if (cv) {
      const ctx = setupCanvas(cv, 155);
      const m   = this._m();
      drawBase(ctx, m);
      drawPolygon(ctx, this.calibration.polygon, m, true);
      const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
      drawRadarIcon(ctx, rp.cx, rp.cy, this.calibration.yaw, this.adapter.info.fovDegrees);

      const drawRef = (ref: typeof this._yw.refA, label: string) => {
        if (!ref) return;
        drawDot(ctx, ref.canvasPt.x, ref.canvasPt.y, label, "#64b5f6");
        if (ref.detPt) {
          const tr  = applyTransform(ref.detPt.x, ref.detPt.y, 0, this.calibration);
          const det = roomToCanvas(tr.roomX, tr.roomY, m);
          ctx.beginPath(); ctx.moveTo(ref.canvasPt.x, ref.canvasPt.y); ctx.lineTo(det.cx, det.cy);
          ctx.strokeStyle = "rgba(244,99,99,.4)"; ctx.lineWidth = 1;
          ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
          drawDot(ctx, det.cx, det.cy, label, "rgba(244,99,99,.85)", true);
        }
      };
      drawRef(this._yw.refA, "A");
      drawRef(this._yw.refB, "B");
    }
    this._rafId = requestAnimationFrame(() => this._draw());
  }

  // ── render ─────────────────────────────────────────────────────────────────

  private _refStep(step: 0 | 1) {
    const yw  = this._yw;
    // Normalise sub relative to this step (step 0 uses sub as-is; step 1 uses sub-1)
    const rel = step === 0 ? yw.sub : yw.sub - 1;
    const cls = rel >= 1 ? "done" : rel >= 0 ? "act" : "";
    const isA = step === 0;
    const sub =
      rel >= 1    ? this._L(isA ? "yaw.ref_a_done"   : "yaw.ref_b_done") :
      rel === 0.5 ? this._L(isA ? "yaw.ref_a_marked" : "yaw.ref_b_marked") :
      rel === 0   ? this._L(isA ? "yaw.ref_a_idle"   : "yaw.ref_b_step") :
                    this._L("yaw.ref_b_idle");

    return html`
      <div class="ref-step ${cls}">
        <div class="ref-num">${rel >= 1 ? "✓" : isA ? "A" : "B"}</div>
        <div>
          <div class="ref-title">${this._L(isA ? "yaw.ref_a_title" : "yaw.ref_b_title")}</div>
          <div class="ref-sub">${sub}</div>
        </div>
      </div>`;
  }

  protected render() {
    const yw     = this._yw;
    const canCap = yw.sub === 0.5 || yw.sub === 1.5;
    const ok     = yw.sub >= 2;
    const resText = ok
      ? this._L("yaw.result_ok")
          .replace("{yaw}",      String(this.calibration.yaw))
          .replace("{residual}", String((yw.residual ?? 0).toFixed(1)))
      : this._L("yaw.result_idle");

    return html`
      ${this._refStep(0)}
      ${this._refStep(1)}
      <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
      <button class="cap-btn" ?disabled=${!canCap || yw.capturing} @click=${this._onCapture}>
        ${yw.capturing ? this._L("yaw.capture_wait") : this._L("yaw.capture_btn")}
      </button>
      <div class="result-line ${ok ? "ok" : ""}">${resText}</div>
    `;
  }

  static styles = css`
    :host { display:block; }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;cursor:crosshair;
      margin:8px 0;
    }
    .ref-step {
      display:flex;align-items:center;gap:9px;padding:8px 10px;
      border-radius:8px;border:1px solid var(--divider-color);
      margin-bottom:5px;transition:all .22s;
    }
    .ref-step.act { border-color:var(--primary-color);background:rgba(3,169,244,.07); }
    .ref-step.done { border-color:var(--success-color,#4caf50);background:rgba(76,175,80,.05); }
    .ref-num {
      width:21px;height:21px;border-radius:50%;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:700;
      background:var(--divider-color);color:var(--secondary-text-color);transition:all .2s;
    }
    .ref-step.act .ref-num { background:var(--primary-color);color:#fff; }
    .ref-step.done .ref-num { background:var(--success-color,#4caf50);color:#fff; }
    .ref-title { font-size:12px;font-weight:500; }
    .ref-sub { font-size:11px;color:var(--secondary-text-color);margin-top:1px; }
    .cap-btn {
      width:100%;margin-top:9px;
      background:rgba(3,169,244,.12);border:1px solid rgba(3,169,244,.35);
      border-radius:8px;padding:9px;font-size:13px;font-weight:500;
      cursor:pointer;color:var(--primary-color);transition:background .15s;
    }
    .cap-btn:disabled { opacity:.4;cursor:not-allowed; }
    .cap-btn:not(:disabled):hover { background:rgba(3,169,244,.22); }
    .result-line { font-size:11px;text-align:center;min-height:15px;margin-top:5px;color:var(--secondary-text-color); }
    .result-line.ok { color:var(--success-color,#4caf50); }
  `;
}

declare global { interface HTMLElementTagNameMap { "mmwave-yaw-panel": YawPanel } }