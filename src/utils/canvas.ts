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

// ── Radar FOV — annular sector(s) + icon ─────────────────────────────────────

/**
 * Draw the radar detection zone as one or two annular sectors, then
 * overlay the radar icon at (cx, cy).
 *
 * Geometry (Y-down coordinate system):
 *   yaw = 0  → fan points straight DOWN (+Y, toward foot of bed)
 *   yaw clockwise positive
 *
 * When vitalRangeM is provided (e.g. R60ABD1):
 *   Inner annulus  minRangeM … vitalRangeM : breathing / heart-rate zone (brighter)
 *   Outer annulus  vitalRangeM … maxRangeM  : presence / sleep zone (dimmer)
 *   Blind arc      < minRangeM              : dashed, no detection
 *
 * @param fovDeg      Full FOV angle in degrees (e.g. 40 for R60ABD1)
 * @param minRangeM   Inner blind-zone boundary (m)
 * @param maxRangeM   Outer range limit (m)
 * @param vitalRangeM Optional split between vital-sign and presence ranges (m)
 * @param m           Canvas metrics for cm→px scale
 */
export function drawRadarFov(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  yawDeg: number,
  fovDeg: number,
  minRangeM: number,
  maxRangeM: number,
  m: CanvasMetrics,
  vitalRangeM?: number,
): void {
  // Use geometric-mean scale so range rings are circular even in non-square rooms
  const scaleX = m.W / m.roomW;   // px per cm
  const scaleY = m.H / m.roomD;
  const scale  = Math.sqrt(scaleX * scaleY);  // px per cm (geometric mean)

  const toPx = (rangeM: number) => rangeM * 100 * scale;

  const minR    = toPx(minRangeM);
  const maxR    = toPx(maxRangeM);
  const halfFov = (fovDeg / 2) * (Math.PI / 180);
  // yaw=0 → pointing down (+Y) = π/2 in canvas coords; clockwise yaw adds to angle
  const base    = (Math.PI / 2) + yawDeg * (Math.PI / 180);

  // Helper: draw one filled annular sector
  const annulus = (r1: number, r2: number, fill: string, stroke: string, lw = 1) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r2, base - halfFov, base + halfFov, false);   // outer arc CW
    ctx.arc(cx, cy, r1, base + halfFov, base - halfFov, true);    // inner arc CCW
    ctx.closePath();
    ctx.fillStyle   = fill;   ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
  };

  if (vitalRangeM != null && vitalRangeM < maxRangeM) {
    const vitalR = toPx(vitalRangeM);
    // Outer zone: presence / sleep  (dimmer)
    annulus(vitalR, maxR,
      "rgba(100,181,246,.04)",
      "rgba(100,181,246,.18)");
    // Inner zone: breathing / heart rate (brighter)
    annulus(minR, vitalR,
      "rgba(100,181,246,.11)",
      "rgba(100,181,246,.45)", 1.2);
  } else {
    // Single zone (no vital-sign split)
    annulus(minR, maxR,
      "rgba(100,181,246,.07)",
      "rgba(100,181,246,.30)");
  }

  // Blind zone boundary — dashed arc at minRange
  if (minR > 2) {
    ctx.beginPath();
    ctx.arc(cx, cy, minR, base - halfFov, base + halfFov, false);
    ctx.strokeStyle = "rgba(244,67,54,.35)";
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Range labels along the radar's forward direction
  const labelDir = { lx: Math.cos(base), ly: Math.sin(base) };
  const drawLabel = (rangeM: number, r: number, color: string) => {
    const lx = cx + r * labelDir.lx;
    const ly = cy + r * labelDir.ly;
    ctx.font         = "bold 8px system-ui";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = color;
    // Small pill background
    const txt   = `${rangeM}m`;
    const tw    = ctx.measureText(txt).width + 6;
    ctx.fillStyle = "rgba(15,15,30,.7)";
    ctx.fillRect(lx - tw/2, ly - 6, tw, 12);
    ctx.fillStyle = color;
    ctx.fillText(txt, lx, ly);
    ctx.textBaseline = "alphabetic";
  };

  if (vitalRangeM != null) {
    drawLabel(vitalRangeM, toPx(vitalRangeM), "rgba(100,181,246,.9)");
  }
  drawLabel(maxRangeM, maxR, "rgba(100,181,246,.65)");

  // ── Radar icon (drawn on top of FOV) ───────────────────────────────────────
  ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  ctx.fillStyle   = "rgba(15,15,30,.9)"; ctx.fill();
  ctx.strokeStyle = "rgba(100,181,246,.9)"; ctx.lineWidth = 1.5; ctx.stroke();

  for (const [dx, dy] of [[7,0],[-7,0],[0,7],[0,-7]] as [number,number][]) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * 0.3, cy + dy * 0.3);
    ctx.lineTo(cx + dx, cy + dy);
    ctx.strokeStyle = "rgba(100,181,246,.65)"; ctx.lineWidth = 1.2; ctx.stroke();
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