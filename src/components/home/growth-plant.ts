// Hình học của cây trên trang chủ khách. Mọi thứ được sinh ra một lần, xác định
// (PRNG có seed) để server và client vẽ ra đúng cùng một SVG.
//
// Hệ toạ độ: viewBox 1000 x 1400, mặt đất ở y = 1100, gốc cây ở x ~ 500.
// G (0..1) là "tuổi" của cây; mỗi phần tử có g0 (lúc bắt đầu mọc) và dur.

import type { LevelCode } from "@/lib/curriculum";

export const GROUND = 1100;
export const STEM_TOP = 172;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export function interp(table: readonly (readonly [number, number])[], x: number) {
  if (x <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    const [x1, y1] = table[i];
    if (x <= x1) {
      const [x0, y0] = table[i - 1];
      const f = (x - x0) / (x1 - x0 || 1);
      return y0 + (y1 - y0) * f;
    }
  }
  return table[table.length - 1][1];
}

// G -> độ cao đỉnh thân (y giảm khi cây cao lên).
export const STEM_TABLE = [
  [0, GROUND],
  [0.04, GROUND - 2],
  [0.12, 1035],
  [0.18, 995],
  [0.3, 900],
  [0.72, 470],
  [0.92, 250],
  [1, STEM_TOP],
] as const;

export function stemTopAt(g: number) {
  return interp(STEM_TABLE, g);
}

// Ngược lại: thân chạm tới độ cao y vào lúc G bằng bao nhiêu.
export function birthAt(y: number) {
  const inv = STEM_TABLE.map(([g, yy]) => [-yy, g] as const);
  return interp(inv, -y);
}

export function stemX(y: number) {
  const h = GROUND - y;
  return 500 + 14 * Math.sin(h / 150) - 5 * Math.sin(h / 61) * Math.min(1, h / 240);
}

// ---------------------------------------------------------------- stem ----
const stemPoints: [number, number][] = [];
for (let y = GROUND + 6; y >= STEM_TOP; y -= 8) stemPoints.push([stemX(y), y]);
if (stemPoints[stemPoints.length - 1][1] !== STEM_TOP) stemPoints.push([stemX(STEM_TOP), STEM_TOP]);

const stemCum: number[] = [0];
for (let i = 1; i < stemPoints.length; i++) {
  const [x0, y0] = stemPoints[i - 1];
  const [x1, y1] = stemPoints[i];
  stemCum.push(stemCum[i - 1] + Math.hypot(x1 - x0, y1 - y0));
}

export const STEM_PATH =
  "M" + stemPoints.map(([x, y]) => `${r2(x)} ${r2(y)}`).join(" L");
export const STEM_LENGTH = stemCum[stemCum.length - 1];

export function stemLengthTo(y: number) {
  if (y >= stemPoints[0][1]) return 0;
  for (let i = 1; i < stemPoints.length; i++) {
    if (stemPoints[i][1] <= y) {
      const y0 = stemPoints[i - 1][1];
      const y1 = stemPoints[i][1];
      const f = (y0 - y) / (y0 - y1 || 1);
      return stemCum[i - 1] + (stemCum[i] - stemCum[i - 1]) * f;
    }
  }
  return STEM_LENGTH;
}

// --------------------------------------------------------------- types ----
export interface LeafSpec {
  id: string;
  x: number;
  y: number;
  angle: number; // độ; 0 = sang phải, -90 = hướng lên
  len: number;
  width: number;
  fill: string;
  g0: number;
  dur: number;
  side: 1 | -1;
}

export interface StrokeSpec {
  id: string;
  d: string;
  len: number;
  g0: number;
  dur: number;
  width: number;
}

export interface FruitSpec {
  id: string;
  x: number;
  y: number;
  r: number;
  g0: number;
  dur: number;
}

export interface LevelTag {
  code: LevelCode;
  x: number;
  y: number;
  side: 1 | -1;
  index: number;
}

export interface GhostLeaf {
  id: string;
  x: number;
  y: number;
  angle: number;
  len: number;
  side: 1 | -1;
  word: string;
  index: number;
}

const FILLS = ["#a8cfae", "#93c49c", "#b8d9ba", "#86b990", "#9fcaa5"];

export function leafPath(len: number, w: number) {
  return (
    `M0 0 C${r2(len * 0.22)} ${r2(-w)} ${r2(len * 0.72)} ${r2(-w * 0.92)} ${r2(len)} 0 ` +
    `C${r2(len * 0.72)} ${r2(w * 0.92)} ${r2(len * 0.22)} ${r2(w)} 0 0Z`
  );
}

export function leafVeins(len: number, w: number) {
  let d = `M${r2(len * 0.05)} 0 Q${r2(len * 0.5)} ${r2(-w * 0.08)} ${r2(len * 0.93)} 0`;
  for (const f of [0.28, 0.48, 0.68]) {
    const x = len * f;
    const reach = w * (1 - Math.abs(f - 0.42) * 0.9) * 0.62;
    d += ` M${r2(x)} 0 Q${r2(x + len * 0.06)} ${r2(-reach * 0.5)} ${r2(x + len * 0.14)} ${r2(-reach)}`;
    d += ` M${r2(x)} 0 Q${r2(x + len * 0.06)} ${r2(reach * 0.5)} ${r2(x + len * 0.14)} ${r2(reach)}`;
  }
  return d;
}

function quadPoint(p0: number[], c: number[], p1: number[], t: number) {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1],
  ];
}

function quadAngle(p0: number[], c: number[], p1: number[], t: number) {
  const dx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const dy = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function quadLength(p0: number[], c: number[], p1: number[]) {
  let len = 0;
  let prev = p0;
  for (let i = 1; i <= 24; i++) {
    const p = quadPoint(p0, c, p1, i / 24);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return len;
}

// --------------------------------------------------------------- build ----
const LEVELS: { code: LevelCode; y: number; side: 1 | -1; len: number }[] = [
  { code: "A1", y: 962, side: -1, len: 250 },
  { code: "A2", y: 822, side: 1, len: 262 },
  { code: "B1", y: 684, side: -1, len: 246 },
  { code: "B2", y: 546, side: 1, len: 226 },
  { code: "C1", y: 408, side: -1, len: 196 },
  { code: "C2", y: 290, side: 1, len: 158 },
];

export const BUD_NODE_Y = 1024;

export function buildPlant(words: string[]) {
  const rand = mulberry32(20260427);
  const leaves: LeafSpec[] = [];
  const branches: StrokeSpec[] = [];
  const fruits: FruitSpec[] = [];
  const tags: LevelTag[] = [];
  const roots: StrokeSpec[] = [];

  // Hai lá mầm.
  for (const side of [-1, 1] as const) {
    leaves.push({
      id: `cot${side}`,
      x: stemX(1062),
      y: 1062,
      angle: side === 1 ? -24 : -156,
      len: 36,
      width: 17,
      fill: "#b8d9ba",
      g0: 0.055,
      dur: 0.05,
      side,
    });
  }

  // Lá mọc dọc thân, so le hai bên, tránh các mấu cành.
  let flip: 1 | -1 = 1;
  for (let y = 1034; y > 250; y -= 50) {
    if (LEVELS.some((level) => Math.abs(level.y - y) < 26) || Math.abs(y - BUD_NODE_Y) < 18) {
      continue;
    }
    const side = flip;
    flip = flip === 1 ? -1 : 1;
    const shrink = 1 - (GROUND - y) / 2400;
    leaves.push({
      id: `s${y}`,
      x: stemX(y),
      y,
      angle: (side === 1 ? -34 : -146) + (rand() - 0.5) * 18,
      len: (42 + rand() * 18) * shrink,
      width: (15 + rand() * 5) * shrink,
      fill: FILLS[Math.floor(rand() * FILLS.length)],
      g0: birthAt(y) + 0.008,
      dur: 0.05,
      side,
    });
  }

  // Sáu tầng cành, mỗi bậc CEFR một tầng, kèm một cành phụ phía đối diện.
  LEVELS.forEach((level, index) => {
    const g0 = birthAt(level.y);
    const make = (id: string, y: number, side: 1 | -1, len: number, dur: number, gStart: number, leafCount: number) => {
      const sx = stemX(y);
      const p0 = [sx, y];
      const p1 = [sx + side * len * 0.9, y - len * 0.56];
      const c = [sx + side * len * 0.56, y - len * 0.02];
      const blen = quadLength(p0, c, p1);
      branches.push({
        id,
        d: `M${r2(p0[0])} ${r2(p0[1])} Q${r2(c[0])} ${r2(c[1])} ${r2(p1[0])} ${r2(p1[1])}`,
        len: blen,
        g0: gStart,
        dur,
        width: Math.max(2.4, 5.2 - index * 0.45) * (len > 140 ? 1 : 0.8),
      });
      for (let i = 0; i < leafCount; i++) {
        const f = 0.24 + (i / Math.max(leafCount - 1, 1)) * 0.76;
        const [x, yy] = quadPoint(p0, c, p1, f);
        const tangent = quadAngle(p0, c, p1, f);
        const last = i === leafCount - 1;
        const out: 1 | -1 = i % 2 === 0 ? 1 : -1;
        const angle = last ? tangent : tangent + out * (38 + rand() * 14);
        const scale = 1 - index * 0.05;
        leaves.push({
          id: `${id}l${i}`,
          x,
          y: yy,
          angle,
          len: (40 + rand() * 20) * scale * (last ? 1.12 : 1),
          width: (14 + rand() * 6) * scale,
          fill: FILLS[Math.floor(rand() * FILLS.length)],
          g0: gStart + f * dur * 0.85,
          dur: 0.045,
          side: out,
        });
      }
      return p1;
    };

    const tip = make(`b${level.code}`, level.y, level.side, level.len, 0.075, g0, 7);
    make(
      `m${level.code}`,
      level.y - 34,
      level.side === 1 ? -1 : 1,
      level.len * 0.5,
      0.06,
      g0 + 0.02,
      4,
    );
    tags.push({ code: level.code, x: tip[0], y: tip[1], side: level.side, index });

    // Trái: ở các tầng trên, và nhiều nhất ở C2.
    if (index >= 3) {
      const count = index === 5 ? 3 : 1;
      for (let i = 0; i < count; i++) {
        fruits.push({
          id: `f${level.code}${i}`,
          x: tip[0] - level.side * (14 + i * 26),
          y: tip[1] + 18 + i * 9,
          r: 10 + rand() * 3,
          g0: 0.93 + index * 0.006 + i * 0.012,
          dur: 0.04,
        });
      }
    }
  });

  // Ngọn cây: vài lá non và một chùm trái.
  const topX = stemX(STEM_TOP);
  for (const [i, angle] of [-62, -118, -90].entries()) {
    leaves.push({
      id: `top${i}`,
      x: topX,
      y: STEM_TOP + 6,
      angle,
      len: 38 - i * 4,
      width: 14,
      fill: FILLS[i % FILLS.length],
      g0: 0.955 + i * 0.01,
      dur: 0.04,
      side: angle < -90 ? -1 : 1,
    });
  }
  fruits.push({ id: "ftop", x: topX + 4, y: STEM_TOP + 30, r: 13, g0: 0.97, dur: 0.03 });

  // Rễ trong lát cắt đất: rễ cái, rồi rễ con mọc dần theo G.
  const tapEnd = GROUND + 250;
  let tap = `M500 ${GROUND + 4}`;
  for (let y = GROUND + 20; y <= tapEnd; y += 20) {
    tap += ` L${r2(500 + 7 * Math.sin((y - GROUND) / 38))} ${y}`;
  }
  roots.push({ id: "tap", d: tap, len: 262, g0: 0.012, dur: 0.5, width: 2.6 });
  for (let i = 0; i < 11; i++) {
    const depth = GROUND + 26 + i * 20;
    const side = i % 2 === 0 ? 1 : -1;
    const length = 70 + rand() * 110 - i * 4;
    const sx = 500 + 7 * Math.sin((depth - GROUND) / 38);
    const ex = sx + side * length;
    const ey = depth + length * (0.35 + rand() * 0.25);
    const cx = sx + side * length * 0.5;
    const cy = depth + 6;
    roots.push({
      id: `r${i}`,
      d: `M${r2(sx)} ${r2(depth)} Q${r2(cx)} ${r2(cy)} ${r2(ex)} ${r2(ey)}`,
      len: quadLength([sx, depth], [cx, cy], [ex, ey]),
      g0: 0.03 + i * 0.075,
      dur: 0.16,
      width: 1.5,
    });
  }

  // Những chiếc lá mang từ đã học, rồi rụng (chặng "học rồi quên").
  const ghosts: GhostLeaf[] = words.slice(0, 5).map((word, index) => {
    const side: 1 | -1 = index % 2 === 0 ? 1 : -1;
    const y = 1064 - index * 9;
    // Xoè ra như một nắm lá: phải, trái, phải cao hơn, trái cao hơn, gần thẳng đứng.
    const angle = [-8, -172, -42, -138, -76][index] ?? -90;
    return {
      id: `g${index}`,
      x: stemX(y),
      y,
      angle,
      len: 74,
      side,
      word,
      index,
    };
  });

  return { leaves, branches, fruits, tags, roots, ghosts };
}

export type PlantModel = ReturnType<typeof buildPlant>;
