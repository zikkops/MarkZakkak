"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const typingElement = document.querySelector(".typing-text");

      gsap.to(".scroll-dot", {
        y: 28,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".scroll-arrow", {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      if (!typingElement) return;

      const introTl = gsap.timeline();

      introTl
        .from(".hero-label", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(".hero-title span", {
          y: 120,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        })
        .from(".typing-wrapper", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(".hero-buttons a", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });

      const phrases = [
        "I build websites that move.",
        "Interactive front-end experiences.",
        "Motion-driven web interfaces.",
        "Clean code. Smooth motion.",
        "Frontend developer crafting digital motion.",
      ];

      const typingTl = gsap.timeline({
        repeat: -1,
        delay: 2.2,
      });

      phrases.forEach((phrase) => {
        typingTl
          .to(typingElement, {
            text: phrase,
            duration: phrase.length * 0.05,
            ease: "none",
          })
          .to({}, { duration: 1.4 })
          .to(typingElement, {
            text: "",
            duration: phrase.length * 0.03,
            ease: "none",
          })
          .to({}, { duration: 0.3 });
      });

      return () => {
        typingTl.kill();
        introTl.kill();
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 text-white md:px-12"
    >
      {/* Spline background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <iframe
          src="https://my.spline.design/3ddesigntextcopycopy-fzGE4AyjaI6zVIhiHFnHYgzu-YkR/"
          frameBorder="0"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            border: "none",
          }}
        />
      </div>

      {/* Dark overlay — pointer-events-none so Spline stays fully interactive */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div>
          <p className="hero-label mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Front-End Developer — Motion & Interaction
          </p>

          <h1 className="hero-title font-heading text-6xl font-black leading-[0.9] md:text-8xl lg:text-[9rem]">
            <span className="block">MARK</span>
            <span className="block">ZAKKAK</span>
          </h1>

          <div className="typing-wrapper mt-8 min-h-[40px]">
            <h2 className="text-2xl font-medium text-white md:text-4xl">
              <span className="typing-text"></span>
              <span className="ml-1 animate-pulse text-[#4DA3FF]">|</span>
            </h2>
          </div>

          <p className="hero-description mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            I build websites that move with purpose — clean interfaces, precise
            animations, and interactions people actually notice.
          </p>

          <div className="hero-buttons mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/work"
              className="rounded-full bg-[#4DA3FF] px-8 py-4 text-center font-medium text-black hover:bg-[#00E5FF] transition-colors duration-200"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-8 py-4 text-center font-medium text-white hover:border-[#4DA3FF] hover:text-[#4DA3FF] transition-colors duration-200"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
        <span className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
          Scroll
        </span>

        <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">
          <div className="scroll-dot mt-2 h-2 w-2 rounded-full bg-[#4DA3FF]" />
        </div>

        <div className="scroll-arrow mt-3 text-[#4DA3FF]">↓</div>
      </div>
    </section>
  );
}