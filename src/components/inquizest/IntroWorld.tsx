import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp, mapRange, smooth } from "@/lib/anim";

gsap.registerPlugin(ScrollTrigger);

/** Entering the designed world: typography as composition, not paragraphs. */
export function IntroWorld() {
  const host = useRef<HTMLDivElement>(null);
  const layers = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let mx = 0;
    let my = 0;
    let p = 0;

    const apply = () => {
      const inn = smooth(mapRange(p, 0, 0.35));
      const out = smooth(mapRange(p, 0.78, 1));
      layers.current.forEach((node, i) => {
        if (!node) return;
        const depth = DEPTHS[i % DEPTHS.length]!;
        const ty = (1 - inn) * 60 * depth - p * 90 * depth;
        node.style.transform = `translate3d(${(mx * 26 * depth).toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${(1 + p * 0.06 * depth).toFixed(4)})`;
        node.style.opacity = String(clamp(inn * (1 - out * 1.2) + my * 0));
      });
    };
    apply();

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        p = self.progress;
        apply();
      },
    });
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          apply();
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      st.kill();
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const reg = (i: number) => (node: HTMLDivElement | null) => {
    layers.current[i] = node;
  };

  return (
    <section ref={host} className="relative h-[205vh]" aria-label="Introduction">
      <div className="world-stage sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <div ref={reg(0)} className="halftone pointer-events-none absolute -inset-[8%] text-paper opacity-[0.06]" />

        <div ref={reg(1)} className="pointer-events-none absolute left-[6vw] top-[16vh] h-[26vmin] w-[26vmin] rounded-full opacity-40 blur-3xl" style={{ background: "var(--accent-violet)" }} />
        <div ref={reg(2)} className="pointer-events-none absolute right-[10vw] bottom-[14vh] h-[18vmin] w-[18vmin] opacity-30 blur-2xl" style={{ background: "var(--accent-orange)" }} />

        <div ref={reg(3)} className="absolute left-[6vw] top-[22vh] max-w-[52vw]">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-paper/50">what is inquizest</p>
          <h2 className="mt-[2vh] font-display text-[9vw] leading-[0.84] tracking-[-0.02em] text-paper md:text-[6vw]">
            A UNIVERSE
            <br />
            BUILT FROM
            <br />
            <span style={{ WebkitTextStroke: "1.5px var(--accent-yellow)", color: "transparent" }}>QUESTIONS</span>
          </h2>
        </div>

        <div ref={reg(4)} className="absolute right-[7vw] top-[30vh] w-[min(30vw,360px)] max-md:hidden">
          <p className="text-[clamp(13px,1.1vw,18px)] leading-relaxed text-paper/60">
            A two-day inter-school collision of knowledge, performance, art,
            technology and nerve at Delhi Public School Shaheedpath, Lucknow.
          </p>
        </div>

        <div ref={reg(5)} className="absolute bottom-[12vh] left-[6vw] flex flex-wrap items-end gap-[4vw] font-mono text-[10px] uppercase tracking-[0.4em] text-paper/45">
          <span><b className="block font-display text-[3vw] tracking-normal text-paper">26</b>events</span>
          <span><b className="block font-display text-[3vw] tracking-normal text-paper">02</b>days</span>
          <span><b className="block font-display text-[3vw] tracking-normal text-paper">02</b>systems</span>
        </div>

        <div ref={reg(6)} className="pointer-events-none absolute right-[6vw] bottom-[10vh] font-mono text-[11px] uppercase tracking-[0.5em] text-paper/60">
          scroll to rotate the mechanism
        </div>
      </div>
    </section>
  );
}

const DEPTHS = [0.2, 1.4, 1.1, 0.5, 0.85, 0.65, 0.35];
