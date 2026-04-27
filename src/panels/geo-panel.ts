import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { CalibrationConfig } from "../types";
import type { RadarModelAdapter } from "../models";
import {
  setupCanvas, drawBase, drawPolygon,
  eventToCanvasPt,
  type CanvasMetrics,
} from "../utils/canvas";
import { localize } from "../localize/localize";

@customElement("mmwave-geo-panel")
export class GeoPanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = "en";

  @query("#poly-cv") private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) { return localize(k, this.lang); }

  connectedCallback() {
    super.connectedCallback();
    this._rafId = requestAnimationFrame(() => this._draw());
  }
  disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }

  // ── emit calibration-changed ───────────────────────────────────────────────

  private _emit(patch: Partial<CalibrationConfig>) {
    this.dispatchEvent(new CustomEvent("calibration-changed",
      { detail: { ...this.calibration, ...patch }, bubbles: true, composed: true }));
  }

  // ── polygon interactions ───────────────────────────────────────────────────

  private _onCanvasClick(e: MouseEvent) {
    const cv = this._cv; if (!cv) return;
    const pt = eventToCanvasPt(e, cv);
    const dpr = window.devicePixelRatio || 1;
    this.dispatchEvent(new CustomEvent("polygon-point-added",
      { detail: { canvasX: pt.x / dpr, canvasY: pt.y / dpr }, bubbles: true, composed: true }));
  }

  private _undo()  { const p = [...this.calibration.polygon]; p.pop();   this._emit({ polygon: p }); }
  private _clear() { this._emit({ polygon: [] }); }

  // ── canvas draw ────────────────────────────────────────────────────────────

  private _draw() {
    const cv = this._cv;
    if (cv) {
      // room dimensions are stored on the element by the card (as data attributes)
      const roomW = parseFloat(cv.dataset.roomW ?? "400");
      const roomD = parseFloat(cv.dataset.roomD ?? "350");
      const cssH  = 165;
      const ctx   = setupCanvas(cv, cssH);
      const m: CanvasMetrics = { W: cv.offsetWidth || 400, H: cssH, roomW, roomD };
      drawBase(ctx, m);
      drawPolygon(ctx, this.calibration.polygon, m);
    }
    this._rafId = requestAnimationFrame(() => this._draw());
  }

  // ── helpers ────────────────────────────────────────────────────────────────

  private _numField(label: string, key: keyof CalibrationConfig, value: number, step = 5, min = -9999) {
    return html`
      <div class="field">
        <label>${label}</label>
        <input type="number" .value=${String(value)} step=${step} min=${min}
          @change=${(e: Event) => {
            const v = parseFloat((e.target as HTMLInputElement).value) || 0;
            this._emit({ [key]: v } as Partial<CalibrationConfig>);
          }}>
        <span class="unit">cm</span>
      </div>`;
  }

  private _degField(label: string, key: keyof CalibrationConfig, value: number, min = -180, max = 180) {
    return html`
      <div class="field">
        <label>${label}</label>
        <input type="number" .value=${String(value)} step="0.5" min=${min} max=${max}
          @change=${(e: Event) => {
            const v = parseFloat((e.target as HTMLInputElement).value) || 0;
            this._emit({ [key]: v } as Partial<CalibrationConfig>);
          }}>
        <span class="unit">°</span>
      </div>`;
  }

  // ── render ─────────────────────────────────────────────────────────────────

  protected render() {
    const c  = this.calibration;
    const pn = c.polygon.length;
    const hint = pn >= 3
      ? this._L("geo.poly_hint_ok").replace("{n}", String(pn))
      : this._L("geo.poly_hint_none");

    return html`
      <p class="sec-title">${this._L("geo.install_params")}</p>
      ${this._numField(this._L("geo.radar_x"),      "radar_x",      c.radar_x)}
      ${this._numField(this._L("geo.radar_y"),      "radar_y",      c.radar_y)}
      ${this._numField(this._L("geo.radar_height"), "radar_height", c.radar_height, 5, 0)}
      ${this._degField(this._L("geo.yaw_rough"),    "yaw",          c.yaw)}
      ${this._degField(this._L("geo.pitch"),        "pitch",        c.pitch, -90, 90)}
      ${this._degField(this._L("geo.roll"),         "roll",         c.roll,  -90, 90)}
      <p class="note">${this._L("geo.geo_note")}</p>

      <p class="sec-title" style="margin-top:14px">${this._L("geo.boundary")}</p>
      <div class="poly-bar">
        <span class="poly-hint ${pn >= 3 ? "ok" : ""}">${hint}</span>
        <div class="poly-btns">
          <button class="pbtn" @click=${this._undo}>${this._L("geo.poly_undo")}</button>
          <button class="pbtn" @click=${this._clear}>${this._L("geo.poly_clear")}</button>
        </div>
      </div>
      <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
      <p class="note">${this._L("geo.boundary_note")}</p>
    `;
  }

  static styles = css`
    :host { display: block; }
    .sec-title {
      font-size:10px;letter-spacing:.07em;text-transform:uppercase;
      color:var(--secondary-text-color);margin:0 0 8px;
    }
    .field {
      display:flex;align-items:center;gap:8px;padding:8px 10px;margin-bottom:5px;
      background:rgba(128,128,128,.06);
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      border-radius:8px;transition:border-color .15s;
    }
    .field:focus-within { border-color:var(--primary-color); }
    .field label { font-size:12px;color:var(--secondary-text-color);width:90px;flex-shrink:0; }
    .field input {
      flex:1;background:none;border:none;outline:none;
      font-size:13px;font-weight:500;text-align:right;
      color:var(--primary-text-color);
    }
    .unit { font-size:11px;color:var(--secondary-text-color);min-width:18px;text-align:right; }
    .note {
      font-size:10px;color:var(--secondary-text-color);line-height:1.6;
      margin:5px 0;padding:7px 9px;white-space:pre-line;
      background:rgba(128,128,128,.04);
      border-left:2px solid var(--divider-color);border-radius:0 5px 5px 0;
    }
    .poly-bar { display:flex;align-items:center;justify-content:space-between;margin-bottom:6px; }
    .poly-hint { font-size:11px;color:var(--secondary-text-color); }
    .poly-hint.ok { color:var(--success-color,#4caf50); }
    .poly-btns { display:flex;gap:4px; }
    .pbtn {
      background:rgba(128,128,128,.1);border:1px solid var(--divider-color);
      border-radius:6px;padding:3px 9px;font-size:11px;
      color:var(--secondary-text-color);cursor:pointer;
    }
    .pbtn:hover { background:rgba(128,128,128,.2); }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;cursor:crosshair;
    }
  `;
}

declare global { interface HTMLElementTagNameMap { "mmwave-geo-panel": GeoPanel } }