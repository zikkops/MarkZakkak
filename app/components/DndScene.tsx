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

      video.pause();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4500",
          scrub: 1,
          pin: true,
        },
      });

      video.addEventListener("loadedmetadata", () => {
        tl.to(
          video,
          {
            currentTime: video.duration,
            ease: "none",
          },
          0
        );
      });

      tl.from(
        ".character-card",
        {
          opacity: 0,
          scale: 0.8,
          y: 80,
          stagger: 0.25,
          duration: 1,
          ease: "power3.out",
        },
        1
      );

      tl.to(
        ".character-card",
        {
          opacity: 0,
          y: -60,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.in",
        },
        2.5
      );

      tl.from(
        ".boss-card",
        {
          opacity: 0,
          x: 180,
          scale: 0.9,
          duration: 1,
          ease: "power4.out",
        },
        3
      );

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative z-10 flex h-screen items-center justify-center px-6">
        <video
          ref={videoRef}
          src="/videos/dnd-scene.webm"
          muted
          playsInline
          preload="auto"
          className="h-[72vh] w-[78vw] rounded-[2rem] border border-white/10 object-cover shadow-[0_0_120px_rgba(77,163,255,0.18)]"
        />

        <div className="character-card absolute left-[8%] top-[22%] w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4DA3FF]">
            Warrior
          </p>
          <h3 className="mt-3 font-heading text-2xl font-black">The Shield</h3>
          <p className="mt-3 text-sm text-white/60">
            Frontline defender holding the dragon’s attention.
          </p>
        </div>

        <div className="character-card absolute bottom-[18%] left-[20%] w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#00E5FF]">
            Archer
          </p>
          <h3 className="mt-3 font-heading text-2xl font-black">The Hunter</h3>
          <p className="mt-3 text-sm text-white/60">
            Controls distance and finds the weak point.
          </p>
        </div>

        <div className="character-card absolute right-[28%] top-[18%] w-64 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8B5CF6]">
            Mage
          </p>
          <h3 className="mt-3 font-heading text-2xl font-black">The Arcane</h3>
          <p className="mt-3 text-sm text-white/60">
            Channels unstable magic to break the dragon’s defense.
          </p>
        </div>

        <div className="boss-card absolute right-[6%] top-1/2 w-[360px] -translate-y-1/2 rounded-[2rem] border border-[#4DA3FF]/30 bg-black/70 p-8 opacity-0 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
            Boss Encounter
          </p>
          <h3 className="mt-4 font-heading text-4xl font-black">
            Ancient Dragon
          </h3>
          <p className="mt-5 text-white/60">
            A cinematic boss reveal with scroll-controlled video playback,
            character callouts, and layered GSAP motion.
          </p>
        </div>
      </div>
    </section>
  );
}