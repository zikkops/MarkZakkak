"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DangerBanner() {
  const bannerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const banner = bannerRef.current;
      const title = titleRef.current;

      if (!banner || !title) return;

      const topLine = banner.querySelector(".danger-line-top");
      const bottomLine = banner.querySelector(".danger-line-bottom");
      const glow = banner.querySelector(".danger-glow");

      const glowTween = gsap.to(glow, {
        opacity: 1,
        scale: 1.35,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      const topTween = gsap.to(topLine, {
        xPercent: -50,
        duration: 14,
        repeat: -1,
        ease: "none",
      });

      const bottomTween = gsap.to(bottomLine, {
        xPercent: 50,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      const moveX = gsap.quickTo(title, "x", {
        duration: 0.25,
        ease: "power4.out",
      });

      const moveY = gsap.quickTo(title, "y", {
        duration: 0.25,
        ease: "power4.out",
      });

      const moveZ = gsap.quickTo(title, "z", {
        duration: 0.25,
        ease: "power4.out",
      });

      const rotateX = gsap.quickTo(title, "rotationX", {
        duration: 0.25,
        ease: "power4.out",
      });

      const rotateY = gsap.quickTo(title, "rotationY", {
        duration: 0.25,
        ease: "power4.out",
      });

      const scale = gsap.quickTo(title, "scale", {
        duration: 0.25,
        ease: "power4.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = banner.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const distanceX = x - centerX;
        const distanceY = y - centerY;

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        moveX(-distanceX * 0.12);
        moveY(-distanceY * 0.12);
        moveZ(Math.max(-200, 200 - distance * 0.4));

        rotateY(distanceX * 0.05);
        rotateX(-distanceY * 0.05);

        scale(1.15);
      };

      const handleMouseLeave = () => {
        moveX(0);
        moveY(0);
        moveZ(0);
        rotateX(0);
        rotateY(0);
        scale(1);
      };

      banner.addEventListener("mousemove", handleMouseMove);
      banner.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        banner.removeEventListener("mousemove", handleMouseMove);
        banner.removeEventListener("mouseleave", handleMouseLeave);
        glowTween.kill();
        topTween.kill();
        bottomTween.kill();
      };
    },
    { scope: bannerRef }
  );

  return (
    <section
      ref={bannerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div className="danger-glow pointer-events-none absolute h-[700px] w-[700px] rounded-full bg-red-600/35 blur-[180px]" />

      <div className="danger-line-top pointer-events-none absolute top-[15%] flex w-max whitespace-nowrap font-heading text-6xl font-black uppercase text-red-500/10 md:text-8xl">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={`top-${i}`} className="mx-10">
            THREAT LEVEL EXTREME
          </span>
        ))}
      </div>

      <div className="danger-line-bottom pointer-events-none absolute bottom-[15%] flex w-max whitespace-nowrap font-heading text-6xl font-black uppercase text-red-500/10 md:text-8xl">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={`bottom-${i}`} className="mx-10">
            DRAGON DETECTED
          </span>
        ))}
      </div>

      <div className="relative z-10 text-center [perspective:2000px]">
        <p className="mb-6 text-sm uppercase tracking-[0.45em] text-red-500">
          Initializing Encounter
        </p>

        <h2
          ref={titleRef}
          className="font-heading text-7xl font-black uppercase text-red-500 md:text-[10rem]"
          style={{
            transformStyle: "preserve-3d",
            textShadow:
              "0 0 10px rgba(239,68,68,.9), 0 0 40px rgba(239,68,68,.75), 0 0 120px rgba(239,68,68,.55)",
          }}
        >
          THREAT LEVEL
          <br />
          EXTREME
        </h2>

        <div className="mx-auto mt-12 h-2 w-[360px] overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full animate-pulse bg-red-500 shadow-[0_0_35px_rgba(239,68,68,.9)]" />
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.4em] text-white/40">
          Preparing Dragon Encounter...
        </p>
      </div>
    </section>
  );
}