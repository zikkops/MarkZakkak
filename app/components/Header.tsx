"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const links = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (target: string) => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: {
        y: target,
        offsetY: 90,
      },
      ease: "expo.inOut",
    });
  };

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;

      gsap.to(header, {
        width: isScrolled ? "92%" : "100%",
        maxWidth: isScrolled ? "1024px" : "100%",
        top: isScrolled ? 20 : 0,
        borderRadius: isScrolled ? 999 : 0,
        paddingTop: isScrolled ? "12px" : "16px",
        paddingBottom: isScrolled ? "12px" : "16px",
        duration: 0.5,
        ease: "power3.out",
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="
        fixed
        left-1/2
        top-0
        z-[999]
        w-full
        -translate-x-1/2
        border
        border-white/10
        bg-white/[0.04]
        px-6
        py-4
        text-white
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
        md:px-12
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <button
          onClick={() => scrollToSection("#hero")}
          className="font-heading text-xl font-black"
        >
          MZ<span className="text-[#4DA3FF]">.</span>
        </button>

        <nav className="flex items-center gap-4 md:gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-xs uppercase tracking-[0.25em] text-white/60 hover:text-[#4DA3FF]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection("#contact")}
          className="hidden rounded-full border border-[#4DA3FF]/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#4DA3FF] hover:bg-[#4DA3FF] hover:text-black md:block"
        >
          Let's Talk
        </button>
      </div>
    </header>
  );
}