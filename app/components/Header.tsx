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
        maxWidth: isScrolled ? "1100px" : "100%",
        top: isScrolled ? 20 : 0,
        borderRadius: isScrolled ? 999 : 0,
        backgroundColor: isScrolled
          ? "rgba(5,5,5,0.55)"
          : "rgba(5,5,5,0.95)",
        borderColor: isScrolled
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0)",
        backdropFilter: isScrolled
          ? "blur(20px)"
          : "blur(0px)",
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
        border-transparent
        bg-[#050505]/95
        px-6
        py-4
        text-white
        md:px-12
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#hero")}
          className="font-heading text-xl font-black"
        >
          MZ<span className="text-[#4DA3FF]">.</span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-4 md:gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-white/60
                transition-colors
                duration-300
                hover:text-[#4DA3FF]
              "
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => scrollToSection("#contact")}
          className="
            hidden
            rounded-full
            border
            border-[#4DA3FF]/40
            px-5
            py-2
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#4DA3FF]
            transition-all
            duration-300
            hover:bg-[#4DA3FF]
            hover:text-black
            md:block
          "
        >
          Let's Talk
        </button>
      </div>
    </header>
  );
}