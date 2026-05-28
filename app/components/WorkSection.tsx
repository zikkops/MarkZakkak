"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "Website Concept 01",
    type: "Frontend / GSAP",
    image: "/images/project-1.jpg",
    isVideo: false,
  },
  {
    title: "Website Concept 02",
    type: "WordPress / UI",
    image: "/images/project-2.jpg",
    isVideo: false,
  },
  {
    title: "Website Concept 03",
    type: "React / Motion",
    image: "/images/project-3.jpg",
    isVideo: false,
  },
  {
    title: "Website Concept 04",
    type: "Creative Landing Page",
    image: "/videos/project-4.webm",
    isVideo: true,
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

useGSAP(
  () => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll(".project-card")
    );

    const amountToScroll = track.scrollWidth - window.innerWidth;

    gsap.set(cards, {
      y: (index) => (index % 2 === 0 ? -180 : 180),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${amountToScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(track, { x: -amountToScroll, ease: "none" }, 0);

    tl.to(
      cards,
      {
        y: (index) => (index % 2 === 0 ? -50 : 50),
        ease: "none",
      },
      0
    );
        tl.to(
    section,
    {
        backgroundColor: "#07111f",
        ease: "none",
    },
    0
    );

     const videos = gsap.utils.toArray<HTMLVideoElement>(
    section.querySelectorAll(".project-video")
    );

    videos.forEach((video) => {
    ScrollTrigger.create({
        trigger: video,
        containerAnimation: tl,
        start: "left 80%",
        end: "right 20%",
        onEnter: () => video.play(),
        onEnterBack: () => video.play(),
        onLeave: () => {
        video.pause();
        video.currentTime = 0;
        },
        onLeaveBack: () => {
        video.pause();
        video.currentTime = 0;
        },
    });
    });

    return () => {
      tl.kill();
    };
  },
  { scope: sectionRef }
);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute left-[-10%] top-[-20%] z-0 h-[500px] w-[500px] rounded-full bg-[#4DA3FF]/10 blur-[140px]" />
      <div className="relative z-10 flex h-screen items-center">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8 px-6 md:px-12"
        >
          <div className="w-[80vw] max-w-[900px] shrink-0">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
              Selected Work
            </p>

            <h2 className="font-heading text-5xl font-black leading-[0.9] md:text-7xl">
              Websites
              <br />
              in Motion.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              A collection of websites, landing pages, and interactive
              experiences built with clean UI, strong visuals, and motion.
            </p>
          </div>

          {projects.map((project, index) => (
            <article
              key={index}
              className="project-card group relative h-[520px] w-[75vw] max-w-[760px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="absolute inset-0 overflow-hidden">
                    {project.isVideo ? (
                        <video
                        className="project-video h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        muted
                        loop
                        playsInline
                        >
                        <source src={project.image} type="video/webm" />
                        </video>
                    ) : (
                        <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        />
                    )}
                    </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#4DA3FF]">
                  {project.type}
                </p>

                <h3 className="font-heading text-4xl font-black">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}