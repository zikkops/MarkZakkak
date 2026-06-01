"use client";

export default function Footer() {
  return (
    <footer className="relative z-0 min-h-[450px] overflow-hidden bg-[#050505] text-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#4DA3FF]/15 blur-[140px]" />

      {/* Top Line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#4DA3FF] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[450px] max-w-7xl flex-col justify-between px-6 py-16 md:px-12">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="font-heading text-5xl font-black">
              MZ<span className="text-[#4DA3FF]">.</span>
            </h2>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Front-end developer crafting interactive experiences with
              Next.js, GSAP and creative motion design.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
              Navigation
            </p>

            <ul className="space-y-3 text-sm uppercase tracking-[0.25em] text-white/55">
              <li>
                <a href="#hero" className="hover:text-[#4DA3FF]">
                  Home
                </a>
              </li>

              <li>
                <a href="#work" className="hover:text-[#4DA3FF]">
                  Work
                </a>
              </li>

              <li>
                <a href="#lab" className="hover:text-[#4DA3FF]">
                  Lab
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-[#4DA3FF]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
              Contact
            </p>

            <a
              href="mailto:markzakkak@gmail.com"
              className="block text-white/55 hover:text-[#4DA3FF]"
            >
              markzakkak@gmail.com
            </a>

            <p className="mt-4 text-white/35">
              Lebanon
              <br />
              Available Worldwide
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#4DA3FF]">
              Social
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#4DA3FF] hover:text-[#4DA3FF] hover:shadow-[0_0_25px_rgba(77,163,255,0.35)]"
              >
                in
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#4DA3FF] hover:text-[#4DA3FF] hover:shadow-[0_0_25px_rgba(77,163,255,0.35)]"
              >
                gh
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#4DA3FF] hover:text-[#4DA3FF] hover:shadow-[0_0_25px_rgba(77,163,255,0.35)]"
              >
                x
              </a>
            </div>
          </div>
        </div>

        {/* Huge Background Text */}
        <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-[18vw] font-black leading-none text-white/[0.03]">
          CONTACT
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 flex flex-col justify-between border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row">
          <p>© 2026 Mark Zakkak. All rights reserved.</p>

          <p>Built with Next.js + GSAP</p>
        </div>
      </div>
    </footer>
  );
}