"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeLabTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });

      tl.from(".lab-kicker", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".lab-title span",
          {
            y: 100,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .from(
          ".lab-copy",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          ".lab-button",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          ".lab-chip",
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.25"
        );

      gsap.to(".lab-glow", {
        scale: 1.2,
        opacity: 0.35,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        tl.kill();
        tl.scrollTrigger?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-12"
    >
      <div className="absolute inset-0 bg-[#07111f]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="lab-glow absolute right-[-10%] top-[-30%] h-[520px] w-[520px] rounded-full bg-[#4DA3FF]/20 blur-[150px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="lab-kicker mb-5 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Animation Lab
          </p>

          <h2 className="lab-title overflow-hidden font-heading text-5xl font-black leading-[0.9] md:text-7xl">
            <span className="block">Experiments</span>
            <span className="block">built with GSAP.</span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {["ScrollTrigger", "Lottie", "Spline", "Cursor FX"].map((item) => (
              <span
                key={item}
                className="lab-chip rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/55 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <p className="lab-copy text-lg leading-relaxed text-white/60">
            ScrollTrigger scenes, cursor effects, Lottie experiments, Spline
            embeds, and interaction ideas live in the lab.
          </p>

          <Link
            href="/lab"
            className="lab-button mt-8 inline-flex w-fit rounded-full border border-white/20 px-8 py-4 font-medium text-white hover:border-[#4DA3FF] hover:text-[#4DA3FF]"
          >
            Enter Lab
          </Link>
        </div>
      </div>
    </section>
  );
}