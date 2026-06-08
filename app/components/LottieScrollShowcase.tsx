"use client";

import { useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import animationOne from "@/public/lotties/animation-1.json";
import animationTwo from "@/public/lotties/animation-2.json";
import animationThree from "@/public/lotties/animation-3.json";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    title: "Pinned Scroll",
    text: "The section locks in place while the animation reacts to scroll.",
    animation: animationOne,
    color: "#4DA3FF",
  },
  {
    title: "Scrub Control",
    text: "GSAP maps scroll progress directly to motion timing.",
    animation: animationTwo,
    color: "#00E5FF",
  },
  {
    title: "Motion Story",
    text: "Each scroll stage introduces a new animated interaction.",
    animation: animationThree,
    color: "#8B5CF6",
  },
];

export default function LottieScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const activeScene = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;
      const glow = glowRef.current;

      if (!section || !text || !glow) return;

      gsap.set(glow, {
        backgroundColor: scenes[0].color,
      });

      const changeScene = (index: number) => {
        if (index === activeScene.current) return;

        const scene = scenes[index];

        gsap
          .timeline()
          .to(text, {
            opacity: 0,
            y: -30,
            duration: 0.25,
            ease: "power2.in",
          })
          .to(
            glow,
            {
              backgroundColor: scene.color,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "<"
          )
          .add(() => {
            activeScene.current = index;
            setActiveIndex(index);
          })
          .fromTo(
            text,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            }
          );
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scenes.length * 1000}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const index = Math.min(
            scenes.length - 1,
            Math.floor(progress * scenes.length)
          );

          changeScene(index);

          const lottie = lottieRef.current;
          const totalFrames = lottie?.getDuration?.(true);

          if (lottie && totalFrames) {
            const sceneProgress =
              progress * scenes.length - Math.floor(progress * scenes.length);

            lottie.goToAndStop(sceneProgress * totalFrames, true);
          }
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef }
  );

  const current = scenes[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="lottie"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 text-white md:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div
        ref={glowRef}
        className="absolute right-[15%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-25 blur-[150px]"
      />

      <div className="relative z-10 grid min-h-screen items-center gap-12 lg:grid-cols-2">
        <div ref={textRef}>
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            ScrollTrigger Showcase
          </p>

          <h2 className="font-heading text-5xl font-black leading-[0.95] md:text-7xl">
            {current.title}
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            {current.text}
          </p>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-xl items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <Lottie
            key={activeIndex}
            lottieRef={lottieRef}
            animationData={current.animation}
            autoplay={false}
            loop={false}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}