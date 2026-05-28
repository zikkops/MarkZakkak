"use client";

import { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, TextPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const revealTextRef = useRef<HTMLDivElement | null>(null);

 useGSAP(
  () => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    const revealText = revealTextRef.current;
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

    if (!hero || !glow || !revealText || !typingElement) return;

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

    const moveGlowX = gsap.quickTo(glow, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveGlowY = gsap.quickTo(glow, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveRevealX = gsap.quickTo(revealText, "--x", {
      duration: 0.35,
      ease: "power3.out",
      unit: "px",
    });

    const moveRevealY = gsap.quickTo(revealText, "--y", {
      duration: 0.35,
      ease: "power3.out",
      unit: "px",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      moveGlowX(x - 250);
      moveGlowY(y - 250);

      moveRevealX(x);
      moveRevealY(y);
    };
   

    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      typingTl.kill();
      introTl.kill();
    };
    
  },
  
  { scope: heroRef }
);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 text-white md:px-12"
    >
      <div className="absolute left-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#4DA3FF]/20 blur-[150px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

      <header className="relative z-10 flex items-center justify-between py-6">
        <div className="font-heading text-xl font-bold">
          MZ<span className="text-[#4DA3FF]">.</span>
        </div>

        <nav className="hidden gap-8 text-sm text-white/60 md:flex">
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#lab" className="hover:text-white">Lab</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center">
        <div>
          <p className="hero-label mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Front-End Developer / GSAP Animations
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
            I create interactive websites with clean interfaces, smooth animations,
            and motion-driven user experiences.
          </p>

          <div className="hero-buttons mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#work"
              className="rounded-full bg-[#4DA3FF] px-8 py-4 text-center font-medium text-black hover:bg-[#00E5FF]"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/20 px-8 py-4 text-center font-medium text-white hover:border-[#4DA3FF] hover:text-[#4DA3FF]"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      {/* Hidden background text */}
      <div className="pointer-events-none absolute right-8 top-1/2 z-0 hidden -translate-y-1/2 text-right font-heading text-[8rem] font-black leading-[0.85] tracking-tight text-white/[0.03] lg:block">
        CREATIVE
        <br />
        FRONTEND
        <br />
        DEVELOPER
      </div>

      {/* Cursor reveal glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full bg-[#4DA3FF]/20 blur-[110px] mix-blend-screen"
      />

      {/* Revealed text layer */}
      <div ref={revealTextRef}
        className="pointer-events-none absolute right-8 top-1/2 z-[2] hidden -translate-y-1/2 text-right font-heading text-[8rem] font-black leading-[0.85] tracking-tight text-black lg:block"
        style={{
          maskImage:
            "radial-gradient(circle 230px at var(--x, 50%) var(--y, 50%), black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle 230px at var(--x, 50%) var(--y, 50%), black 0%, transparent 70%)",
        }}
      >
        CREATIVE
        <br />
        FRONTEND
        <br />
        DEVELOPER
      </div>
      {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
          <span className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
            Scroll
          </span>

          <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">
            <div className="scroll-dot mt-2 h-2 w-2 rounded-full bg-[#4DA3FF]" />
          </div>

          <div className="scroll-arrow mt-3 text-[#4DA3FF]">
            ↓
          </div>
        </div>
    </section>
  );
}