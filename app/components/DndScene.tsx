"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function DndScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

useGSAP(
  () => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    video.pause();

    gsap.set(".dnd-card", {
      opacity: 0,
      y: 80,
      scale: 0.9,
    });

    gsap.set(".boss-card", {
      opacity: 0,
      x: 180,
      scale: 0.95,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=4500",
        scrub: 1,
        pin: true,

        onUpdate: () => {
        video.playbackRate = 1.5;

          if (video.paused) {
            video.play();
          }

          clearTimeout(scrollTimeout);

          scrollTimeout = setTimeout(() => {
            video.pause();
          }, 150);
        },

        onLeave: () => {
          video.pause();
          video.currentTime = 0;
        },

        onLeaveBack: () => {
          video.pause();
          video.currentTime = 0;
        },
      },
    });

    tl.to(".dnd-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.18,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(
      ".dnd-card",
      {
        y: -20,
        duration: 1,
        ease: "sine.inOut",
      },
      1
    );

    tl.to(
      ".dnd-card",
      {
        opacity: 0,
        y: -80,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.in",
      },
      2.2
    );

    tl.to(
      ".boss-card",
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
      },
      2.8
    );

    tl.to(
      ".boss-card",
      {
        y: -10,
        duration: 1,
        ease: "sine.inOut",
      },
      3.8
    );

    return () => {
      clearTimeout(scrollTimeout);
      tl.kill();
    };
  },
  { scope: sectionRef }
);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Full background video */}
      <video
        ref={videoRef}
        src="/videos/dnd-scene.webm"
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Section title */}
      <div className="absolute left-8 top-8 z-20 md:left-12 md:top-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
          Character Scene
        </p>
        <h2 className="mt-4 font-heading text-5xl font-black md:text-7xl">
          Party vs Dragon
        </h2>
      </div>

      {/* Character cards */}
      <div className="dnd-card absolute left-[6%] top-[36%] z-20 w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">
          Warrior
        </p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Shield</h3>
        <p className="mt-3 text-sm text-white/60">
          Holds the frontline and keeps the dragon focused.
        </p>
      </div>

      <div className="dnd-card absolute bottom-[16%] left-[24%] z-20 w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#00E5FF]">
          Archer
        </p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Hunter</h3>
        <p className="mt-3 text-sm text-white/60">
          Attacks from distance and finds the weak point.
        </p>
      </div>

      <div className="dnd-card absolute right-[28%] top-[28%] z-20 w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8B5CF6]">
          Mage
        </p>
        <h3 className="mt-3 font-heading text-2xl font-black">The Arcane</h3>
        <p className="mt-3 text-sm text-white/60">
          Channels unstable magic to break the dragon’s defense.
        </p>
      </div>

      {/* Boss card */}
      <div className="boss-card absolute right-[6%] top-1/2 z-30 w-[390px] -translate-y-1/2 rounded-[2rem] border border-[#4DA3FF]/30 bg-black/75 p-8 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
          Boss Encounter
        </p>

        <h3 className="mt-4 font-heading text-4xl font-black">
          Ancient Dragon
        </h3>

        <p className="mt-5 text-white/60">
          The final threat of the scene. A massive creature revealed through
          cinematic scroll motion, layered UI callouts, and dramatic pacing.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="text-white/40">Threat</span>
            <p className="font-heading text-xl">Extreme</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="text-white/40">Type</span>
            <p className="font-heading text-xl">Dragon</p>
          </div>
        </div>
      </div>
    </section>
  );
}