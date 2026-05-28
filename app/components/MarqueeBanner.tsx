"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const wordsOne = ["GSAP", "SCROLLTRIGGER", "MOTION", "FRONTEND", "NEXT.JS"];
const wordsTwo = ["INTERACTION", "CREATIVE DEV", "UI MOTION", "ANIMATION LAB"];

export default function MarqueeBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!topRef.current || !bottomRef.current) return;

      const topTween = gsap.to(topRef.current, {
        xPercent: -50,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      const bottomTween = gsap.fromTo(
        bottomRef.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 22,
          repeat: -1,
          ease: "none",
        }
      );

      return () => {
        topTween.kill();
        bottomTween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[260px] overflow-hidden bg-[#07111f]"
    >
      <div className="absolute left-[-10%] top-[35%] w-[120%] -rotate-6 border-y border-white/10 bg-[#4DA3FF] py-5 text-black">
        <div
          ref={topRef}
          className="flex w-max whitespace-nowrap font-heading text-4xl font-black uppercase tracking-tight md:text-6xl"
        >
          {[...wordsOne, ...wordsOne].map((word, index) => (
            <span key={`top-${index}`} className="mx-8 flex items-center gap-8">
              <span>{word}</span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-[-10%] top-[45%] w-[120%] rotate-6 border-y border-white/10 bg-[#050505] py-5 text-white">
        <div
          ref={bottomRef}
          className="flex w-max whitespace-nowrap font-heading text-4xl font-black uppercase tracking-tight md:text-6xl"
        >
          {[...wordsTwo, ...wordsTwo].map((word, index) => (
            <span
              key={`bottom-${index}`}
              className="mx-8 flex items-center gap-8"
            >
              <span>{word}</span>
              <span className="text-[#4DA3FF]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}