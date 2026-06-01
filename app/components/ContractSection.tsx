"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLFormElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const glow = glowRef.current;
      const card = cardRef.current;

      if (!section || !glow || !card) return;
            gsap.to(section, {
        scale: 0.94,
        borderRadius: "42px",
        width: "92%",
        marginLeft: "4%",
        marginRight: "4%",
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "+=500",
            scrub: 1,
        },
        });

      const moveGlowX = gsap.quickTo(glow, "x", {
        duration: 0.5,
        ease: "power3.out",
      });

      const moveGlowY = gsap.quickTo(glow, "y", {
        duration: 0.5,
        ease: "power3.out",
      });

      const rotateX = gsap.quickTo(card, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });

      const rotateY = gsap.quickTo(card, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        moveGlowX(x - 250);
        moveGlowY(y - 250);

        rotateY((x - rect.width / 2) * 0.01);
        rotateX(-(y - rect.height / 2) * 0.01);
      };

      const handleMouseLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      gsap.from(".contact-letter", {
        y: 120,
        opacity: 0,
        duration: 0.8,
        stagger: 0.025,
        ease: "power4.out",
      });

      gsap.from(".contact-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".contact-field", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out",
      });


      const letters = gsap.utils.toArray<HTMLElement>(".contact-letter");

      letters.forEach((letter, hoveredIndex) => {
        letter.addEventListener("mouseenter", () => {
          letters.forEach((target, index) => {
            const distance = Math.abs(index - hoveredIndex);

            let weight = 300;
            let scale = 1;
            let opacity = 0.35;
            let y = 0;

            if (distance === 0) {
              weight = 900;
              scale = 1.3;
              opacity = 1;
              y = -6;
            } else if (distance === 1) {
              weight = 750;
              scale = 1.16;
              opacity = 0.85;
              y = -3;
            } else if (distance === 2) {
              weight = 550;
              scale = 1.08;
              opacity = 0.65;
            } else if (distance === 3) {
              weight = 400;
              scale = 1.03;
              opacity = 0.5;
            }

            gsap.to(target, {
              fontWeight: weight,
              scale,
              opacity,
              y,
              duration: 0.25,
              ease: "power2.out",
            });
          });
        });
      });

      const title = section.querySelector(".contact-title");

      const resetLetters = () => {
        gsap.to(".contact-letter", {
          fontWeight: 900,
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.01,
        });
      };

      title?.addEventListener("mouseleave", resetLetters);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
        title?.removeEventListener("mouseleave", resetLetters);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-24 text-white md:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#4DA3FF]/25 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1fr_520px]">
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[#4DA3FF]">
            Contact
          </p>

          <h2 className="contact-title font-heading text-6xl font-black leading-[0.9] md:text-8xl">
  {["Let's Build", "Something."].map((line, lineIndex) => (
    <span key={lineIndex} className="block">
      {line.split("").map((char, charIndex) => (
        <span
          key={`${lineIndex}-${charIndex}`}
          className="contact-letter inline-block cursor-default"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  ))}
</h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Got a website, animation idea, or interactive experience in mind?
            Send me a message and let’s turn it into something memorable.
          </p>
        </div>

        <form
          ref={cardRef}
          className="contact-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          

          <div className="contact-field mb-5">
            <label className="mb-2 block text-sm text-white/50">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-[#4DA3FF]"
            />
          </div>

          <div className="contact-field mb-5">
            <label className="mb-2 block text-sm text-white/50">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-[#4DA3FF]"
            />
          </div>

          <div className="contact-field mb-5">
            <label className="mb-2 block text-sm text-white/50">
              Project Type
            </label>
            <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-[#4DA3FF]">
              <option>Portfolio / Personal Site</option>
              <option>Landing Page</option>
              <option>WordPress Website</option>
              <option>GSAP Animation</option>
              <option>React / Next.js Website</option>
            </select>
          </div>

          <div className="contact-field mb-6">
            <label className="mb-2 block text-sm text-white/50">Message</label>
            <textarea
              placeholder="Tell me about your idea..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-[#4DA3FF]"
            />
          </div>

          <button
            type="submit"
            className="contact-field group relative w-full overflow-hidden rounded-full bg-[#4DA3FF] px-8 py-4 font-semibold text-black"
          >
            <span className="relative z-10">Send Message</span>
            <span className="absolute inset-0 translate-y-full bg-[#00E5FF] transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </form>
      </div>
    </section>
  );
}