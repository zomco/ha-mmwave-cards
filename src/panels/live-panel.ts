import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import type { CalibrationConfig, RadarTarget, TransformResult } from "../types";
import type { RadarModelAdapter } from "../models";
import {
  setupCanvas, drawBase, drawPolygon, drawRadarIcon, drawTarget,
  roomToCanvas, type CanvasMetrics,
} from "../utils/canvas";
import { TRAIL_MAX_MS } from "../const";
import { localize } from "../localize/localize";

interface TrailPoint { x: number; y: number; t: number }

@customElement("mmwave-live-panel")
export class LivePanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = "en";
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  /** Targets already transformed by the card (room coords populated). */
  @property({ attribute: false }) targets: RadarTarget[] = [];
  @property({ type: Boolean }) present = false;

  private _trail: TrailPoint[] = [];
  @query("#live-cv") private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) { return localize(k, this.lang); }

  connectedCallback() {
    super.connectedCallback();
    this._rafId = requestAnimationFrame(() => this._draw());
  }
  disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }

  /** Called by the card when a new reading arrives. */
  public addTrailPoints(targets: RadarTarget[]) {
    const now = Date.now();
    for (const t of targets) {
      if (t.room?.inBoundary) {
        this._trail.push({ x: t.room.roomX, y: t.room.roomY, t: now });
      }
    }
    const cutoff = now - TRAIL_MAX_MS;
    this._trail = this._trail.filter(p => p.t > cutoff);
  }

  public clearTrail() { this._trail = []; }

  private _m(): CanvasMetrics {
    return { W: this._cv?.offsetWidth ?? 400, H: 210, roomW: this.roomW, roomD: this.roomD };
  }

  private _draw() {
    const cv = this._cv;
    if (cv) {
      const ctx = setupCanvas(cv, 210);
      const m   = this._m();
      drawBase(ctx, m);
      drawPolygon(ctx, this.calibration.polygon, m);

      // Radar icon
      const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
      drawRadarIcon(ctx, rp.cx, rp.cy, this.calibration.yaw, this.adapter.info.fovDegrees);

      // Time-faded trail
      if (this._trail.length > 1) {
        const now = Date.now();
        this._trail.forEach((p, i) => {
          if (i === 0) return;
          const prev = this._trail[i-1];
          const age  = (now - p.t) / TRAIL_MAX_MS;
          const a    = Math.max(0, 0.5 - age*0.5);
          const pa   = roomToCanvas(prev.x, prev.y, m);
          const pb   = roomToCanvas(p.x, p.y, m);
          ctx.beginPath(); ctx.moveTo(pa.cx, pa.cy); ctx.lineTo(pb.cx, pb.cy);
          ctx.strokeStyle = `rgba(100,181,246,${a})`; ctx.lineWidth = 2; ctx.stroke();
        });
      }

      // Targets
      for (const t of this.targets) {
        if (!t.room) continue;
        const cp = roomToCanvas(t.room.roomX, t.room.roomY, m);
        drawTarget(ctx, cp.cx, cp.cy, t.room.inBoundary);
        // Target index label for multi-target models
        if (this.adapter.info.maxTargets > 1) {
          ctx.fillStyle = "rgba(255,255,255,.7)";
          ctx.font = "9px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(String(t.index + 1), cp.cx, cp.cy - 14);
          ctx.textBaseline = "alphabetic";
        }
      }
    }
    this._rafId = requestAnimationFrame(() => this._draw());
  }

  // ── status helpers ─────────────────────────────────────────────────────────

  private _badgeText(): string {
    if (!this.present) return this._L("live.badge_none");
    const insideCount = this.targets.filter(t => t.room?.inBoundary).length;
    if (insideCount === 0) return this._L("live.badge_filtered");
    return this._L("live.badge_present");
  }

  private _badgeCls(): string {
    if (!this.present) return "";
    const inside = this.targets.some(t => t.room?.inBoundary);
    return inside ? "on" : "filtered";
  }

  /** First inside-boundary target (for coordinate display). */
  private _primaryTarget(): TransformResult | undefined {
    return this.targets.find(t => t.room?.inBoundary)?.room;
  }

  protected render() {
    const pos = this._primaryTarget();
    return html`
      <div class="live-hdr">
        <span class="live-title">${this._L("live.title")}</span>
        <span class="badge ${this._badgeCls()}">${this._badgeText()}</span>
      </div>
      <canvas id="live-cv"></canvas>
      <div class="coords">
        <div class="cbox">
          <div class="cval">${pos ? Math.round(pos.roomX) : "—"}</div>
          <div class="clbl">${this._L("live.room_x")}</div>
        </div>
        <div class="cbox">
          <div class="cval">${pos ? Math.round(pos.roomY) : "—"}</div>
          <div class="clbl">${this._L("live.room_y")}</div>
        </div>
        ${this.adapter.info.hasZAxis ? html`
          <div class="cbox">
            <div class="cval">${pos ? Math.round(pos.heightFloor) : "—"}</div>
            <div class="clbl">${this._L("live.height")}</div>
          </div>` : nothing}
        ${this.adapter.info.maxTargets > 1 ? html`
          <div class="cbox">
            <div class="cval">${this.targets.filter(t => t.room?.inBoundary).length}</div>
            <div class="clbl">${this._L("live.targets")}</div>
          </div>` : nothing}
      </div>`;
  }

  static styles = css`
    :host { display:block; }
    .live-hdr { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px; }
    .live-title { font-size:12px;color:var(--secondary-text-color); }
    .badge {
      font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;
      padding:3px 10px;border-radius:20px;
      background:rgba(128,128,128,.12);color:var(--secondary-text-color);transition:all .3s;
    }
    .badge.on { background:rgba(3,169,244,.2);color:var(--primary-color,#64b5f6); }
    .badge.filtered { background:rgba(244,67,54,.15);color:#ef9a9a; }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;
    }
    .coords { display:flex;gap:6px;margin-top:9px; }
    .cbox {
      flex:1;text-align:center;padding:8px;
      background:rgba(128,128,128,.06);
      border:1px solid var(--divider-color,rgba(128,128,128,.15));border-radius:8px;
    }
    .cval { font-size:17px;font-weight:600;color:var(--primary-color,#64b5f6);font-variant-numeric:tabular-nums; }
    .clbl { font-size:10px;color:var(--secondary-text-color);margin-top:2px; }
  `;
}

declare global { interface HTMLElementTagNameMap { "mmwave-live-panel": LivePanel } }