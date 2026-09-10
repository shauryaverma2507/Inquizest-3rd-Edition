import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { OpeningSequence } from "@/components/inquizest/OpeningSequence";
import { IntroWorld } from "@/components/inquizest/IntroWorld";
import { EventTransition } from "@/components/inquizest/EventTransition";
import {
  RadialEventWorld,
  WHEEL_A,
  WHEEL_B,
} from "@/components/inquizest/RadialEventWorld";
import { FinalSection } from "@/components/inquizest/FinalSection";
import { WHEEL_A as EVENTS_A, WHEEL_B as EVENTS_B } from "@/data/events";
import { prefersReducedMotion } from "@/lib/anim";

export const Route = createFileRoute("/")({
  component: Inquizest,
  head: () => ({
    meta: [
      { title: "INQUIZEST 3rd Edition — Event Guide" },
      {
        name: "description",
        content:
          "INQUIZEST 3rd Edition: explore 26 inter-school events at Delhi Public School Shaheedpath, Lucknow.",
      },
      { property: "og:title", content: "INQUIZEST 3rd Edition — Event Guide" },
      {
        property: "og:description",
        content:
          "Scroll becomes the control input: black collapses into light, the logo is revealed from nothing, then 26 events rotate through an invisible mechanism.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Inquizest() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 0.92, wheelMultiplier: 1.08 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-ink">
      <h1 className="sr-only">INQUIZEST 3rd Edition — 26 events across two mechanisms</h1>
      <OpeningSequence />
      <IntroWorld />
      <RadialEventWorld id="wheel-a" events={EVENTS_A} config={WHEEL_A} />
      <EventTransition />
      <RadialEventWorld id="wheel-b" events={EVENTS_B} config={WHEEL_B} />
      <FinalSection />
    </main>
  );
}
