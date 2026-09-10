import { LogoMark } from "./LogoMark";

export function FinalSection() {
  return (
    <section className="world-stage relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink px-[6vw] py-[10vh]" aria-label="Event details">
      <div className="halftone pointer-events-none absolute inset-0 text-paper opacity-[0.06]" />
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-paper/45">the universe awaits</p>
        <h2 className="mt-[3vh] max-w-[18ch] font-display text-[11vw] leading-[0.86] tracking-[-0.02em] text-paper md:text-[6vw]">
          05—06 OCTOBER 2026
        </h2>
        <div className="mt-[5vh] max-w-[56ch] border-l border-accent-yellow pl-5 font-mono text-[11px] uppercase leading-loose tracking-[0.28em] text-paper/65">
          Delhi Public School Shaheedpath · Lucknow<br />
          Inter-school fest · 3rd edition
        </div>
      </div>
      <div className="relative mt-[10vh] flex flex-wrap items-end justify-between gap-[4vh]">
        <LogoMark tone="color" className="w-[min(46vw,520px)]" />
        <p className="font-mono text-[10px] uppercase leading-loose tracking-[0.32em] text-paper/40">
          Teacher-in-charge · Ms Firdaus Fatima Rizvi
          <br />
          +91 79069 68820 · dpsinquizest@gmail.com
        </p>
      </div>
    </section>
  );
}
