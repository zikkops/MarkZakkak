"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeDragonTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const particles = particlesRef.current;

      if (!section || !particles) return;

      const sparkTweens: gsap.core.Tween[] = [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });

      tl.from(".dragon-kicker", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".dragon-title",
          {
            y: 90,
            opacity: 0,
            scale: 0.92,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.25"
        )
        .from(
          ".dragon-copy",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          ".dragon-button",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );

      const glowTween = gsap.to(".dragon-glow", {
        scale: 1.25,
        opacity: 0.45,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      for (let i = 0; i < 35; i++) {
        const spark = document.createElement("span");

        spark.className =
          "absolute h-[3px] w-[3px] rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,107,53,0.9)]";

        spark.style.left = `${(i * 17.37) % 100}%`;
        spark.style.top = `${70 + ((i * 9.23) % 35)}%`;

        particles.appendChild(spark);

        const tween = gsap.to(spark, {
          y: -500,
          x: ((i % 2 === 0 ? 1 : -1) * ((i * 23) % 140)),
          opacity: 0,
          duration: 3 + ((i * 0.37) % 4),
          delay: (i * 0.13) % 3,
          repeat: -1,
          ease: "none",
        });

        sparkTweens.push(tween);
      }

      return () => {
        tl.kill();
        tl.scrollTrigger?.kill();
        glowTween.kill();
        sparkTweens.forEach((tween) => tween.kill());
        particles.replaceChildren();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-28 text-center md:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.18),transparent_55%)]" />

      <div className="dragon-glow absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/25 blur-[150px]" />

      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="dragon-kicker mb-5 text-sm uppercase tracking-[0.35em] text-red-500">
          Standalone Experience
        </p>

        <h2 className="dragon-title font-heading text-5xl font-black uppercase leading-[0.9] text-red-500 md:text-7xl">
          Party vs Dragon
        </h2>

        <p className="dragon-copy mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
          A cinematic scroll-driven encounter with video, callouts, boss reveal,
          and GSAP storytelling.
        </p>

        <Link
          href="/experiences/dragon-encounter"
          className="dragon-button mt-8 inline-flex rounded-full border border-red-500/40 px-8 py-4 font-medium text-red-500 hover:bg-red-500 hover:text-black"
        >
          Enter Encounter
        </Link>
      </div>
    </section>
  );
}