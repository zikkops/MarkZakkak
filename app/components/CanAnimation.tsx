"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const slides = [
  {
    title: "Motion Portfolio",
    desc: "A cinematic developer portfolio built with Next.js and GSAP.",
    tags: ["Next.js", "GSAP", "UI"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    bg: "#07111f",
    glow: "#4DA3FF",
  },
  {
    title: "Creative Studio",
    desc: "A bold landing page concept for a digital creative agency.",
    tags: ["Branding", "Motion", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop",
    bg: "#1c0f03",
    glow: "#F97316",
  },
  {
    title: "E-Commerce Flow",
    desc: "A polished shopping experience with smooth interactions.",
    tags: ["Shop", "UX", "React"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    bg: "#052e16",
    glow: "#22C55E",
  },
  {
    title: "D&D Encounter",
    desc: "A scroll-driven cinematic scene with video and character UI.",
    tags: ["GSAP", "Video", "Scroll"],
    image:
      "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?q=80&w=800&auto=format&fit=crop",
    bg: "#450a0a",
    glow: "#EF4444",
  },
  {
    title: "Airport Experience",
    desc: "A premium landing page with refined interface motion.",
    tags: ["Landing", "GSAP", "Design"],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    bg: "#2e1065",
    glow: "#A855F7",
  },
  {
    title: "Interactive Lab",
    desc: "Experimental frontend interactions and scroll-based animations.",
    tags: ["Lab", "Motion", "Creative"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    bg: "#083344",
    glow: "#00E5FF",
  },
];

export default function RecordCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const recordRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const imgCurrentRef = useRef<HTMLDivElement | null>(null);
  const imgNextRef = useRef<HTMLDivElement | null>(null);

  const idxRef = useRef(0);
  const busyRef = useRef(false);
  const rotRef = useRef(0);
  const idleSpinRef = useRef<(() => void) | null>(null);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const record = recordRef.current;
    const imgCurrent = imgCurrentRef.current;
    const imgNext = imgNextRef.current;

    if (!section || !glow || !record || !imgCurrent || !imgNext) return;

    gsap.set(section, { background: slides[0].bg });
    gsap.set(glow, { backgroundColor: slides[0].glow });
    gsap.set(record, { rotation: rotRef.current });

    gsap.set(imgCurrent, {
      backgroundImage: `url(${slides[0].image})`,
      x: 0,
      opacity: 1,
    });

    gsap.set(imgNext, {
      backgroundImage: `url(${slides[1].image})`,
      x: 110,
      opacity: 0,
    });

    const idleSpin = () => {
      rotRef.current += 0.25;
      gsap.set(record, { rotation: rotRef.current });
    };

    idleSpinRef.current = idleSpin;
    gsap.ticker.add(idleSpin);

    return () => {
      gsap.ticker.remove(idleSpin);
    };
  }, []);

  const stopIdle = () => {
    if (idleSpinRef.current) {
      gsap.ticker.remove(idleSpinRef.current);
    }
  };

  const startIdle = () => {
    if (idleSpinRef.current) {
      gsap.ticker.remove(idleSpinRef.current);
      gsap.ticker.add(idleSpinRef.current);
    }
  };

  const goTo = (to: number, dir: 1 | -1) => {
    if (busyRef.current || to === idxRef.current) return;

    const section = sectionRef.current;
    const glow = glowRef.current;
    const record = recordRef.current;
    const info = infoRef.current;
    const imgCurrent = imgCurrentRef.current;
    const imgNext = imgNextRef.current;

    if (!section || !glow || !record || !info || !imgCurrent || !imgNext) {
      return;
    }

    busyRef.current = true;
    stopIdle();

    const nextSlide = slides[to];

    gsap.set(imgNext, {
      backgroundImage: `url(${nextSlide.image})`,
      x: dir === 1 ? 110 : -110,
      opacity: 1,
    });

    const fastSpin = gsap.to(
      {},
      {
        duration: 0.7,
        ease: "power3.inOut",
        onUpdate: () => {
          rotRef.current += 6;
          gsap.set(record, { rotation: rotRef.current });
        },
      }
    );

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(imgCurrent, {
          backgroundImage: `url(${nextSlide.image})`,
          x: 0,
          opacity: 1,
        });

        gsap.set(imgNext, {
          x: dir === 1 ? 110 : -110,
          opacity: 0,
        });

        idxRef.current = to;
        setIdx(to);
        busyRef.current = false;
        fastSpin.kill();
        startIdle();
      },
    });

    tl.to(info, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.inOut",
    })
      .to(
        section,
        {
          background: nextSlide.bg,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        glow,
        {
          backgroundColor: nextSlide.glow,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        imgCurrent,
        {
          x: dir === 1 ? -110 : 110,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        imgNext,
        {
          x: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0
      )
      .add(() => {
        setIdx(to);
      })
      .fromTo(
        info,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );
  };

  const next = () => {
    const to = (idxRef.current + 1) % slides.length;
    goTo(to, 1);
  };

  const prev = () => {
    const to = (idxRef.current - 1 + slides.length) % slides.length;
    goTo(to, -1);
  };

  const slide = slides[idx];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[500px] overflow-hidden px-6 py-16 text-white md:px-12"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15] blur-[80px]"
      />

      <div className="relative z-10 grid min-h-[500px] items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
        <div ref={infoRef} className="max-w-md">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/50">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </p>

          <h2 className="font-heading text-4xl font-black md:text-6xl">
            {slide.title}
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
            {slide.desc}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {slide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={recordRef}
          className="relative mx-auto h-[220px] w-[220px] rounded-full bg-[#111] shadow-[0_0_80px_rgba(0,0,0,0.75)] sm:h-[260px] sm:w-[260px]"
          style={{
            background:
              "radial-gradient(circle at center, #171717 0 22%, transparent 23%), radial-gradient(circle at center, transparent 0 35%, rgba(255,255,255,.05) 36%, transparent 37%), radial-gradient(circle at center, transparent 0 52%, rgba(255,255,255,.04) 53%, transparent 54%), radial-gradient(circle at center, transparent 0 70%, rgba(255,255,255,.035) 71%, transparent 72%), #111",
          }}
        >
          <div className="absolute left-1/2 top-1/2 h-[108px] w-[108px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            <div
              ref={imgCurrentRef}
              className="absolute inset-0 rounded-full bg-cover bg-center"
            />

            <div
              ref={imgNextRef}
              className="absolute inset-0 rounded-full bg-cover bg-center"
            />
          </div>

          <div className="absolute left-1/2 top-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
        </div>

        <div className="flex items-center justify-start gap-4 md:justify-end">
          <button
            onClick={prev}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
          >
            ←
          </button>

          <button
            onClick={next}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
          >
            →
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => {
              const dir = dotIndex > idxRef.current ? 1 : -1;
              goTo(dotIndex, dir);
            }}
            className={`h-2 w-2 rounded-full ${
              dotIndex === idx ? "scale-125 bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}