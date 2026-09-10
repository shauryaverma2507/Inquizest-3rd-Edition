import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp, mapRange, pulse, smooth } from "@/lib/anim";

gsap.registerPlugin(ScrollTrigger);

/** The beat where the first mechanism disengages and the second swings in. */
export function EventTransition() {
  const host = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const wordA = useRef<HTMLDivElement>(null);
  const wordB = useRef<HTMLDivElement>(null);
  const hintB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const apply = (p: number) => {
      if (sweep.current) {
        sweep.current.style.transform = `translate3d(${(-100 + smooth(p) * 200).toFixed(2)}%,0,0) skewX(-12deg)`;
        sweep.current.style.opacity = String(pulse(p, 0, 1) * 0.9);
      }
      if (wordA.current) {
        wordA.current.style.opacity = String(clamp(1 - p * 2.2));
        wordA.current.style.transform = `translate3d(${(-p * 18).toFixed(1)}vw,0,0)`;
      }
      if (wordB.current) {
        const t = smooth(mapRange(p, 0.42, 0.9));
        wordB.current.style.opacity = String(t);
        wordB.current.style.transform = `translate3d(${((1 - t) * 16).toFixed(1)}vw,0,0)`;
      }
      if (hintB.current) {
        const t = smooth(mapRange(p, 0.3, 1));
        hintB.current.style.opacity = String(t * 0.5);
        hintB.current.style.transform = `translate(-50%,-50%) scale(${(0.6 + t * 0.6).toFixed(3)})`;
      }
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
    <section ref={host} className="relative h-[125vh]" aria-label="Mechanism shift">
      <div className="world-stage sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div ref={hintB} className="pointer-events-none absolute left-[-10vw] top-[70vh] h-[90vmax] w-[90vmax] rounded-full opacity-0 blur-[130px]" style={{ background: "radial-gradient(circle, var(--accent-lime), transparent 60%)" }} />
        <div ref={sweep} className="pointer-events-none absolute -inset-y-[20%] left-0 w-[60vw] bg-paper/90 mix-blend-difference" />
        <div className="absolute inset-0 grid place-items-center px-[6vw] text-center">
          <div>
            <div ref={wordA} className="font-display text-[7vw] leading-[0.9] text-paper md:text-[4.4vw]">
            </div>
            <div ref={wordB} className="mt-[2vh] font-display text-[9vw] leading-[0.88] text-transparent opacity-0 md:text-[5.6vw]" style={{ WebkitTextStroke: "1.6px var(--accent-lime)" }}>
              DAY 2 MECHANISM ENGAGED
            </div>
          </div>
        </div>
        <span className="pointer-events-none absolute bottom-[8vh] left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-paper/40">
          events 17 — 26
        </span>
      </div>
    </section>
  );
}
