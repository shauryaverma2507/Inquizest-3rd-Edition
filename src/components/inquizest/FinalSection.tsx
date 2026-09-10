import { LogoMark } from "./LogoMark";
import { ExternalLink } from "lucide-react";

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
      <div className="relative mt-[8vh] grid gap-[5vh] lg:grid-cols-[minmax(300px,520px)_1fr] lg:items-end">
        <LogoMark tone="color" className="w-full max-w-[520px]" />
        <div className="lg:justify-self-end">
          <div className="grid gap-x-8 gap-y-2 font-mono text-[10px] uppercase leading-loose tracking-[0.22em] text-paper/55 sm:grid-cols-2">
            <p>Ms Firdaus Fatima Rizvi<br /><span className="text-paper/35">Teacher-in-Charge · </span><a href="tel:+917906968820" className="text-paper/75">+91 79069 68820</a></p>
            <p>Ms Akanksha Singh<br /><span className="text-paper/35">Teacher-in-Charge · </span><a href="tel:+917376080931" className="text-paper/75">+91 73760 80931</a></p>
            <p>Dishita Yadav<br /><span className="text-paper/35">Administrative Head · </span><a href="tel:+918853684701" className="text-paper/75">+91 88536 84701</a></p>
            <p>Siddhi Singh<br /><span className="text-paper/35">Literary Director · </span><a href="tel:+919151697988" className="text-paper/75">+91 91516 97988</a></p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em]">
            <a href="mailto:dpsinquizest@gmail.com" className="text-paper/65 transition-colors hover:text-paper">dpsinquizest@gmail.com</a>
            <a href="https://www.instagram.com/dps_inquizest/" target="_blank" rel="noreferrer" className="text-paper/65 transition-colors hover:text-paper">@dps_Inquizest</a>
            <a href="/brochure.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-paper/30 px-4 py-2.5 text-paper transition-colors hover:border-accent-yellow hover:text-accent-yellow">
              More details · Brochure PDF <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
