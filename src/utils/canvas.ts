/**
 * canvas.ts — shared drawing utilities
 *
 * Coordinate system (v2, per user spec):
 *   Origin : top-left corner of the canvas / room map
 *   X axis : left → right  (positive rightward)
 *   Y axis : top  → bottom (positive downward, toward foot of bed)
 *
 * This is the standard screen/CSS coordinate convention.
 * roomToCanvas and canvasToRoom map with Y going down — NO Y-flip.
 */

import type { Vec2 } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CanvasMetrics {
  W:     number;   // canvas CSS width  (px)
  H:     number;   // canvas CSS height (px)
  roomW: number;   // room width  (cm)
  roomD: number;   // room depth  (cm)
}

// ── Coordinate helpers ────────────────────────────────────────────────────────

/** Room cm → canvas CSS pixels.  Y down = positive (top-left origin). */
export const roomToCanvas = (x: number, y: number, m: CanvasMetrics) => ({
  cx:  (x / m.roomW) * m.W,
  cy:  (y / m.roomD) * m.H,   // Y down — no flip
});

/** Canvas CSS pixels → room cm. */
export const canvasToRoom = (cx: number, cy: number, m: CanvasMetrics): Vec2 => ({
  x: (cx / m.W) * m.roomW,
  y: (cy / m.H) * m.roomD,    // Y down — no flip
});

/**
 * Convert a mouse/touch event to canvas CSS-pixel coordinates.
 * Accounts for canvas scaling (DPR) vs CSS layout size.
 * Returns CSS-pixel coords (NOT device pixels).
 */
export function eventToCanvasPt(
  e: MouseEvent | TouchEvent,
  cv: HTMLCanvasElement,
): Vec2 {
  const rect    = cv.getBoundingClientRect();
  // css-pixel scale factor (offsetWidth / canvas.width = 1/dpr)
  const sx = rect.width  / cv.width;
  const sy = rect.height / cv.height;
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  // canvas.width is in device pixels; divide by dpr ratio to get CSS pixels
  return {
    x: (clientX - rect.left) / sx / (cv.width  / rect.width),
    y: (clientY - rect.top)  / sy / (cv.height / rect.height),
  };
}

// Simplified: just return CSS pixel position within canvas
export function eventToCanvasCssPt(
  e: MouseEvent | TouchEvent,
  cv: HTMLCanvasElement,
): Vec2 {
  const rect = cv.getBoundingClientRect();
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

// ── Canvas setup ──────────────────────────────────────────────────────────────

/**
 * Resize the canvas physical pixels to match CSS layout size (DPR-aware).
 * Must be called AFTER the element has been laid out (offsetWidth > 0).
 * Returns a 2D context already scaled for DPR.
 */
export function setupCanvas(
  cv: HTMLCanvasElement,
  cssH: number,
): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  const W   = cv.offsetWidth || 400;
  cv.width        = W   * dpr;
  cv.height       = cssH * dpr;
  cv.style.height = `${cssH}px`;
  const ctx = cv.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return ctx;
}

// ── Base grid + axes ──────────────────────────────────────────────────────────

/**
 * Draw the background grid, room border, scale bar, and axis labels.
 *
 * Axis convention displayed on canvas:
 *   X→  label at top edge (right side)
 *   Y↓  label at left edge (bottom side)
 *   "0" at top-left corner
 */
export function drawBase(ctx: CanvasRenderingContext2D, m: CanvasMetrics): void {
  ctx.clearRect(0, 0, m.W, m.H);

  // Grid
  ctx.strokeStyle = "rgba(128,128,128,.06)";
  ctx.lineWidth   = 0.5;
  for (let x = 0; x < m.W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, m.H); ctx.stroke();
  }
  for (let y = 0; y < m.H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(m.W, y); ctx.stroke();
  }

  // Room border
  ctx.strokeStyle = "rgba(255,255,255,.15)";
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(1, 1, m.W - 2, m.H - 2);

  // Scale bar (bottom-right area, horizontal = X direction)
  const swCm  = Math.round(m.roomW / 4 / 100) * 100 || 100; // ~25% of room width
  const swPx  = (swCm / m.roomW) * m.W;
  const barY  = m.H - 10;
  const barX  = m.W - swPx - 8;
  ctx.beginPath();
  ctx.moveTo(barX, barY); ctx.lineTo(barX + swPx, barY);
  ctx.strokeStyle = "rgba(255,255,255,.35)";
  ctx.lineWidth   = 1.2;
  ctx.stroke();
  // tick marks
  ctx.beginPath();
  ctx.moveTo(barX, barY - 3); ctx.lineTo(barX, barY + 3);
  ctx.moveTo(barX + swPx, barY - 3); ctx.lineTo(barX + swPx, barY + 3);
  ctx.stroke();
  ctx.fillStyle    = "rgba(255,255,255,.45)";
  ctx.font         = "9px system-ui";
  ctx.textAlign    = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(`${swCm}cm`, barX + swPx / 2, barY - 3);

  // Axis labels
  ctx.font      = "bold 9px system-ui";
  ctx.fillStyle = "rgba(100,181,246,.6)";

  // X→ at top-right
  ctx.textAlign    = "right";
  ctx.textBaseline = "top";
  ctx.fillText("X →", m.W - 4, 4);

  // Y↓ at bottom-left
  ctx.textAlign    = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("Y ↓", 4, m.H - 4);

  // Origin "0" at top-left
  ctx.textAlign    = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(255,255,255,.3)";
  ctx.fillText("0", 4, 4);

  ctx.textBaseline = "alphabetic"; // reset
}

// ── Polygon ───────────────────────────────────────────────────────────────────

export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  poly: Vec2[],
  m: CanvasMetrics,
  faded = false,
): void {
  if (poly.length < 2) return;
  const pts = poly.map(p => roomToCanvas(p.x, p.y, m));
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy)));
  if (poly.length >= 3) {
    ctx.closePath();
    ctx.fillStyle = faded ? "rgba(100,181,246,.04)" : "rgba(100,181,246,.07)";
    ctx.fill();
  }
  ctx.strokeStyle = faded ? "rgba(100,181,246,.22)" : "rgba(100,181,246,.55)";
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  if (!faded) {
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.cx, p.cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,181,246,.8)"; ctx.fill();
    });
  }
}

// ── Radar icon + FOV fan ──────────────────────────────────────────────────────

/**
 * Draw the radar icon with its FOV fan.
 *
 * @param fovDeg  Full FOV angle in degrees (from the model's RadarModelInfo).
 *                R60ABD1 = 40°.  LD2450 = 120°.
 * @param yawDeg  Yaw calibration angle (°).  0 = fan points downward on canvas
 *                (toward Y+, i.e., away from radar toward foot of bed).
 */
export function drawRadarIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  yawDeg: number,
  fovDeg: number,   // REQUIRED — no default, caller must pass adapter.info.fovDegrees
): void {
  const halfFov = (fovDeg / 2) * (Math.PI / 180);
  const R       = 70;
  // yaw=0 → fan points DOWN (+Y direction on canvas), so base angle = 90°
  const base    = (90 + yawDeg) * (Math.PI / 180);

  // FOV fan
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  for (let a = -halfFov; a <= halfFov; a += 0.03) {
    ctx.lineTo(cx + Math.cos(base + a) * R, cy + Math.sin(base + a) * R);
  }
  ctx.closePath();
  ctx.fillStyle   = "rgba(100,181,246,.08)";
  ctx.fill();
  ctx.strokeStyle = "rgba(100,181,246,.28)";
  ctx.lineWidth   = 1;
  ctx.stroke();

  // Radar circle
  ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  ctx.fillStyle   = "rgba(15,15,30,.85)"; ctx.fill();
  ctx.strokeStyle = "rgba(100,181,246,.85)"; ctx.lineWidth = 1.5; ctx.stroke();

  // Cross hairs
  for (const [dx, dy] of [[7,0],[-7,0],[0,7],[0,-7]] as [number,number][]) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * 0.3, cy + dy * 0.3);
    ctx.lineTo(cx + dx, cy + dy);
    ctx.strokeStyle = "rgba(100,181,246,.6)"; ctx.lineWidth = 1.2; ctx.stroke();
  }
}

// ── Target dot ────────────────────────────────────────────────────────────────

export function drawTarget(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  inBoundary: boolean,
): void {
  if (inBoundary) {
    ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100,181,246,.15)"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "var(--primary-color,#64b5f6)"; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 1.5; ctx.stroke();
  } else {
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(244,67,54,.5)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(244,67,54,.7)"; ctx.lineWidth = 1.5; ctx.stroke();
  }
}

// ── Reference-point dot ───────────────────────────────────────────────────────

export function drawDot(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  label: string,
  color: string,
  hollow = false,
): void {
  ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
  if (hollow) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.stroke();
  } else {
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 1.2; ctx.stroke();
  }
  ctx.fillStyle    = hollow ? color : "#fff";
  ctx.font         = "bold 9px system-ui";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  ctx.textBaseline = "alphabetic";
}