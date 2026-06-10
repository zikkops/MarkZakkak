"use client";

import DangerBanner from "@/app/components/DangerBanner";
import DndScene from "@/app/components/DndScene";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "@/app/components/SplineScene";

gsap.registerPlugin(ScrollTrigger);

export default function DragonEncounterPage() {
  const mergedRef    = useRef<HTMLElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const behindRef    = useRef<HTMLElement | null>(null);

  // ── Merged hero + party section ───────────────────────────────────────────
  useGSAP(() => {
    const section   = mergedRef.current;
    const particles = particlesRef.current;
    if (!section || !particles) return;

    const sparkTweens: gsap.core.Tween[] = [];

    // ── 1. Entrance: hero text flies in on load ──────────────────────────
    const entranceTl = gsap.timeline({ delay: 0.1 });
    entranceTl
      .from(".hero-kicker",    { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".hero-title span", { y: 120, opacity: 0, duration: 1, stagger: 0.12, ease: "power4.out" }, "-=0.3")
      .from(".hero-copy",      { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(".hero-button",    { y: 25, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

    // ── 2. Heartbeat pulse — opacity only so it doesn't fight the scroll-driven scale ──
    gsap.to(".merged-glow", {
      opacity: 0.15,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // ── 3. Scroll-driven timeline across the full merged section ─────────
    //    The scroll distance is 200vh (the section is min-h-[200vh])
    //    0%   → hero is centered, party content invisible below
    //    50%  → hero title has shrunk + moved to top, party content rising in
    //    100% → hero title is small header, party cards fully visible
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Glow grows the entire scroll length, reaching climax at the very bottom.
    // Scrub drives it forward only — GSAP scrub never rewinds past the end,
    // so once you reach the bottom it stays at full scale.
    gsap.fromTo(".merged-glow",
      { scale: 1, opacity: 0.3 },
      {
        scale: 6,
        opacity: 0.75,
        ease: "power1.in",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      }
    );

    // Hero content: title shrinks + floats to top, copy + button fade out
    scrollTl
      .to(".hero-inner", {
        y: "-38vh",
        ease: "power2.inOut",
      }, 0)
      .to(".hero-title", {
        scale: 0.38,
        transformOrigin: "top center",
        ease: "power2.inOut",
      }, 0)
      .to(".hero-kicker", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      }, 0)
      .to(".hero-copy", {
        opacity: 0,
        y: -15,
        ease: "power2.in",
      }, 0)
      .to(".hero-button", {
        opacity: 0,
        y: -10,
        ease: "power2.in",
      }, 0);

    // Party content: rises up from below as scroll progresses
    // Start invisible and off-screen, animate into view in the second half
    gsap.set(".party-inner", { opacity: 0, y: 80 });
    scrollTl
      .to(".party-inner", {
        opacity: 1,
        y: 0,
        ease: "power3.out",
      }, 0.35) // starts entering at 35% of scroll progress
      .from(".party-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
      }, 0.5)
      .from(".party-spline", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        transformOrigin: "center bottom",
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      }, 0.65);

    // ── 4. Sparks — mix of red + orange across the full section ──────────
    for (let i = 0; i < 55; i++) {
      const isOrange = i % 3 === 0;
      const spark = document.createElement("span");
      spark.className = isOrange
        ? "absolute h-[3px] w-[3px] rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,107,53,0.9)]"
        : "absolute h-[3px] w-[3px] rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.9)]";
      spark.style.left = `${(i * 15.37) % 100}%`;
      spark.style.top  = `${50 + ((i * 9.23) % 50)}%`;
      particles.appendChild(spark);

      const t = gsap.to(spark, {
        y: -700,
        x: (i % 2 === 0 ? 1 : -1) * ((i * 23) % 160),
        opacity: 0,
        duration: 3 + ((i * 0.37) % 4),
        delay: (i * 0.11) % 3,
        repeat: -1,
        ease: "none",
      });
      sparkTweens.push(t);
    }

    return () => {
      entranceTl.kill();
      scrollTl.kill();
      scrollTl.scrollTrigger?.kill();
      sparkTweens.forEach((t) => t.kill());
      particles.replaceChildren();
    };
  }, { scope: mergedRef });

  // ── Behind the scene section (unchanged) ─────────────────────────────────
  useGSAP(() => {
    const section = behindRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 72%" },
    });

    tl.from(".behind-kicker", { y: 20, opacity: 0, duration: 0.55, ease: "power3.out" })
      .from(".behind-title span", { y: 70, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power4.out" }, "-=0.25")
      .from(".behind-item",  { x: 30, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" }, "-=0.4")
      .from(".behind-cta",   { y: 20, opacity: 0, duration: 0.5,  ease: "power3.out" }, "-=0.2");
  }, { scope: behindRef });

  return (
    <main className="bg-black text-white">
      <Header />

      {/* ══════════════════════════════════════════════
          MERGED SECTION — Hero + Party in one container
          min-h-[200vh] gives the scroll room to breathe
      ══════════════════════════════════════════════ */}
      <section
        ref={mergedRef}
        className="relative min-h-[200vh] overflow-hidden bg-black px-6 md:px-12"
      >
        {/* Shared grid + radial overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

        {/* Single shared heartbeat glow */}
        <div className="merged-glow pointer-events-none absolute left-1/2 top-[40%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/30 blur-[140px]" />

        {/* Sparks live across the full section */}
        <div ref={particlesRef} className="pointer-events-none absolute inset-0 overflow-hidden" />

        {/* ── HERO CONTENT — sticky so it stays on screen while scrolling ── */}
        <div className="sticky top-0 flex h-screen items-center justify-center text-center">
          <div className="hero-inner relative z-10 mx-auto max-w-5xl">
            <p className="hero-kicker mb-6 text-sm uppercase tracking-[0.4em] text-red-500">
              Interactive Experience
            </p>

            <h1 className="font-heading text-6xl font-black uppercase leading-[0.85] text-red-500 md:text-8xl lg:text-[9rem]">
              <span className="hero-title block overflow-hidden">
                <span className="inline-block">The Dragon</span>
              </span>
              <span className="hero-title block overflow-hidden">
                <span className="inline-block">Awakens</span>
              </span>
            </h1>

            <p className="hero-copy mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              A scroll-driven cinematic built entirely in GSAP — video, boss reveal,
              and storytelling woven into one unforgettable page.
            </p>

            <a
              href="#encounter"
              className="hero-button mt-10 inline-flex rounded-full border border-red-500/40 px-8 py-4 font-medium text-red-500 transition hover:bg-red-500 hover:text-black"
            >
              Begin Encounter ↓
            </a>
          </div>
        </div>

        {/* ── PARTY CONTENT — flows below the sticky hero, scrolls into view ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-0 md:px-12">
          <div className="party-inner">
            <p className="party-kicker mb-6 text-sm uppercase tracking-[0.35em] text-red-500">
              The Party
            </p>

            <h2 className="font-heading text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              <span className="block overflow-hidden">
                <span className="inline-block">Three heroes.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block">One final threat.</span>
              </span>
            </h2>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {/* Warrior — with Spline embed */}
              <div className="party-card flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-red-500">01</p>
                <h3 className="mt-6 font-heading text-3xl font-black">Warrior</h3>
                <p className="mt-4 text-sm text-white/45">
                  A character callout designed to show cinematic UI storytelling.
                </p>
                <div className="party-spline mt-6 h-[260px] w-full overflow-hidden rounded-2xl">
                  <SplineScene scene="https://prod.spline.design/gl2aW2s7tJXSMxrM/scene.splinecode" />
                </div>
              </div>

              {/* Archer — Spline scene */}
              <div className="party-card flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-red-500">02</p>
                <h3 className="mt-6 font-heading text-3xl font-black">Archer</h3>
                <p className="mt-4 text-sm text-white/45">
                  A character callout designed to show cinematic UI storytelling.
                </p>
                <div className="party-spline mt-6 h-[260px] w-full overflow-hidden rounded-2xl">
                  <SplineScene scene="https://prod.spline.design/cn-LdSIlskSxzbOW/scene.splinecode" />
                </div>
              </div>

              {/* Paladin — Spline scene */}
              <div className="party-card flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-red-500">03</p>
                <h3 className="mt-6 font-heading text-3xl font-black">Paladin</h3>
                <p className="mt-4 text-sm text-white/45">
                  A character callout designed to show cinematic UI storytelling.
                </p>
                <div className="party-spline mt-6 h-[260px] w-full overflow-hidden rounded-2xl">
                  <SplineScene scene="https://prod.spline.design/FOuudBDWTQdUYxCW/scene.splinecode" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENCOUNTER ── */}
      <div id="encounter">
        <DangerBanner />
        <DndScene />
      </div>

      {/* ── BEHIND THE SCENE ── */}
      <section
        ref={behindRef}
        className="relative bg-[#050505] px-6 md:px-12"
      >
        <div className="absolute left-[-5%] top-[-10%] h-[600px] w-[600px] rounded-full bg-red-600/20 blur-[150px]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 py-28 lg:flex-row">
          <div className="lg:w-[420px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28">
            <p className="behind-kicker mb-6 text-sm uppercase tracking-[0.35em] text-red-500">
              Behind The Scene
            </p>

            <h2 className="font-heading text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              <span className="behind-title block overflow-hidden">
                <span className="inline-block">How it was</span>
              </span>
              <span className="behind-title block overflow-hidden">
                <span className="inline-block">Built.</span>
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/45">
              Every animation on this page is handcrafted — no libraries beyond GSAP and Spline.
              Here's what's running under the hood.
            </p>
            </div>{/* end sticky */}
          </div>{/* end left col */}

          <div className="flex-1 space-y-3">
            {[
              {
                label: "Scroll-driven hero transform",
                desc: "Title shrinks and floats to the top as you scroll — driven by a scrubbed GSAP timeline.",
                tag: "GSAP + ScrollTrigger",
              },
              {
                label: "Sticky section merge",
                desc: "Hero and party live in one 200vh container. The hero is sticky while the party scrolls beneath it.",
                tag: "CSS Sticky + GSAP",
              },
              {
                label: "Heartbeat glow",
                desc: "The red ambient glow pulses continuously and grows to scale 6 as you reach the bottom of the section.",
                tag: "GSAP Scrub",
              },
              {
                label: "Particle spark system",
                desc: "55 red and orange sparks rise from the bottom, generated dynamically and looped independently.",
                tag: "GSAP Ticker",
              },
              {
                label: "Interactive 3D characters",
                desc: "Each hero card embeds a live Spline scene. Hovering locks page scroll so you can interact freely.",
                tag: "Spline + Scroll Lock",
              },
              {
                label: "Pinned video encounter",
                desc: "The DnD scene pins the section, loops a video in the background, and reveals character cards one by one on scroll.",
                tag: "ScrollTrigger Pin",
              },
              {
                label: "Boss reveal",
                desc: "All three character cards fade out simultaneously to clear the stage for the Ancient Dragon's entrance.",
                tag: "GSAP Timeline",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="behind-item rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-sm text-white/45">{item.desc}</p>
                  </div>
                  <span className="mt-0.5 flex-shrink-0 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[10px] uppercase tracking-wider text-red-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}

            <Link
              href="/contact"
              className="behind-cta mt-6 inline-flex rounded-full bg-red-500 px-8 py-4 font-medium text-black hover:bg-red-400"
            >
              Build Something Like This
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
