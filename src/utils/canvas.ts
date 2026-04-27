/** Shared canvas drawing utilities (model-agnostic). */

import type { Vec2 } from "../types";

export interface CanvasMetrics { W: number; H: number; roomW: number; roomD: number }

export const roomToCanvas = (x: number, y: number, m: CanvasMetrics) =>
  ({ cx: (x / m.roomW) * m.W, cy: m.H - (y / m.roomD) * m.H });

export const canvasToRoom = (cx: number, cy: number, m: CanvasMetrics): Vec2 =>
  ({ x: (cx / m.W) * m.roomW, y: ((m.H - cy) / m.H) * m.roomD });

export function eventToCanvasPt(e: MouseEvent | TouchEvent, cv: HTMLCanvasElement) {
  const r = cv.getBoundingClientRect();
  const sx = cv.width / r.width, sy = cv.height / r.height;
  const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
  const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
  return { x: (cx - r.left) * sx, y: (cy - r.top) * sy };
}

export function setupCanvas(cv: HTMLCanvasElement, cssH: number): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  const W   = cv.offsetWidth || 400;
  cv.width  = W * dpr; cv.height = cssH * dpr;
  cv.style.height = `${cssH}px`;
  const ctx = cv.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return ctx;
}

export function drawBase(ctx: CanvasRenderingContext2D, m: CanvasMetrics): void {
  ctx.clearRect(0, 0, m.W, m.H);
  ctx.strokeStyle = "rgba(128,128,128,.06)"; ctx.lineWidth = .5;
  for (let x = 0; x < m.W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,m.H); ctx.stroke(); }
  for (let y = 0; y < m.H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(m.W,y); ctx.stroke(); }
  ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, m.W-2, m.H-2);
  const sw = Math.round(m.roomW / 100) * 100;
  const sx = (sw / m.roomW) * m.W;
  ctx.beginPath(); ctx.moveTo(10, m.H-10); ctx.lineTo(10+sx, m.H-10);
  ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,.4)"; ctx.font = "9px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`${sw}cm`, 10+sx/2, m.H-14);
}

export function drawPolygon(ctx: CanvasRenderingContext2D, poly: Vec2[], m: CanvasMetrics, faded = false): void {
  if (poly.length < 2) return;
  const pts = poly.map(p => roomToCanvas(p.x, p.y, m));
  ctx.beginPath();
  pts.forEach((p,i) => i === 0 ? ctx.moveTo(p.cx,p.cy) : ctx.lineTo(p.cx,p.cy));
  if (poly.length >= 3) { ctx.closePath(); ctx.fillStyle = faded ? "rgba(100,181,246,.04)" : "rgba(100,181,246,.07)"; ctx.fill(); }
  ctx.strokeStyle = faded ? "rgba(100,181,246,.22)" : "rgba(100,181,246,.55)";
  ctx.lineWidth = 1.5; ctx.stroke();
  if (!faded) pts.forEach(p => { ctx.beginPath(); ctx.arc(p.cx,p.cy,3,0,Math.PI*2); ctx.fillStyle="rgba(100,181,246,.8)"; ctx.fill(); });
}

export function drawRadarIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, yawDeg: number, fovDeg = 100): void {
  const FOV = (fovDeg / 2) * (Math.PI / 180);
  const R = 65, yr = (yawDeg - 90) * (Math.PI / 180);
  ctx.beginPath(); ctx.moveTo(cx, cy);
  for (let a = -FOV; a <= FOV; a += .04) ctx.lineTo(cx+Math.cos(yr+a)*R, cy+Math.sin(yr+a)*R);
  ctx.closePath(); ctx.fillStyle = "rgba(100,181,246,.07)"; ctx.fill();
  ctx.strokeStyle = "rgba(100,181,246,.22)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx,cy,9,0,Math.PI*2);
  ctx.fillStyle = "rgba(15,15,30,.85)"; ctx.fill();
  ctx.strokeStyle = "rgba(100,181,246,.85)"; ctx.lineWidth = 1.5; ctx.stroke();
  ([[7,0],[-7,0],[0,-7],[0,7]] as [number,number][]).forEach(([dx,dy]) => {
    ctx.beginPath(); ctx.moveTo(cx+dx*.3,cy+dy*.3); ctx.lineTo(cx+dx,cy+dy);
    ctx.strokeStyle = "rgba(100,181,246,.65)"; ctx.lineWidth = 1.2; ctx.stroke();
  });
}

export function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, color: string, hollow = false): void {
  ctx.beginPath(); ctx.arc(x,y,7,0,Math.PI*2);
  if (hollow) { ctx.strokeStyle=color; ctx.lineWidth=1.8; ctx.stroke(); }
  else { ctx.fillStyle=color; ctx.fill(); ctx.strokeStyle="rgba(255,255,255,.5)"; ctx.lineWidth=1.2; ctx.stroke(); }
  ctx.fillStyle = hollow ? color : "#fff";
  ctx.font = "bold 9px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(label, x, y); ctx.textBaseline = "alphabetic";
}

/** Draw one target dot; color / style differs based on inBoundary. */
export function drawTarget(ctx: CanvasRenderingContext2D, cx: number, cy: number, inBoundary: boolean): void {
  if (inBoundary) {
    ctx.beginPath(); ctx.arc(cx,cy,9,0,Math.PI*2); ctx.fillStyle="rgba(100,181,246,.15)"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,5,0,Math.PI*2); ctx.fillStyle="var(--primary-color,#64b5f6)"; ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.6)"; ctx.lineWidth=1.5; ctx.stroke();
  } else {
    ctx.setLineDash([2,2]);
    ctx.beginPath(); ctx.arc(cx,cy,9,0,Math.PI*2); ctx.strokeStyle="rgba(244,67,54,.5)"; ctx.lineWidth=1.5; ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2); ctx.strokeStyle="rgba(244,67,54,.7)"; ctx.lineWidth=1.5; ctx.stroke();
  }
}