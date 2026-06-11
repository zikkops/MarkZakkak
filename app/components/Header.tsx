"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Experience", href: "/experiences/dragon-encounter" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll shrink effect
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu open/close animation
  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      gsap.set(menu, { display: "flex" });
      gsap.set(overlay, { display: "block" });

      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.15,
        }
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });

      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [isOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[998] hidden bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-x-0 top-0 z-[999] flex flex-col border-b border-white/10 bg-[#080808]/95 px-6 pb-8 pt-24 backdrop-blur-2xl md:hidden"
      >
        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between border-b border-white/[0.06] py-4 text-2xl font-black uppercase tracking-tight text-white/80 transition-colors hover:text-[#4DA3FF]"
            >
              <span>{link.label}</span>
              
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          ref={(el) => {
            if (el) menuItemsRef.current[links.length] = el;
          }}
          className="mt-8 rounded-full border border-[#4DA3FF]/40 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] text-[#4DA3FF] hover:bg-[#4DA3FF] hover:text-black"
        >
          Let's Talk
        </Link>
      </div>

      {/* Header bar */}
      <header
        ref={headerRef}
        className="fixed left-1/2 top-0 z-[999] w-full -translate-x-1/2 border border-white/10 bg-white/[0.04] px-6 py-4 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-black">
            MZ<span className="text-[#4DA3FF]">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 md:flex md:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-[#4DA3FF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden rounded-full border border-[#4DA3FF]/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#4DA3FF] transition-colors hover:bg-[#4DA3FF] hover:text-black md:block"
          >
            Let's Talk
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[1.5px] w-6 origin-center bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 origin-center bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
