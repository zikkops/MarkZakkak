"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimationLab() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const glow = glowRef.current;

      if (!section || !glow) return;

      const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.4, ease: "power3.out" });
      const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.4, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        moveGlowX(e.clientX - rect.left - 250);
        moveGlowY(e.clientY - rect.top - 250);
      };

      section.addEventListener("mousemove", handleMouseMove);

      gsap.set(".lab-final", { opacity: 0, y: 120, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(section, { backgroundColor: "#050505", ease: "none" }, 1.5);
      tl.from(".lab-title", { y: 120, opacity: 0, duration: 1, ease: "power4.out" }, 0);
      tl.from(".lab-word-1", { x: -500, opacity: 0, rotate: -10, duration: 1 }, 0.2);
      tl.from(".lab-word-2", { x: 500, opacity: 0, rotate: 10, duration: 1 }, 0.2);
      tl.from(".lab-card-1", { y: 500, opacity: 0, rotate: 8, duration: 1 }, 1);
      tl.from(".lab-card-2", { y: -500, opacity: 0, rotate: -8, duration: 1 }, 1);
      tl.from(".lab-card-3", { x: 600, opacity: 0, rotate: 12, duration: 1 }, 1);
      tl.to(".lab-card", { scale: 0.75, opacity: 0, stagger: 0.15, duration: 1 }, 2.5);
      tl.to(".lab-intro-title", { y: -120, opacity: 0, scale: 0.9, duration: 1, ease: "power3.inOut" }, 2.6);
      tl.to(".lab-final", { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" }, 3.2);
      tl.to(".lab-final-glow", { scale: 1.4, opacity: 1, duration: 1 }, 3.2);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#07111f] text-white"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full bg-[#4DA3FF]/25 blur-[110px] mix-blend-screen"
      />

      {/* Top Title */}
      <div className="lab-intro-title absolute left-1/2 top-24 z-20 w-full -translate-x-1/2 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#4DA3FF]">
          Animation Lab
        </p>

        <h2 className="lab-title font-heading text-4xl font-black leading-[0.9] text-white md:text-8xl">
          Motion
          <br />
          Experiments
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen items-center justify-center px-6">

        {/* Floating Words */}
        <div className="lab-word-1 absolute left-3 top-1/3 font-heading text-2xl text-white/10 md:left-20 md:text-5xl">
          SCROLL
        </div>
        <div className="lab-word-2 absolute bottom-1/3 right-3 font-heading text-2xl text-white/10 md:right-20 md:text-5xl">
          TRIGGER
        </div>

        {/* Card 1 */}
        <div className="lab-card lab-card-1
          absolute
          bottom-[52%] left-1/2 w-[90vw] max-w-md -translate-x-1/2
          md:bottom-auto md:left-[8%] md:top-[22%] md:w-72 md:translate-x-0
          h-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-[#4DA3FF]">01</p>
          <h3 className="mt-6 font-heading text-2xl font-black md:text-3xl">Text Reveals</h3>
          <p className="mt-3 text-sm text-white/50 md:mt-4 md:text-base">
            Animated typography, staggered words, and cinematic entrances.
          </p>
        </div>

        {/* Card 2 */}
        <div className="lab-card lab-card-2
          absolute
          bottom-[28%] left-1/2 w-[90vw] max-w-md -translate-x-1/2
          md:bottom-[18%] md:left-[38%] md:w-72 md:translate-x-0
          h-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-[#00E5FF]">02</p>
          <h3 className="mt-6 font-heading text-2xl font-black md:text-3xl">Scroll Scenes</h3>
          <p className="mt-3 text-sm text-white/50 md:mt-4 md:text-base">
            Pinned sections that transform while the user scrolls.
          </p>
        </div>

        {/* Card 3 */}
        <div className="lab-card lab-card-3
          absolute
          bottom-[4%] left-1/2 w-[90vw] max-w-md -translate-x-1/2
          md:bottom-auto md:left-auto md:right-[8%] md:top-[28%] md:w-72 md:translate-x-0
          h-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8B5CF6]">03</p>
          <h3 className="mt-6 font-heading text-2xl font-black md:text-3xl">Cursor Motion</h3>
          <p className="mt-3 text-sm text-white/50 md:mt-4 md:text-base">
            Interactive glow, movement, and subtle mouse-reactive effects.
          </p>
        </div>

        {/* Final Text */}
        <div className="lab-final absolute text-center">
          <div className="lab-final-glow absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4DA3FF]/20 opacity-0 blur-[100px]" />
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Built with GSAP
          </p>
          <h2 className="font-heading text-5xl font-black leading-[0.9] md:text-8xl">
            Interaction
            <br />
            Through Code.
          </h2>
        </div>
      </div>
    </section>
  );
}
