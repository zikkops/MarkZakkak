import Link from "next/link";

export default function HomeLabTeaser() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-12">
      <div className="absolute inset-0 bg-[#07111f]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Animation Lab
          </p>

          <h2 className="font-heading text-5xl font-black leading-[0.9] md:text-7xl">
            Experiments
            <br />
            built with GSAP.
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-lg leading-relaxed text-white/60">
            ScrollTrigger scenes, cursor effects, Lottie experiments, Spline
            embeds, and interaction ideas live in the lab.
          </p>

          <Link
            href="/lab"
            className="mt-8 inline-flex w-fit rounded-full border border-white/20 px-8 py-4 font-medium text-white hover:border-[#4DA3FF] hover:text-[#4DA3FF]"
          >
            Enter Lab
          </Link>
        </div>
      </div>
    </section>
  );
}