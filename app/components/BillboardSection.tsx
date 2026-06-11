"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    num: "01",
    title: "Neon Interface",
    text: "Immersive digital experiences with glowing motion and futuristic UI.",
    billboardTitle: "Digital Campaign",
    color: "#00E5FF",
    bg: "#06111f",
    x: 120,
    y: -90,
    rotateY: -22,
    rotateX: 10,
    rotateZ: 3,
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Cyber Campaign",
    text: "Bold landing pages designed for brands that want to feel alive.",
    billboardTitle: "Neon Brand System",
    color: "#FF2BD6",
    bg: "#18051f",
    x: -120,
    y: 90,
    rotateY: 18,
    rotateX: -8,
    rotateZ: -4,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Digital City",
    text: "Scroll-driven storytelling with atmospheric transitions and depth.",
    billboardTitle: "City Light Motion",
    color: "#8B5CF6",
    bg: "#0f0824",
    x: 100,
    y: 110,
    rotateY: -26,
    rotateX: -10,
    rotateZ: 5,
    image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Future Motion",
    text: "GSAP-powered motion systems for premium interactive websites.",
    billboardTitle: "Future Web Motion",
    color: "#4DA3FF",
    bg: "#050b18",
    x: -100,
    y: -100,
    rotateY: 22,
    rotateX: 8,
    rotateZ: -5,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function BillboardSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileImageRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const billboardTitleRef = useRef<HTMLParagraphElement | null>(null);
  const mobileBillboardTitleRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;
      const imageWrap = imageWrapRef.current;
      const mobileImage = mobileImageRef.current;
      const glow = glowRef.current;
      const billboardTitle = billboardTitleRef.current;
      const mobileBillboardTitle = mobileBillboardTitleRef.current;

      if (!section || !text || !imageWrap || !glow || !billboardTitle) return;

      gsap.set(section, { backgroundColor: slides[0].bg });
      gsap.set(glow, { backgroundColor: slides[0].color });

      gsap.set(imageWrap, {
        transformPerspective: 1200,
        rotateY: slides[0].rotateY,
        rotateX: slides[0].rotateX,
        x: slides[0].x,
        y: slides[0].y,
      });

      const changeSlide = (index: number) => {
        const slide = slides[index];

        gsap
          .timeline()
          .to(text, {
            opacity: 0,
            y: -30,
            duration: 0.25,
            ease: "power2.in",
          })
          .to(
            imageWrap,
            {
              opacity: 0.75,
              scale: 0.96,
              duration: 0.25,
              ease: "power2.in",
            },
            "<"
          )
          .to(
            mobileImage ?? {},
            {
              opacity: 0.75,
              scale: 0.96,
              duration: 0.25,
              ease: "power2.in",
            },
            "<"
          )
          .to(
            billboardTitle,
            {
              opacity: 0,
              y: 12,
              duration: 0.2,
              ease: "power2.in",
            },
            "<"
          )
          .to(
            mobileBillboardTitle ?? {},
            {
              opacity: 0,
              y: 12,
              duration: 0.2,
              ease: "power2.in",
            },
            "<"
          )
          .to(
            section,
            {
              backgroundColor: slide.bg,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "<"
          )
          .to(
            glow,
            {
              backgroundColor: slide.color,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "<"
          )
          .to(
            imageWrap,
            {
              x: slide.x,
              y: slide.y,
              rotateY: slide.rotateY,
              rotateX: slide.rotateX,
              duration: 0.7,
              ease: "power3.inOut",
            },
            "<"
          )
          .add(() => {
            text.innerHTML = `
              <p class="mb-5 text-sm uppercase tracking-[0.4em]" style="color:${slide.color}">
                ${slide.num} / Cyberpunk Showcase
              </p>
              <h2 class="font-heading text-5xl font-black leading-[0.95] md:text-7xl">
                ${slide.title}
              </h2>
              <p class="mt-6 max-w-md text-lg leading-relaxed text-white/65">
                ${slide.text}
              </p>
            `;

            // Update desktop image
            const img = imageWrap.querySelector("img");
            if (img) img.src = slide.image;

            // Update mobile image
            if (mobileImage) {
              const mobileImg = mobileImage.querySelector("img");
              if (mobileImg) mobileImg.src = slide.image;
            }

            billboardTitle.textContent = slide.billboardTitle;
            billboardTitle.style.color = slide.color;

            if (mobileBillboardTitle) {
              mobileBillboardTitle.textContent = slide.billboardTitle;
              mobileBillboardTitle.style.color = slide.color;
            }
          })
          .fromTo(
            text,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            }
          )
          .to(
            imageWrap,
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            "<"
          )
          .to(
            mobileImage ?? {},
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            "<"
          )
          .fromTo(
            billboardTitle,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power3.out",
            },
            "<"
          )
          .fromTo(
            mobileBillboardTitle ?? {},
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power3.out",
            },
            "<"
          );
      };

      let current = 0;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${slides.length * 900}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            slides.length - 1,
            Math.floor(self.progress * slides.length)
          );

          if (nextIndex !== current) {
            current = nextIndex;
            changeSlide(current);
          }
        },
      });

      gsap.to(".billboard-flicker", {
        opacity: 0.45,
        duration: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-6 text-white md:px-12"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div
        ref={glowRef}
        className="absolute right-[18%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-30 blur-[150px]"
      />

      <div className="relative z-10 grid min-h-screen items-center gap-6 lg:gap-14 lg:grid-cols-2">
        {/* Text */}
        <div ref={textRef} style={{ zIndex: 100 }}>
          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-[#00E5FF]">
            01 / Cyberpunk Showcase
          </p>

          <h2 className="font-heading text-5xl font-black leading-[0.95] md:text-7xl">
            Neon Interface
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">
            A cyberpunk-inspired interface — layered glow, kinetic type, and a
            UI built for atmosphere.
          </p>
        </div>

        {/* Mobile image — flat, no 3D transforms */}
        <div
          ref={mobileImageRef}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black lg:hidden"
        >
          <img
            src={slides[0].image}
            alt="Cyberpunk billboard"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-cyan-400/20" />
          <div className="billboard-flicker absolute inset-0 bg-white/10 mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 backdrop-blur-md">
            <p
              ref={mobileBillboardTitleRef}
              className="font-heading text-base font-black uppercase tracking-[0.25em] text-[#00E5FF]"
            >
              Digital Campaign
            </p>
          </div>
        </div>

        {/* Desktop image — 3D transforms via GSAP */}
        <div
          ref={imageWrapRef}
          className="relative mx-auto hidden aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_140px_rgba(0,229,255,0.2)] lg:block"
        >
          <img
            src={slides[0].image}
            alt="Cyberpunk billboard"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-cyan-400/20" />
          <div className="billboard-flicker absolute inset-0 bg-white/10 mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-5 backdrop-blur-md">
            <p
              ref={billboardTitleRef}
              className="font-heading text-xl font-black uppercase tracking-[0.25em] text-[#00E5FF]"
            >
              Digital Campaign
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
