"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LEVEL_META, type LevelCode } from "@/lib/curriculum";
import type { HomeShowcase } from "@/lib/learning";
import {
  BUD_NODE_Y,
  GROUND,
  STEM_LENGTH,
  STEM_PATH,
  buildPlant,
  interp,
  leafPath,
  leafVeins,
  stemLengthTo,
  stemTopAt,
  stemX,
} from "./growth-plant";
import "./guest-growth.css";

// ---------------------------------------------------------------------------
// Một thế giới liên tục (scrollcraft worldflight): một sân khấu cố định, một
// spacer, bảy chặng đổi sắc trời. Cây là một lớp duy nhất mọc theo vị trí cuộn.
// ---------------------------------------------------------------------------

const LEGS = [
  { key: "seed", label: "Hạt giống", w: 1.3, target: 0 },
  { key: "forget", label: "Học rồi quên", w: 1.3, target: 1.9 },
  { key: "try", label: "Thử một câu", w: 1.3, target: 3.3 },
  { key: "days", label: "Những ngày sau", w: 1.3, target: 4.62 },
  { key: "return", label: "Câu cũ quay lại", w: 2.4, target: 5.85 },
  { key: "levels", label: "Sáu chặng", w: 1.3, target: 8.45 },
  { key: "harvest", label: "Kết trái", w: 1.3, target: 10.2 },
] as const;

const TOTAL = LEGS.reduce((sum, leg) => sum + leg.w, 0);
const LEG_START: number[] = [];
LEGS.reduce((run, leg) => {
  LEG_START.push(run);
  return run + leg.w;
}, 0);

const win = (a: number, b: number, rin = 0.25, rout = 0.25) =>
  `${(a / TOTAL).toFixed(4)} ${(b / TOTAL).toFixed(4)} ${rin} ${rout}`;

// Tuổi cây G theo vị trí t (đơn vị: chiều cao màn hình). Chặng "những ngày
// sau" gần như đứng yên; cây bung lá trong chặng câu cũ quay lại.
const GROWTH = [
  [0, 0],
  [0.6, 0.014],
  [1.3, 0.045],
  [2.6, 0.12],
  [3.9, 0.18],
  [5.2, 0.235],
  [5.9, 0.3],
  [7.3, 0.72],
  [7.6, 0.735],
  [8.9, 0.92],
  [9.7, 1],
  [TOTAL, 1],
] as const;

// Khi giảm chuyển động: mỗi chặng một trạng thái, chỉ đổi độ mờ.
const STEP_G = [0.03, 0.1, 0.15, 0.22, 0.72, 0.92, 1];
const STEP_CAM_T: (number | number[])[] = [0, 2.2, 3.4, 4.6, [500, 720, 0.92, 0.36, 0.53], 8.45, TOTAL];

// Máy quay: t, tiêu điểm (fx, fy) trong toạ độ cây, độ phóng s, điểm neo trên
// màn hình (ax, ay). Copy nằm bên nào thì cây neo ở bên kia.
const CAM: [number, number, number, number, number, number][] = [
  [0, 500, 1110, 2.5, 0.68, 0.5],
  [0.9, 500, 1098, 2.4, 0.68, 0.5],
  [1.4, 500, 1062, 2.25, 0.56, 0.52],
  [2.2, 500, 1046, 2.1, 0.36, 0.54],
  [2.75, 505, 1030, 2.0, 0.5, 0.54],
  [3.4, 510, 1020, 1.95, 0.66, 0.54],
  [3.9, 505, 995, 1.8, 0.62, 0.55],
  [4.6, 500, 970, 1.6, 0.5, 0.5],
  [5.2, 525, 1010, 1.9, 0.44, 0.52],
  [5.8, 545, 1022, 2.1, 0.36, 0.52],
  [6.45, 520, 870, 1.32, 0.42, 0.52],
  [7.2, 500, 700, 0.92, 0.62, 0.53],
  [7.6, 500, 715, 0.95, 0.62, 0.53],
  [8.05, 500, 880, 1.04, 0.37, 0.52],
  [8.85, 500, 440, 1.0, 0.37, 0.5],
  [9.3, 500, 570, 0.92, 0.38, 0.52],
  [TOTAL, 500, 640, 0.84, 0.4, 0.53],
];

// Hermite bậc ba qua các khung khoá: máy quay đi liền, không khựng ở từng mốc.
const CAM_TANGENTS = CAM.map((key, i) => {
  const prev = CAM[Math.max(0, i - 1)];
  const next = CAM[Math.min(CAM.length - 1, i + 1)];
  const dt = next[0] - prev[0] || 1;
  return key.map((_, c) => (c === 0 ? 0 : (next[c] - prev[c]) / dt));
});

function cameraAt(t: number) {
  if (t <= CAM[0][0]) return CAM[0].slice(1);
  for (let i = 1; i < CAM.length; i++) {
    if (t <= CAM[i][0]) {
      const a = CAM[i - 1];
      const b = CAM[i];
      const dt = b[0] - a[0];
      const u = (t - a[0]) / dt;
      const u2 = u * u;
      const u3 = u2 * u;
      const h00 = 2 * u3 - 3 * u2 + 1;
      const h10 = u3 - 2 * u2 + u;
      const h01 = -2 * u3 + 3 * u2;
      const h11 = u3 - u2;
      const ma = CAM_TANGENTS[i - 1];
      const mb = CAM_TANGENTS[i];
      const out: number[] = [];
      for (let c = 1; c < 6; c++) {
        out.push(h00 * a[c] + h10 * dt * ma[c] + h01 * b[c] + h11 * dt * mb[c]);
      }
      return out;
    }
  }
  return CAM[CAM.length - 1].slice(1);
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const ramp = (t: number, a: number, b: number) => clamp01((t - a) / (b - a || 1));

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 23) % 100,
  r: 1.6 + ((i * 7) % 5) * 0.5,
  speed: 0.6 + ((i * 11) % 7) / 10,
}));

const BUD_TWIG = (() => {
  const sx = stemX(BUD_NODE_Y);
  return {
    d: `M${sx} ${BUD_NODE_Y} Q${sx + 26} ${BUD_NODE_Y - 4} ${sx + 44} ${BUD_NODE_Y - 26}`,
    x: sx + 46,
    y: BUD_NODE_Y - 30,
  };
})();

type BudState = "none" | "kept" | "learned" | "open" | "reset";

interface LevelSummary {
  code: LevelCode;
  name: string;
  grammar: number;
  vocabulary: number;
}

interface ScrollCraftApi {
  destroy: () => void;
  layout: () => void;
}

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element) => ScrollCraftApi };
  }
}

export function GuestGrowthHome({
  showcase,
  levels,
  totalLessons,
  totalQuestions,
}: {
  showcase: HomeShowcase;
  levels: LevelSummary[];
  totalLessons: number;
  totalQuestions: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [first, setFirst] = useState<string | null>(null);
  const [review, setReview] = useState<string | null>(null);

  const plant = useMemo(() => buildPlant(showcase.words), [showcase.words]);
  const question = showcase.question;
  const correctChoice = question?.choices.find((choice) => choice.isCorrect) ?? null;
  const firstCorrect = first !== null && first === correctChoice?.id;
  const reviewCorrect = review !== null && review === correctChoice?.id;

  const budState: BudState =
    first !== null && firstCorrect
      ? "learned"
      : review !== null
        ? reviewCorrect
          ? "open"
          : "reset"
        : first !== null
          ? "kept"
          : "none";

  // ---- engine + driver ---------------------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    const flight = flightRef.current;
    if (!engineReady || !root || !flight || !window.ScrollCraft) return;

    const api = window.ScrollCraft.mount(root);
    const relayout = () => window.dispatchEvent(new Event("resize"));
    window.addEventListener("load", relayout);
    document.fonts?.ready.then(relayout);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const q = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const plantLayer = root.querySelector<HTMLDivElement>("[data-gg-plant]")!;
    const farLayer = root.querySelector<HTMLDivElement>("[data-gg-far]")!;
    const nearLayer = root.querySelector<HTMLDivElement>("[data-gg-near]")!;
    const header = root.querySelector<HTMLElement>("[data-gg-header]")!;
    const rail = root.querySelector<HTMLElement>("[data-gg-rail]")!;
    const stemEls = q<SVGPathElement>("[data-gg-stem]");
    const leafEls = q<SVGGElement>("[data-gg-leaf]");
    const branchEls = q<SVGGElement>("[data-gg-branch]");
    const rootEls = q<SVGPathElement>("[data-gg-root]");
    const fruitEls = q<SVGGElement>("[data-gg-fruit]");
    const ghostEls = q<SVGGElement>("[data-gg-ghost]");
    const dayEls = q<SVGGElement>("[data-gg-day]");
    const tagEls = q<SVGGElement>("[data-gg-tag]");
    const moteEls = q<HTMLSpanElement>("[data-gg-mote]");
    const glow = root.querySelector<SVGGElement>("[data-gg-glow]")!;
    const mist = root.querySelector<SVGGElement>("[data-gg-mist]")!;
    const seed = root.querySelector<SVGGElement>("[data-gg-seed]")!;
    const bud = root.querySelector<SVGGElement>("[data-gg-bud]")!;
    const scrim = root.querySelector<HTMLDivElement>(".gg-scrim")!;

    const lastLeaf = new Float32Array(leafEls.length).fill(-1);
    const lastBranch = new Float32Array(branchEls.length).fill(-1);
    const lastRoot = new Float32Array(rootEls.length).fill(-1);
    const lastFruit = new Float32Array(fruitEls.length).fill(-1);

    const st = { t: 0, tT: 0, mx: 0, my: 0, mxT: 0, myT: 0, top: 0, vw: 0, vh: 0, key: "" };
    const measure = () => {
      st.vw = window.innerWidth;
      st.vh = window.innerHeight;
      st.top = flight.getBoundingClientRect().top + window.scrollY;
      st.key = "";
    };
    measure();
    st.t = st.tT = Math.min(Math.max((window.scrollY - st.top) / st.vh, 0), TOTAL);

    const legAt = (t: number) => {
      let k = 0;
      for (let i = 0; i < LEG_START.length; i++) if (t >= LEG_START[i] - 0.08) k = i;
      return k;
    };

    const render = () => {
      const { t, vw, vh } = st;
      const mobile = vw < 900;
      const leg = legAt(t);
      const G = reduce ? STEP_G[leg] : interp(GROWTH, t);
      const step = STEP_CAM_T[leg];
      const cam = reduce ? (typeof step === "number" ? cameraAt(step) : step) : cameraAt(t);
      const [fx, fy, s] = cam;
      const ax = mobile ? 0.5 : cam[3];
      // Điện thoại: chữ ở trên, cây ở dưới; về cuối cây hạ thấp để nhường chỗ cho bảng và nhãn.
      const ay = mobile ? 0.7 + 0.08 * ramp(reduce ? LEG_START[leg] : t, 6.2, 7.2) : cam[4];
      const k = mobile ? Math.min(vh / 1094, vw / 860) : vh / 1094;
      const ks = k * s;
      const px = st.mx * 14;
      const py = st.my * 10;

      plantLayer.style.transform = `translate3d(${(ax * vw - fx * ks + px).toFixed(1)}px,${(ay * vh - fy * ks + py).toFixed(1)}px,0) scale(${ks.toFixed(4)})`;

      const gY = ay * vh + (GROUND - fy) * ks;
      const cam0 = cameraAt(0);
      const gY0 = (mobile ? 0.7 : cam0[4]) * vh + (GROUND - cam0[1]) * k * cam0[2];
      const farY = vh * 0.5 + (gY - vh * 0.5) * 0.35;
      farLayer.style.transform = `translate3d(${(px * 0.3).toFixed(1)}px,${(farY - vh + py * 0.3).toFixed(1)}px,0)`;
      const nearShift = reduce ? 0 : (gY - gY0) * 1.5;
      nearLayer.style.transform = `translate3d(${(px * 2).toFixed(1)}px,${(nearShift + py * 2).toFixed(1)}px,0)`;
      nearLayer.style.opacity = (1 - ramp(t, 1.1, 2.2)).toFixed(3);

      for (let i = 0; i < moteEls.length; i++) {
        const m = MOTES[i];
        const span = vh * 1.15;
        const y = reduce ? (m.y / 100) * vh : ((((m.y / 100) * span - t * vh * 0.16 * m.speed) % span) + span) % span - vh * 0.08;
        moteEls[i].style.transform = `translate3d(${(px * 1.3).toFixed(1)}px,${y.toFixed(1)}px,0)`;
      }

      // Thân cây.
      const visible = stemLengthTo(stemTopAt(G));
      const offset = (STEM_LENGTH - visible).toFixed(1);
      for (const el of stemEls) el.setAttribute("stroke-dashoffset", offset);

      seed.setAttribute("opacity", (1 - ramp(G, 0.1, 0.2)).toFixed(3));
      seed.setAttribute("data-open", G > 0.02 ? "1" : "0");

      for (let i = 0; i < leafEls.length; i++) {
        const spec = plant.leaves[i];
        let p = clamp01((G - spec.g0) / spec.dur);
        p = Math.round(p * 500) / 500;
        if (p === lastLeaf[i]) continue;
        lastLeaf[i] = p;
        const el = leafEls[i];
        if (p <= 0) {
          el.setAttribute("opacity", "0");
          continue;
        }
        const e = easeOut(p);
        el.setAttribute("opacity", reduce ? "1" : Math.min(1, p * 2.4).toFixed(3));
        el.setAttribute(
          "transform",
          reduce ? "" : `rotate(${((1 - e) * -28 * spec.side).toFixed(2)}) scale(${(0.18 + 0.82 * e).toFixed(4)})`,
        );
      }

      for (let i = 0; i < branchEls.length; i++) {
        const spec = plant.branches[i];
        let p = clamp01((G - spec.g0) / spec.dur);
        p = Math.round(p * 500) / 500;
        if (p === lastBranch[i]) continue;
        lastBranch[i] = p;
        const off = (spec.len * (1 - (reduce ? (p > 0 ? 1 : 0) : easeOut(p)))).toFixed(1);
        for (const path of Array.from(branchEls[i].children)) path.setAttribute("stroke-dashoffset", off);
      }

      for (let i = 0; i < rootEls.length; i++) {
        const spec = plant.roots[i];
        let p = clamp01((G - spec.g0) / spec.dur);
        p = Math.round(p * 500) / 500;
        if (p === lastRoot[i]) continue;
        lastRoot[i] = p;
        rootEls[i].setAttribute("stroke-dashoffset", (spec.len * (1 - (reduce ? (p > 0 ? 1 : 0) : p))).toFixed(1));
      }

      for (let i = 0; i < fruitEls.length; i++) {
        const spec = plant.fruits[i];
        let p = clamp01((G - spec.g0) / spec.dur);
        p = Math.round(p * 500) / 500;
        if (p === lastFruit[i]) continue;
        lastFruit[i] = p;
        fruitEls[i].setAttribute("opacity", p > 0 ? "1" : "0");
        fruitEls[i].setAttribute("transform", reduce ? "" : `scale(${(0.2 + 0.8 * easeOut(p)).toFixed(4)})`);
      }

      // Những lá mang từ đã học: mọc, rồi rụng xuống đất.
      for (let i = 0; i < ghostEls.length; i++) {
        const spec = plant.ghosts[i];
        const grow = ramp(t, 1.3 + i * 0.09, 1.75 + i * 0.09);
        const fall = ramp(t, 2.0 + i * 0.1, 2.55 + i * 0.1);
        const el = ghostEls[i];
        if (reduce) {
          el.setAttribute("opacity", leg === 1 ? "1" : "0");
          el.setAttribute("transform", "");
          continue;
        }
        const drop = (GROUND - spec.y - 6) * easeOut(fall);
        const drift = spec.side * 40 * fall;
        el.setAttribute("opacity", (Math.min(1, grow * 1.6) * (1 - fall)).toFixed(3));
        el.setAttribute(
          "transform",
          `translate(${drift.toFixed(1)} ${drop.toFixed(1)}) rotate(${(fall * 70 * spec.side).toFixed(1)}) scale(${(0.25 + 0.75 * easeOut(grow)).toFixed(3)})`,
        );
      }

      for (let i = 0; i < dayEls.length; i++) {
        const a = reduce ? (leg === 3 ? 1 : 0) : ramp(t, 3.95 + i * 0.15, 4.07 + i * 0.15) * (1 - ramp(t, 5.0, 5.3));
        dayEls[i].setAttribute("opacity", a.toFixed(3));
      }

      for (let i = 0; i < tagEls.length; i++) {
        const a = reduce ? (leg >= 5 ? 1 : 0) : ramp(t, 7.8 + i * 0.16, 7.95 + i * 0.16);
        tagEls[i].setAttribute("opacity", a.toFixed(3));
      }

      const glowA = reduce ? (leg >= 4 ? 0.7 : 0) : ramp(t, 5.9, 6.9) * (1 - 0.35 * ramp(t, 7.4, 8.2));
      glow.setAttribute("opacity", glowA.toFixed(3));
      mist.setAttribute(
        "opacity",
        interp(
          [
            [0, 0.8],
            [2.6, 0.4],
            [5.2, 0.22],
            [8.9, 0.3],
            [TOTAL, 0.45],
          ],
          t,
        ).toFixed(3),
      );
      bud.setAttribute("data-late", t > 5.0 ? "1" : "0");
      bud.setAttribute("data-grown", stemTopAt(G) < BUD_NODE_Y - 4 ? "1" : "0");

      header.setAttribute("data-cta", t > 1.0 ? "on" : "off");
      // Lớp làm dịu nền chỉ nằm sau cột chữ đang hiện.
      scrim.setAttribute(
        "data-side",
        t < 1.0 ? "lead" : t < 2.6 ? "trail" : t < 4.0 ? "lead" : t < 5.2 ? "none" : t < 6.65 ? "trail" : t < 7.75 ? "lead" : t < 9.2 ? "trail" : "none",
      );
      rail.style.setProperty("--gg-p", (t / TOTAL).toFixed(4));
    };

    let raf = 0;
    const frame = () => {
      st.tT = Math.min(Math.max((window.scrollY - st.top) / Math.max(st.vh, 1), 0), TOTAL);
      const d = st.tT - st.t;
      st.t = reduce || Math.abs(d) < 0.0005 ? st.tT : st.t + d * 0.12;
      st.mx += (st.mxT - st.mx) * 0.08;
      st.my += (st.myT - st.my) * 0.08;
      const key = `${st.t.toFixed(4)}|${st.mx.toFixed(3)}|${st.my.toFixed(3)}|${st.vw}|${st.vh}`;
      if (key !== st.key) {
        st.key = key;
        render();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => measure();
    const onPointer = (e: PointerEvent) => {
      st.mxT = (e.clientX / st.vw - 0.5) * 2;
      st.myT = (e.clientY / st.vh - 0.5) * 2;
    };
    // Bàn phím: ô chữ đang ẩn thì cuộn tới đúng chỗ nó hiện rõ.
    const onFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      const block = target?.closest<HTMLElement>("[data-sc-copy]");
      if (!block || parseFloat(getComputedStyle(block).opacity || "1") > 0.6) return;
      const spec = block.getAttribute("data-sc-window") ?? "";
      let at = 0;
      if (spec === "finale") at = TOTAL;
      else if (spec !== "hero") {
        const [a, b] = spec.split(/\s+/).map(parseFloat);
        at = ((a + b) / 2) * TOTAL;
      }
      window.scrollTo({ top: st.top + at * st.vh, behavior: "instant" });
    };
    const onWaypoint = (e: Event) => setCurrent((e as CustomEvent<{ index: number }>).detail.index);

    window.addEventListener("resize", onResize, { passive: true });
    if (finePointer && !reduce) window.addEventListener("pointermove", onPointer, { passive: true });
    root.addEventListener("focusin", onFocus);
    flight.addEventListener("sc:waypoint", onWaypoint);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("load", relayout);
      root.removeEventListener("focusin", onFocus);
      flight.removeEventListener("sc:waypoint", onWaypoint);
      api.destroy();
    };
  }, [engineReady, plant]);

  const goTo = useCallback((index: number) => {
    const flight = flightRef.current;
    if (!flight) return;
    const top = flight.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + LEGS[index].target * window.innerHeight,
      behavior: reduce ? "instant" : "smooth",
    });
  }, []);

  const resetReview = () => setReview(null);

  return (
    <div className="gg" ref={rootRef}>
      <Script src="/vendor/scrollcraft.js" strategy="afterInteractive" onReady={() => setEngineReady(true)} />
      <noscript>
        <style>{`.gg [data-sc-copy]{opacity:1!important;position:relative!important;inset:auto!important;translate:none!important;margin:6rem auto;pointer-events:auto!important}.gg .sc-world__copy,.gg [data-sc-world-copy]{position:relative!important}.gg [data-sc-world]{display:none}`}</style>
      </noscript>

      <header className="gg-header" data-gg-header data-cta="off">
        <BrandLogo />
        <div className="gg-header__actions">
          <Link href="/login" className="gg-header__login link-underline">
            Đăng nhập
          </Link>
          <Link href="/register" className="gg-header__cta btn-primary">
            Bắt đầu học miễn phí
          </Link>
        </div>
      </header>

      <nav className="gg-rail" data-gg-rail aria-label="Các chặng trên trang">
        <span className="gg-rail__stem" aria-hidden="true">
          <span className="gg-rail__fill" />
        </span>
        <ol>
          {LEGS.map((leg, index) => (
            <li key={leg.key}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={current === index ? "step" : undefined}
                className="gg-rail__node"
              >
                <span className="gg-rail__dot" aria-hidden="true" />
                <span className="gg-rail__label">{leg.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div data-sc-mode="worldflight" data-sc-seam="0.16" data-sc-lerp="0.12" ref={flightRef}>
        <div data-sc-world aria-hidden="true">
          {LEGS.map((leg) => (
            <div key={leg.key} data-sc-segment data-sc-w={leg.w} data-sc-waypoint={leg.label} className={`gg-sky gg-sky--${leg.key}`} />
          ))}

          <div className="gg-far" data-gg-far>
            <svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice">
              <path
                d="M0 210 C120 170 220 150 330 172 C430 192 520 120 640 128 C760 136 820 188 940 176 C1060 164 1150 104 1270 116 C1390 128 1480 178 1600 160 L1600 300 L0 300Z"
                fill="#e7ece0"
                stroke="#0e1e15"
                strokeOpacity="0.16"
                strokeWidth="1.2"
              />
              <path
                d="M0 250 C140 226 260 214 380 232 C500 250 600 206 720 210 C860 214 940 248 1080 240 C1220 232 1320 200 1460 212 C1530 218 1570 230 1600 226 L1600 300 L0 300Z"
                fill="#dfe6d6"
                stroke="#0e1e15"
                strokeOpacity="0.2"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <div className="gg-plant" data-gg-plant>
            <PlantSvg plant={plant} budState={budState} />
          </div>

          <div className="gg-motes">
            {MOTES.map((mote, index) => (
              <span
                key={index}
                data-gg-mote
                style={{ left: `${mote.x}%`, width: mote.r * 2, height: mote.r * 2 }}
              />
            ))}
          </div>

          <div className="gg-near" data-gg-near>
            <NearForeground />
          </div>
        </div>

        <div data-sc-world-copy>
          <div className="gg-scrim" aria-hidden="true" />
          <main className="gg-main">
            {/* 1. Hạt giống */}
            <section className="gg-copy gg-copy--lead" data-sc-copy data-sc-window="hero" aria-labelledby="gg-h1">
              <h1 id="gg-h1" className="gg-hero-title">
                Học theo từng chặng, <span className="gg-accent">nhớ theo từng bài.</span>
              </h1>
              <p className="gg-lede">
                Lộ trình IELTS từ A1 đến C2. Mỗi ngày một buổi ngắn, câu sai được giữ lại để ôn.
              </p>
              <div className="gg-actions">
                <Link href="/register" className="gg-cta btn-primary">
                  Bắt đầu học miễn phí
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
                <Link href="/login" className="gg-quiet-link link-underline">
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>
            </section>

            {/* 2. Học rồi quên */}
            <section className="gg-copy gg-copy--trail" data-sc-copy data-sc-window={win(1.15, 2.6)}>
              <h2 className="gg-title">Học hôm nay, vài hôm sau đã quên.</h2>
              <p className="gg-body">
                Không phải vì bạn học kém. Trí nhớ giữ lại những gì được gặp lại đúng lúc, trước khi nó kịp trôi đi.
              </p>
            </section>

            {/* 3. Thử một câu */}
            <section className="gg-copy gg-copy--lead gg-copy--card" data-sc-copy data-sc-window={win(2.6, 4.05, 0.16, 0.22)}>
              <h2 className="gg-title">Thử một câu, ngay tại đây.</h2>
              {question ? (
                <QuestionCard
                  idPrefix="gg-q1"
                  meta={`A1 · Ngữ pháp · ${question.lessonTitle}`}
                  question={question}
                  chosen={first}
                  onChoose={setFirst}
                  feedback={
                    first === null ? null : firstCorrect ? (
                      <>
                        <strong>Đúng rồi.</strong> {question.explanation}
                      </>
                    ) : (
                      <>
                        <strong>Chưa đúng.</strong> Đáp án là “{correctChoice?.label}”. {question.explanation} Câu này
                        đã được giữ lại để ôn.
                      </>
                    )
                  }
                />
              ) : (
                <p className="gg-body">Mỗi bài học kết thúc bằng một bài kiểm tra ngắn. Câu trả lời sai được giữ lại để ôn.</p>
              )}
            </section>

            {/* 4. Những ngày sau: khoảng lặng trước cao trào */}
            <div className="gg-plate" data-sc-copy data-sc-window={win(4.05, 5.2, 0.3, 0.3)} aria-hidden="true" />
            <section className="gg-copy gg-copy--bottom" data-sc-copy data-sc-window={win(4.05, 5.2, 0.3, 0.3)}>
              <p className="gg-whisper">Những ngày sau, bạn học tiếp bài mới.</p>
              <p className="gg-whisper gg-whisper--soft">Câu sai không mất đi. Nó nằm yên trong lịch ôn, chờ đến hạn.</p>
            </section>

            {/* 5. Câu cũ quay lại: cao trào */}
            <section className="gg-copy gg-copy--trail gg-copy--card" data-sc-copy data-sc-window={win(5.2, 6.65, 0.12, 0.22)}>
              <p className="gg-meta">Ôn tập · đến hạn hôm nay</p>
              <h2 className="gg-title">
                {firstCorrect
                  ? "Câu đúng thì không cần ôn."
                  : first === null
                    ? "Câu bạn bỏ qua ở trên đã quay lại."
                    : "Câu bạn trả lời sai đã quay lại."}
              </h2>
              {question && firstCorrect ? (
                <p className="gg-body">
                  Bạn đã chọn đúng “{correctChoice?.label}”. Nếu chọn sai, câu này sẽ quay lại đúng ở đây, vì câu sai
                  nào cũng vào lịch ôn và đến hạn ngay trong ngày.
                </p>
              ) : question ? (
                <QuestionCard
                  idPrefix="gg-q2"
                  meta={question.lessonTitle}
                  question={question}
                  chosen={review}
                  onChoose={setReview}
                  feedback={
                    review === null ? null : reviewCorrect ? (
                      <>
                        <strong>Nhớ rồi.</strong> Lần ôn tiếp theo: sau 1 ngày.
                      </>
                    ) : (
                      <>
                        <strong>Chưa đúng.</strong> Câu này quay về mốc đầu và đến hạn ôn lại ngay hôm nay.{" "}
                        <button type="button" className="gg-retry link-underline" onClick={resetReview}>
                          Ôn lại câu này
                        </button>
                      </>
                    )
                  }
                />
              ) : null}
            </section>

            <section className="gg-copy gg-copy--lead-top" data-sc-copy data-sc-window={win(6.65, 7.75)}>
              <h2 className="gg-title">Mỗi lần nhớ đúng, lần gặp lại giãn xa hơn.</h2>
              <ol className="gg-intervals" aria-label="Các mốc ôn tập">
                {[1, 3, 7, 14, 30].map((days) => (
                  <li key={days}>
                    <span className="gg-intervals__n">{days}</span> ngày
                  </li>
                ))}
              </ol>
              <p className="gg-body">Sai thì quay lại mốc đầu. Đúng ở mốc 30 ngày nghĩa là câu đó đã thuộc.</p>
            </section>

            {/* 6. Sáu chặng */}
            <section className="gg-copy gg-copy--trail gg-copy--narrow" data-sc-copy data-sc-window={win(7.75, 9.15, 0.22, 0.25)}>
              <h2 className="gg-title">Sáu chặng, từ hạt giống đến trái.</h2>
              <p className="gg-body">
                {totalLessons} bài học và {totalQuestions} câu hỏi, chia theo sáu bậc CEFR và hai lộ trình ngữ pháp, từ
                vựng.
              </p>
              <ol className="gg-ledger">
                {levels.map((level) => (
                  <li key={level.code}>
                    <span className="gg-ledger__code" style={{ color: LEVEL_META[level.code].color }}>
                      {level.code}
                    </span>
                    <span className="gg-ledger__name">{level.name}</span>
                    <span className="gg-ledger__count">
                      {level.grammar} ngữ pháp · {level.vocabulary} từ vựng
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 7. Kết trái: nhãn tiêu bản */}
            <section className="gg-copy gg-copy--label" data-sc-copy data-sc-window="finale" aria-labelledby="gg-close">
              <div className="gg-label">
                <p className="gg-label__head">
                  <span>eng-growth</span>
                  <span>Lộ trình IELTS A1 → C2</span>
                </p>
                <h2 id="gg-close" className="gg-title gg-title--label">
                  Mỗi ngày một bài, cây lớn dần theo tiến độ.
                </h2>
                <p className="gg-body">Tài khoản miễn phí: kế hoạch theo ngày, bài kiểm tra và lịch ôn câu sai.</p>
                <div className="gg-actions">
                  <Link href="/register" className="gg-cta btn-primary">
                    Bắt đầu học miễn phí
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                  <Link href="/login" className="gg-quiet-link link-underline">
                    Đăng nhập
                  </Link>
                </div>
                <nav className="gg-label__links" aria-label="Nội dung khoá học">
                  <Link href="/roadmap">Lộ trình</Link>
                  <Link href="/grammar">Ngữ pháp</Link>
                  <Link href="/vocabulary">Từ vựng</Link>
                  <Link href="/reading">Đọc hiểu</Link>
                  <Link href="/writing">Viết</Link>
                </nav>
                <p className="gg-label__foot">© 2026 eng-growth. Học chậm mà chắc.</p>
              </div>
            </section>
          </main>
        </div>

        <div data-sc-spacer aria-hidden="true" />
      </div>
    </div>
  );
}

function QuestionCard({
  idPrefix,
  meta,
  question,
  chosen,
  onChoose,
  feedback,
}: {
  idPrefix: string;
  meta: string;
  question: NonNullable<HomeShowcase["question"]>;
  chosen: string | null;
  onChoose: (id: string) => void;
  feedback: React.ReactNode;
}) {
  const answered = chosen !== null;
  return (
    <div className="gg-card">
      <p className="gg-card__meta">{meta}</p>
      <p id={`${idPrefix}-prompt`} className="gg-card__prompt" lang="en">
        {question.prompt}
      </p>
      <div className="gg-card__choices" role="group" aria-labelledby={`${idPrefix}-prompt`}>
        {question.choices.map((choice) => {
          const state = !answered
            ? "idle"
            : choice.isCorrect
              ? "correct"
              : choice.id === chosen
                ? "wrong"
                : "muted";
          return (
            <button
              key={choice.id}
              type="button"
              lang="en"
              className="gg-choice"
              data-state={state}
              disabled={answered}
              aria-pressed={choice.id === chosen}
              onClick={() => onChoose(choice.id)}
            >
              <span>{choice.label}</span>
              {state === "correct" ? (
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  check_circle
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <p className="gg-card__feedback" aria-live="polite">
        {feedback}
      </p>
    </div>
  );
}

function PlantSvg({ plant, budState }: { plant: ReturnType<typeof buildPlant>; budState: BudState }) {
  return (
    <svg viewBox="0 0 1000 1400" width="1000" height="1400" overflow="visible">
      <defs>
        <radialGradient id="gg-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#eef6dc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#eef6dc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gg-mist-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gg-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6dcc8" />
          <stop offset="100%" stopColor="#d9ccb2" />
        </linearGradient>
      </defs>

      <g data-gg-glow opacity="0">
        <ellipse cx="500" cy="720" rx="640" ry="700" fill="url(#gg-glow-grad)" />
      </g>

      {/* Lát cắt đất */}
      <rect x="-4000" y={GROUND} width="9000" height="3000" fill="url(#gg-soil)" />
      {[70, 160, 268].map((depth, i) => (
        <path
          key={depth}
          d={`M-1600 ${GROUND + depth} C-800 ${GROUND + depth - 14} 0 ${GROUND + depth + 16} 500 ${GROUND + depth} S1800 ${GROUND + depth - 12} 2600 ${GROUND + depth + 6}`}
          fill="none"
          stroke="#b9a986"
          strokeOpacity={0.55 - i * 0.1}
          strokeWidth="1.3"
          strokeDasharray="2 9"
        />
      ))}
      {[
        [380, 1190, 9, 5],
        [640, 1232, 7, 4],
        [300, 1300, 11, 6],
        [720, 1330, 8, 5],
        [560, 1160, 5, 3],
        [430, 1262, 6, 4],
        [820, 1180, 9, 5],
        [180, 1220, 7, 4],
      ].map(([cx, cy, rx, ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#cdbd9c" stroke="#0e1e15" strokeOpacity="0.3" strokeWidth="1" />
      ))}

      <g fill="none" stroke="#0e1e15" strokeOpacity="0.55" strokeLinecap="round">
        {plant.roots.map((r) => (
          <path
            key={r.id}
            data-gg-root
            d={r.d}
            strokeWidth={r.width}
            strokeDasharray={r.len.toFixed(1)}
            strokeDashoffset={r.len.toFixed(1)}
          />
        ))}
      </g>

      {/* Hạt giống: vỏ nứt khi cây bắt đầu nảy mầm */}
      <g data-gg-seed className="gg-seed" data-open="0">
        <path className="gg-seed__left" d="M500 1103 C486 1104 478 1112 480 1121 C482 1129 492 1132 500 1131 Z" fill="#9a7748" stroke="#0e1e15" strokeWidth="1.4" />
        <path className="gg-seed__right" d="M500 1103 C514 1104 522 1112 520 1121 C518 1129 508 1132 500 1131 Z" fill="#8a6a3e" stroke="#0e1e15" strokeWidth="1.4" />
      </g>

      <g data-gg-mist opacity="0.8">
        <ellipse cx="500" cy={GROUND - 8} rx="900" ry="46" fill="url(#gg-mist-grad)" />
      </g>

      {/* Mặt đất và vài khóm cỏ */}
      <path d={`M-4000 ${GROUND} L5000 ${GROUND}`} stroke="#0e1e15" strokeOpacity="0.7" strokeWidth="1.6" />
      <g fill="none" stroke="#2d5a3d" strokeWidth="1.4" strokeLinecap="round">
        {[-900, -560, -260, 120, 300, 690, 880, 1220, 1560, 1900].map((x, i) => (
          <path
            key={x}
            d={`M${x} ${GROUND} q-6 -22 -14 -30 M${x + 4} ${GROUND} q2 -26 8 -36 M${x + 9} ${GROUND} q8 -16 18 -22${i % 2 ? ` M${x - 4} ${GROUND} q-12 -10 -20 -12` : ""}`}
          />
        ))}
      </g>

      {/* Mốc ngày trôi (chặng lặng) */}
      <g className="gg-days">
        {Array.from({ length: 7 }, (_, i) => {
          const x = 312 + i * 64;
          return (
            <g key={i} data-gg-day opacity="0">
              <path d={`M${x} ${GROUND + 4} L${x} ${GROUND + 16}`} stroke="#0e1e15" strokeOpacity="0.6" strokeWidth="1.4" />
              <text x={x} y={GROUND + 34} textAnchor="middle">
                {i === 0 ? "Ngày 1" : i + 1}
              </text>
            </g>
          );
        })}
      </g>

      {/* Thân */}
      <path
        data-gg-stem
        d={STEM_PATH}
        fill="none"
        stroke="#173b26"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={STEM_LENGTH.toFixed(1)}
        strokeDashoffset={STEM_LENGTH.toFixed(1)}
      />
      <path
        data-gg-stem
        d={STEM_PATH}
        fill="none"
        stroke="#5d9b6c"
        strokeWidth="5.6"
        strokeLinecap="round"
        strokeDasharray={STEM_LENGTH.toFixed(1)}
        strokeDashoffset={STEM_LENGTH.toFixed(1)}
      />

      {plant.branches.map((b) => (
        <g key={b.id} data-gg-branch fill="none" strokeLinecap="round">
          <path d={b.d} stroke="#173b26" strokeWidth={b.width + 3} strokeDasharray={b.len.toFixed(1)} strokeDashoffset={b.len.toFixed(1)} />
          <path d={b.d} stroke="#5d9b6c" strokeWidth={b.width} strokeDasharray={b.len.toFixed(1)} strokeDashoffset={b.len.toFixed(1)} />
        </g>
      ))}

      {plant.leaves.map((leaf) => (
        <g key={leaf.id} transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.angle.toFixed(1)})`}>
          <g data-gg-leaf opacity="0">
            <path d={leafPath(leaf.len, leaf.width)} fill={leaf.fill} stroke="#173b26" strokeWidth="1.5" strokeLinejoin="round" />
            <path d={leafVeins(leaf.len, leaf.width)} fill="none" stroke="#173b26" strokeOpacity="0.5" strokeWidth="0.9" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* Lá mang từ đã học, sẽ rụng */}
      {plant.ghosts.map((ghost) => (
        <g key={ghost.id} transform={`translate(${ghost.x.toFixed(1)} ${ghost.y.toFixed(1)})`}>
          <g data-gg-ghost opacity="0">
            <g transform={`rotate(${ghost.angle})`}>
              <path d={leafPath(ghost.len, 19)} fill="#cfe3cf" stroke="#173b26" strokeWidth="1.4" />
              <text
                className="gg-ghost-word"
                x={ghost.len * 0.5}
                y="4"
                textAnchor="middle"
                transform={ghost.side === -1 ? `rotate(180 ${ghost.len * 0.5} 0)` : undefined}
                lang="en"
              >
                {ghost.word}
              </text>
            </g>
          </g>
        </g>
      ))}

      {/* Nụ của câu hỏi bạn đã trả lời */}
      <g data-gg-bud className="gg-bud" data-state={budState} data-late="0" data-grown="0">
        <path className="gg-bud__twig" d={BUD_TWIG.d} fill="none" stroke="#173b26" strokeWidth="3" strokeLinecap="round" />
        <g transform={`translate(${BUD_TWIG.x} ${BUD_TWIG.y}) rotate(-40) scale(1.45)`}>
          <g className="gg-bud__petals">
            {[0, 72, 144, 216, 288].map((angle) => (
              <path
                key={angle}
                className="gg-bud__petal"
                style={{ ["--a" as string]: `${angle}deg` }}
                d="M0 0 C6 -6 18 -7 24 0 C18 7 6 6 0 0Z"
                stroke="#6b4310"
                strokeWidth="1.2"
              />
            ))}
          </g>
          <path className="gg-bud__closed" d="M-2 0 C4 -10 18 -12 24 0 C18 12 4 10 -2 0Z" stroke="#6b4310" strokeWidth="1.3" />
          <circle className="gg-bud__core" r="5" />
        </g>
      </g>

      {plant.fruits.map((fruit) => (
        <g key={fruit.id} transform={`translate(${fruit.x.toFixed(1)} ${fruit.y.toFixed(1)})`}>
          <g data-gg-fruit opacity="0">
            <path d={`M0 ${-fruit.r} q2 -8 7 -10`} stroke="#173b26" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <circle r={fruit.r} fill="#d9a441" stroke="#6b4310" strokeWidth="1.4" />
            <path d={`M${-fruit.r * 0.45} ${-fruit.r * 0.35} a${fruit.r * 0.5} ${fruit.r * 0.5} 0 0 1 ${fruit.r * 0.5} ${-fruit.r * 0.25}`} stroke="#fff4d6" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* Nhãn sáu bậc */}
      {plant.tags.map((tag) => (
        <g
          key={tag.code}
          data-gg-tag
          opacity="0"
          transform={`translate(${(tag.x + tag.side * 36).toFixed(1)} ${(tag.y - 14).toFixed(1)})`}
          className="gg-tag"
        >
          <text textAnchor={tag.side === 1 ? "start" : "end"}>
            <tspan className="gg-tag__code" fill={LEVEL_META[tag.code].color}>
              {tag.code}
            </tspan>
            <tspan className="gg-tag__name" dx="8">
              {LEVEL_META[tag.code].name}
            </tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

function NearForeground() {
  return (
    <>
      <svg className="gg-near__left" viewBox="0 0 320 260" aria-hidden="true">
        <g fill="#9cc6a3" stroke="#173b26" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M20 260 C40 180 70 110 120 40 C104 120 90 190 86 260Z" />
          <path d="M70 260 C110 196 150 150 230 104 C180 160 150 210 136 260Z" fill="#86b990" />
          <path d="M0 260 C6 210 10 170 30 120 C36 170 40 220 44 260Z" fill="#b2d4b5" />
          <path d="M140 260 C170 220 210 196 300 178 C240 210 210 236 196 260Z" fill="#a8cfae" />
        </g>
      </svg>
      <svg className="gg-near__frond" viewBox="0 0 360 420" aria-hidden="true">
        <g stroke="#173b26" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M360 0 C300 90 240 190 150 300 C110 350 70 390 20 420" fill="none" strokeWidth="2.2" />
          {Array.from({ length: 9 }, (_, i) => {
            const t = i / 9;
            const x = 360 - t * 330;
            const y = t * 410;
            return (
              <g key={i}>
                <path d={`M${x} ${y} c-30 -6 -58 -22 -72 -44 c30 4 56 20 72 44Z`} fill="#a8cfae" />
                <path d={`M${x} ${y} c-6 30 2 58 20 78 c4 -30 -4 -56 -20 -78Z`} fill="#93c49c" />
              </g>
            );
          })}
        </g>
      </svg>
    </>
  );
}
