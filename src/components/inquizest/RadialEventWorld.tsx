import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { EventEntry } from "@/data/events";
import { Prop } from "./props";
import { clamp, DEG, easeOutCubic, mapRange } from "@/lib/anim";

gsap.registerPlugin(ScrollTrigger);

export type WheelConfig = {
  /** focal point in viewport fractions — where an event lands when aligned */
  focalX: number;
  focalY: number;
  /** angle (deg) at which an event sits in focus; defines where the hub lives */
  phi: number;
  /** wheel radius as a multiple of viewport width (much larger than the screen) */
  radius: number;
  /** angular spacing between events (deg); sign sets rotation direction */
  step: number;
  label: string;
};

export const WHEEL_A: WheelConfig = {
  focalX: 0.4,
  focalY: 0.52,
  phi: 172,
  radius: 1.35,
  step: 15,
  label: "system i",
};

export const WHEEL_B: WheelConfig = {
  focalX: 0.6,
  focalY: 0.46,
  phi: -8,
  radius: 1.35,
  step: -15,
  label: "system ii",
};

/**
 * An invisible radial mechanism. The circle itself is never drawn — only the
 * contents that swing through the visible frame. Scroll rotates the hub.
 */
export function RadialEventWorld({
  events,
  config,
  id,
}: {
  events: EventEntry[];
  config: WheelConfig;
  id: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const items = useRef<Array<HTMLDivElement | null>>([]);
  const spokes = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLDivElement>(null);

  const n = events.length;
  const heights = useMemo(() => `${n * 72 + 48}vh`, [n]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let R = vw * config.radius;
    let cx = 0;
    let cy = 0;
    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      R = vw * config.radius;
      cx = config.focalX * vw - R * Math.cos(config.phi * DEG);
      cy = config.focalY * vh - R * Math.sin(config.phi * DEG);
      if (spokes.current) {
        spokes.current.style.width = `${R * 2}px`;
        spokes.current.style.height = `${R * 2}px`;
        spokes.current.style.left = `${cx - R}px`;
        spokes.current.style.top = `${cy - R}px`;
      }
      if (halo.current) {
        halo.current.style.left = `${cx}px`;
        halo.current.style.top = `${cy}px`;
      }
    };
    measure();

    let mx = 0;
    let my = 0;
    let progress = 0;

    const apply = () => {
      const rot = progress * (n - 1) * config.step;
      const span = Math.abs(config.step);

      for (let i = 0; i < n; i++) {
        const node = items.current[i];
        if (!node) continue;
        const angle = config.phi + i * config.step - rot;
        const delta = angle - config.phi;
        const near = Math.abs(delta) < span * 2.15;
        if (!near) {
          if (node.style.display !== "none") node.style.display = "none";
          continue;
        }
        if (node.style.display === "none") node.style.display = "";

        const focus = easeOutCubic(clamp(1 - Math.abs(delta) / (span * 1.25)));
        const a = angle * DEG;
        const x = cx + R * Math.cos(a) + mx * (14 + focus * 22);
        const y = cy + R * Math.sin(a) + my * (10 + focus * 18);
        const scale = 0.58 + focus * 0.42;
        node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%,-50%) rotate(${(delta * 0.32).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        node.style.opacity = String(Math.pow(clamp(focus * 1.35), 1.4));
        node.style.zIndex = String(10 + Math.round(focus * 80));
        node.style.setProperty("--focus", focus.toFixed(3));
      }

      if (spokes.current)
        spokes.current.style.transform = `rotate(${(-rot).toFixed(2)}deg)`;
      if (halo.current)
        halo.current.style.transform = `translate(-50%,-50%) scale(${(0.9 + Math.sin(progress * Math.PI) * 0.25).toFixed(3)})`;
      if (readout.current)
        readout.current.textContent = events[Math.min(n - 1, Math.round(progress * (n - 1)))]!.index;
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      if (parallax.current)
        parallax.current.style.transform = `translate3d(${(mx * -30).toFixed(1)}px, ${(my * -18).toFixed(1)}px, 0)`;
    };

    apply();

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress = mapRange(self.progress, 0.04, 0.96);
        apply();
      },
    });

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / vw - 0.5) * 2;
      my = (e.clientY / vh - 0.5) * 2;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          apply();
        });
    };
    const onResize = () => {
      measure();
      apply();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      st.kill();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [config, events, n]);

  return (
    <section ref={host} style={{ height: heights }} className="relative" aria-label={`Events ${events[0]!.index} to ${events[n - 1]!.index}`}>
      <div className="world-stage sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* mechanism traces — never a visible circumference */}
        <div ref={halo} className="pointer-events-none absolute h-[120vmax] w-[120vmax] rounded-full opacity-[0.1] blur-[120px]" style={{ background: "radial-gradient(circle, var(--accent-cyan), transparent 62%)" }} />
        <div ref={spokes} className="pointer-events-none absolute origin-center opacity-[0.16]">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 block h-px origin-left bg-paper/40"
              style={{ width: "50%", transform: `rotate(${i * (360 / 22)}deg)` }}
            />
          ))}
        </div>
        <div ref={parallax} className="halftone pointer-events-none absolute -inset-[10%] text-paper opacity-[0.07]" />

        {/* event compositions riding the invisible wheel */}
        {events.map((ev, i) => (
          <div
            key={ev.id}
            ref={(node) => {
              items.current[i] = node;
            }}
            className="absolute left-0 top-0 w-[min(46vw,720px)] max-md:w-[86vw] will-change-transform"
          >
            <EventComposition event={ev} />
          </div>
        ))}

        {/* technical overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-[5vw] py-[3vh] font-mono text-[10px] uppercase tracking-[0.4em] text-paper/45">
          <span>{config.label}</span>
          <span>
            <span ref={readout} className="text-paper">{events[0]!.index}</span> / {events[n - 1]!.index}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-paper/15">
          <div ref={bar} className="h-px w-full origin-left bg-paper/70" style={{ transform: "scaleX(0)" }} id={id} />
        </div>
      </div>
    </section>
  );
}

function EventComposition({ event }: { event: EventEntry }) {
  const accent = `var(--accent-${event.accent})`;
  return (
    <article className="relative select-none" style={{ ["--a" as string]: accent }}>
      <Prop
        kind={event.prop}
        className="pointer-events-none absolute -right-[14%] -top-[26%] w-[52%] text-paper/30"
      />
      <div className="relative">
        <div className="flex items-end gap-4">
          <span className="font-display text-[13vw] leading-[0.78] text-transparent md:text-[7.5vw]" style={{ WebkitTextStroke: `1.5px ${accent}` }}>
            {event.index}
          </span>
          <span className="mb-[1.4vh] font-mono text-[10px] uppercase tracking-[0.45em]" style={{ color: accent }}>
            {event.kind}
          </span>
        </div>
        <h2 className="font-display text-[8vw] leading-[0.88] tracking-[-0.02em] text-paper md:text-[4.6vw]">
          {event.title}
        </h2>

        <div className="mt-[2.4vh] flex items-start gap-[1.6vw] max-md:flex-col max-md:gap-[2vh]">
          {/* the event's own image, lifted from the brochure */}
          <figure
            className="relative shrink-0 overflow-hidden bg-ink/60 max-md:w-[54%]"
            style={{
              width: "clamp(140px, 15vw, 230px)",
              boxShadow: `0 26px 60px -34px ${accent}`,
              transform: "rotate(-1deg)",
            }}
          >
            <img
              src={event.plate}
              alt={`${event.title} — ${event.kind.toLowerCase()} at INQUIZEST`}
              loading="lazy"
              decoding="async"
              width={640}
              height={650}
              className="block aspect-square w-full object-cover"
            />
            <span
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: `inset 0 0 0 1px ${accent}` }}
            />
          </figure>

          <div className="flex max-w-[34ch] flex-col gap-[1.6vh]">
            <p className="text-[clamp(13px,1.05vw,17px)] leading-relaxed text-paper/60">{event.blurb}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">
              <span>{event.when}</span>
              <span>{event.where}</span>
            </div>
            <div className="flex w-fit divide-x divide-paper/20 border-y border-paper/20 font-mono text-[9px] uppercase tracking-[0.24em] text-paper/65">
              <span className="py-2 pr-4">classes {event.classes}</span>
              <span className="py-2 pl-4">{event.participants} participant{event.participants === "1" ? "" : "s"}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
