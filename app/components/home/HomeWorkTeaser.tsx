"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeWorkTeaser() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.from(".work-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });

      gsap.from(".work-title span", {
        y: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      gsap.from(".work-copy", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      gsap.from(".work-button", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        delay: 0.35,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      gsap.from(".work-card", {
        y: 90,
        opacity: 0,
        rotate: 4,
        scale: 0.92,
        duration: 0.9,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });

      gsap.to(".work-glow", {
        scale: 1.15,
        opacity: 0.35,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="work-glow absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#4DA3FF]/15 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="work-kicker mb-5 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
          Selected Work
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <h2 className="work-title overflow-hidden font-heading text-5xl font-black leading-[0.9] md:text-7xl">
              <span className="block">Websites</span>
              <span className="block">in Motion.</span>
            </h2>

            <p className="work-copy mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              A preview of landing pages, WordPress builds, React interfaces,
              and GSAP-driven portfolio experiences.
            </p>

            <Link
              href="/work"
              className="work-button mt-8 inline-flex rounded-full bg-[#4DA3FF] px-8 py-4 font-medium text-black hover:bg-[#00E5FF]"
            >
              View Work
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {["Frontend / GSAP", "WordPress / UI"].map((item, index) => (
              <Link
                href="/work"
                key={item}
                className="work-card group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -10,
                    rotate: index === 0 ? -2 : 2,
                    scale: 1.03,
                    duration: 0.35,
                    ease: "power3.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: "power3.out",
                  });
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DA3FF]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <p className="relative z-10 text-sm uppercase tracking-[0.3em] text-[#4DA3FF]">
                  0{index + 1}
                </p>

                <h3 className="relative z-10 mt-20 font-heading text-3xl font-black">
                  {item}
                </h3>

                <p className="relative z-10 mt-4 text-sm text-white/45">
                  View case studies →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}