"use client";

import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SplineShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 1024;

      // Pin only on desktop
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
        });
      }

      // Text + cards animate in as soon as section enters viewport
      gsap.from(".spline-kicker", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spline-kicker",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".spline-title", {
        opacity: 0,
        y: 80,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".spline-title",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".spline-copy", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spline-copy",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".spline-wrapper", {
        opacity: 0,
        scale: 0.92,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spline-wrapper",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".feature-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Ambient glow pulse — always runs
      gsap.to(".spline-glow", {
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    gsap.fromTo(
      ".spline-scene",
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="spline"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 text-white md:px-12"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Glow */}
      <div className="spline-glow absolute right-[15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#4DA3FF]/20 blur-[140px]" />

      <div className="relative z-10 grid min-h-screen items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="spline-kicker mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Interactive 3D
          </p>

          <h2 className="spline-title font-heading text-5xl font-black leading-[0.95] md:text-7xl">
            Real-Time
            <br />
            3D Experiences
          </h2>

          <p className="spline-copy mt-6 max-w-md text-lg leading-relaxed text-white/60">
            Combining Spline, React and GSAP to create immersive web experiences
            that users can interact with.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="feature-card rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              Interactive Objects
            </div>
            <div className="feature-card rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              Scroll Storytelling
            </div>
            <div className="feature-card rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              Real-Time Rendering
            </div>
          </div>
        </div>

        {/* Right — Spline */}
        <div className="spline-wrapper relative h-[400px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 lg:h-[650px]">
          {!splineLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#4DA3FF]" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Loading 3D scene
                </p>
              </div>
            </div>
          )}

          <div className="spline-scene h-full w-full" style={{ opacity: 0 }}>
            <Spline
              scene="https://prod.spline.design/BVT4j34shypwOls8/scene.splinecode"
              onLoad={handleSplineLoad}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
