import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoMark } from "./LogoMark";
import { clamp, mapRange, smooth } from "@/lib/anim";

gsap.registerPlugin(ScrollTrigger);

/**
 * Layered, scroll-driven opening.
 *  1. background        (absolute black)
 *  2. white field       (grows from nothing, then collapses)
 *  3. logo ink layer    (reads black while the white world exists)
 *  4. logo paper layer  (reads white once the world is gone — anchored, never blinks)
 *  5. logo colour layer (colour flows through the mark)
 *  6. fragments         (graphic dust entering the void)
 */
export function OpeningSequence() {
  const host = useRef<HTMLDivElement>(null);
  const white = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const color = useRef<HTMLDivElement>(null);
  const chromaA = useRef<HTMLDivElement>(null);
  const chromaB = useRef<HTMLDivElement>(null);
  const frags = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const apply = (p: number) => {
      // --- white field ------------------------------------------------------
      const grow = smooth(mapRange(p, 0.02, 0.34));
      const collapse = smooth(mapRange(p, 0.44, 0.62));
      const whiteAmount = clamp(grow - collapse);

      if (white.current) {
        const r = 4 + grow * 118;
        const squeeze = collapse * 50;
        white.current.style.clipPath =
          collapse > 0.001
            ? `inset(${squeeze}% 0% ${squeeze}% 0% round ${collapse * 40}px)`
            : `circle(${r}% at 50% 52%)`;
        white.current.style.opacity = String(clamp(grow * 1.1 - collapse * 0.15));
      }
      if (glow.current) {
        glow.current.style.opacity = String(Math.sin(clamp(grow) * Math.PI) * 0.5 + collapse * 0.35);
        glow.current.style.transform = `scale(${0.6 + grow * 1.6 - collapse * 0.5})`;
      }

      // --- logo presence ----------------------------------------------------
      const presence = smooth(mapRange(p, 0.1, 0.3));
      const isolate = smooth(mapRange(p, 0.6, 0.72));
      const colorFlow = smooth(mapRange(p, 0.73, 0.9));
      const handoff = smooth(mapRange(p, 0.9, 1));

      if (stage.current) {
        const s = 0.86 + presence * 0.12 + isolate * 0.04 - handoff * 0.34;
        stage.current.style.transform = `translate3d(0, ${(-handoff * 16).toFixed(2)}vh, 0) scale(${s.toFixed(4)})`;
        stage.current.style.opacity = String(1 - handoff * 0.9);
      }
      if (ink.current) ink.current.style.opacity = String(presence * whiteAmount);
      if (paper.current)
        paper.current.style.opacity = String(presence * (1 - whiteAmount) * (1 - colorFlow * 0.95));
      if (color.current) {
        color.current.style.opacity = String(colorFlow);
        color.current.style.clipPath = `inset(0% ${((1 - colorFlow) * 102).toFixed(2)}% 0% 0%)`;
      }
      const chroma = Math.sin(clamp(colorFlow) * Math.PI);
      if (chromaA.current) {
        chromaA.current.style.opacity = String(chroma * 0.35);
        chromaA.current.style.transform = `translate3d(${(-chroma * 0.9).toFixed(2)}%,0,0)`;
      }
      if (chromaB.current) {
        chromaB.current.style.opacity = String(chroma * 0.28);
        chromaB.current.style.transform = `translate3d(${(chroma * 0.9).toFixed(2)}%,0,0)`;
      }
      if (frags.current) {
        frags.current.style.opacity = String(clamp(isolate * 0.9) * (1 - handoff));
        frags.current.style.transform = `translate3d(0,${(-p * 40).toFixed(1)}px,0) rotate(${(p * 8).toFixed(2)}deg)`;
      }
      if (hint.current) hint.current.style.opacity = String(clamp(1 - p * 12));
      if (meta.current) meta.current.style.opacity = String(clamp(colorFlow * 1.2) * (1 - handoff));
    };

    apply(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => apply(self.progress),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={host} className="relative h-[390vh]" aria-label="INQUIZEST 3.0 opening">
      <div className="world-stage sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* 2 · white field */}
        <div ref={glow} className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/25 blur-[90px]" />
        <div ref={white} className="absolute inset-0 bg-paper will-change-[clip-path]">
          <div className="halftone absolute inset-0 text-ink opacity-[0.18]" />
        </div>

        {/* 6 · fragments */}
        <div ref={frags} className="pointer-events-none absolute inset-0 opacity-0">
          {FRAGMENTS.map((f, i) => (
            <span
              key={i}
              className="absolute block"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: f.s,
                height: f.s,
                background: `var(--accent-${f.c})`,
                borderRadius: f.r ? "50%" : 0,
                transform: `rotate(${f.a}deg)`,
                opacity: f.o,
              }}
            />
          ))}
        </div>

        {/* 3–5 · logo stack */}
        <div className="absolute inset-0 grid place-items-center px-[6vw]">
          <div ref={stage} className="relative w-[74vw] max-w-[1100px] will-change-transform">
            <div ref={paper} className="opacity-0">
              <LogoMark tone="paper" className="w-full" />
            </div>
            <div ref={ink} className="absolute inset-0 opacity-0">
              <LogoMark tone="ink" className="w-full" />
            </div>
            <div ref={chromaA} className="absolute inset-0 opacity-0 mix-blend-screen">
              <LogoMark tone="color" className="w-full" style={{ filter: "hue-rotate(40deg)" }} />
            </div>
            <div ref={chromaB} className="absolute inset-0 opacity-0 mix-blend-screen">
              <LogoMark tone="color" className="w-full" style={{ filter: "hue-rotate(-40deg)" }} />
            </div>
            <div ref={color} className="absolute inset-0 opacity-0">
              <LogoMark tone="color" className="w-full" />
            </div>
          </div>
        </div>

        <div
          ref={meta}
          className="pointer-events-none absolute bottom-[9vh] left-0 right-0 flex justify-between px-[6vw] font-mono text-[10px] uppercase tracking-[0.4em] text-paper/55 opacity-0"
        >
          <span>3rd edition · Delhi Public School Shaheedpath</span>
          <span>5—6 October 2026</span>
        </div>

        <div
          ref={hint}
          className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.55em] text-paper/40"
        >
          scroll
        </div>
      </div>
    </section>
  );
}

const FRAGMENTS = [
  { x: 12, y: 22, s: 10, c: "red", a: 12, o: 0.8, r: true },
  { x: 84, y: 18, s: 6, c: "cyan", a: 0, o: 0.7, r: true },
  { x: 22, y: 74, s: 46, c: "yellow", a: 24, o: 0.35, r: false },
  { x: 72, y: 80, s: 14, c: "violet", a: 45, o: 0.5, r: false },
  { x: 46, y: 12, s: 5, c: "lime", a: 0, o: 0.8, r: true },
  { x: 92, y: 56, s: 28, c: "orange", a: 8, o: 0.3, r: false },
  { x: 6, y: 48, s: 7, c: "paper", a: 0, o: 0.5, r: true },
  { x: 62, y: 92, s: 5, c: "cyan", a: 0, o: 0.6, r: true },
] as const;
