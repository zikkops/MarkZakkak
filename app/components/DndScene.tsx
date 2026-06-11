"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DndScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef   = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video   = videoRef.current;
      if (!section || !video) return;

      video.play().catch(() => {});

      const isMobile = window.innerWidth < 768;

      gsap.set(".dnd-card", { opacity: 0, y: isMobile ? 40 : 80, scale: 0.9 });
      gsap.set(".boss-card", {
        opacity: 0,
        x: isMobile ? 0 : 180,
        y: isMobile ? 60 : 0,
        scale: 0.95,
      });

      const ENTER  = 1.0;
      const HOLD   = 1.5;
      const EXIT   = 0.8;
      const STRIDE = ENTER + HOLD + EXIT;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=5000",
          scrub: 1.5,
          pin: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".dnd-card");

      if (isMobile) {
        cards.forEach((card, i) => {
          const o = i * STRIDE;
          tl.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: ENTER, ease: "power3.out" },
            o
          );
          tl.to(
            card,
            { opacity: 0, y: -30, scale: 0.92, duration: EXIT, ease: "power2.in" },
            o + ENTER + HOLD
          );
        });
      } else {
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: ENTER, ease: "power3.out" },
            i * (ENTER + 0.3)
          );
        });
      }

      const bossStart = isMobile
        ? cards.length * STRIDE + 0.5
        : cards.length * (ENTER + 0.3) + HOLD;

      if (!isMobile) {
        tl.to(
          ".dnd-card",
          { opacity: 0, y: -60, scale: 0.92, stagger: 0.1, duration: 0.8, ease: "power2.in" },
          bossStart - 0.6
        );
      }

      tl.fromTo(
        ".boss-card",
        { opacity: 0, x: isMobile ? 0 : 180, y: isMobile ? 60 : 0, scale: 0.95 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
        bossStart
      );

      tl.to(
        ".boss-card",
        { y: -12, duration: 1.5, ease: "sine.inOut" },
        bossStart + 1.5
      );

      return () => { tl.kill(); };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white"
      style={{ height: "100vh", maxWidth: "100vw", overflowX: "hidden" }}
    >
      <video
        ref={videoRef}
        src="/videos/dnd-scene.webm"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="absolute left-4 top-6 z-20 md:left-12 md:top-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF] md:text-sm md:tracking-[0.35em]">
          Character Scene
        </p>
        <h2 className="mt-2 font-heading text-4xl font-black md:mt-4 md:text-7xl">
          Party vs Dragon
        </h2>
      </div>

      <div className="dnd-card
        absolute z-20
        left-1/2 top-1/2 w-[88vw] max-w-sm -translate-x-1/2 -translate-y-1/2
        md:left-[6%] md:top-[36%] md:w-64 md:translate-x-0 md:translate-y-0
        rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">Fighter</p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Shield</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          "I'll take the hit — nobody touches them while I'm standing.
          Get behind me and stay there!"
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#4DA3FF]/30 px-3 py-1 text-[10px] uppercase tracking-wider text-[#4DA3FF]">Shield Slam</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/40">Taunt</span>
        </div>
      </div>

      <div className="dnd-card
        absolute z-20
        left-1/2 top-1/2 w-[88vw] max-w-sm -translate-x-1/2 -translate-y-1/2
        md:bottom-[16%] md:left-[24%] md:top-auto md:w-64 md:translate-x-0 md:translate-y-0
        rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8B5CF6]">Paladin</p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Divine</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          "By the light I will shield you — lay on hands,
          divine smite incoming. Dragon, your reign ends here."
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#8B5CF6]/30 px-3 py-1 text-[10px] uppercase tracking-wider text-[#8B5CF6]">Divine Smite</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/40">Lay on Hands</span>
        </div>
      </div>

      <div className="dnd-card
        absolute z-20
        left-1/2 top-1/2 w-[88vw] max-w-sm -translate-x-1/2 -translate-y-1/2
        md:right-[28%] md:top-[28%] md:w-64 md:translate-x-0 md:translate-y-0 md:left-auto
        rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#00E5FF]">Ranger</p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Hunter</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          "I see the gap in its scales — one clean shot
          to the throat and this dragon won't fly again."
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#00E5FF]/30 px-3 py-1 text-[10px] uppercase tracking-wider text-[#00E5FF]">Pinning Shot</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/40">Hunter's Mark</span>
        </div>
      </div>

      <div className="boss-card
        absolute z-30
        bottom-6 left-1/2 w-[92vw] max-w-sm -translate-x-1/2
        md:bottom-auto md:right-[6%] md:top-1/2 md:w-[390px] md:max-w-none md:translate-x-0 md:-translate-y-1/2 md:left-auto
        rounded-[2rem] border border-red-500/30 bg-black/75 p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-red-500">
          Boss Encounter
        </p>
        <h3 className="mt-3 font-heading text-3xl font-black md:mt-4 md:text-4xl">
          Ancient Dragon
        </h3>
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-red-500/60">Last Words</p>
          <p className="text-sm italic leading-relaxed text-white/70">
            "Impossible… I have burned kingdoms, outlasted gods…
            I cannot fall to — to mortals. This… is not… the end…"
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:mt-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="text-white/40">Threat</span>
            <p className="font-heading text-xl">Extreme</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="text-white/40">Status</span>
            <p className="font-heading text-xl text-red-400">Defeated</p>
          </div>
        </div>
      </div>
    </section>
  );
}