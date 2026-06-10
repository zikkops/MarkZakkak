import DangerBanner from "@/app/components/DangerBanner";
import DndScene from "@/app/components/DndScene";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Header from "@/app/components/Header"

export default function DragonEncounterPage() {
  return (
    <main className="bg-black text-white">
        <Header/>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-red-500">
            Interactive Experience
          </p>

          <h1 className="font-heading text-6xl font-black uppercase leading-[0.85] text-red-500 md:text-8xl lg:text-[9rem]">
            The Dragon
            <br />
            Awakens
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            A scroll-driven cinematic built entirely in GSAP — video, boss reveal, and storytelling woven into one unforgettable page.
          </p>

          <a
            href="#encounter"
            className="mt-10 inline-flex rounded-full border border-red-500/40 px-8 py-4 font-medium text-red-500 hover:bg-red-500 hover:text-black"
          >
            Begin Encounter ↓
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-6 py-28 md:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-red-500">
            The Party
          </p>

          <h2 className="font-heading text-5xl font-black uppercase leading-[0.9] md:text-7xl">
            three heroes.
            <br />
            One final threat.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {["Warrior", "Archer", "Paladin"].map((hero, index) => (
              <div
                key={hero}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                  0{index + 1}
                </p>

                <h3 className="mt-16 font-heading text-3xl font-black">
                  {hero}
                </h3>

                <p className="mt-4 text-sm text-white/45">
                  A character callout designed to show cinematic UI storytelling.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="encounter">
        <DangerBanner />
        <DndScene />
      </div>

      <section className="relative overflow-hidden bg-[#050505] px-6 py-28 md:px-12">
        <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-red-600/20 blur-[150px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-red-500">
              Behind The Scene
            </p>

            <h2 className="font-heading text-5xl font-black uppercase leading-[0.9] md:text-7xl">
              Built like a
              <br />
              boss fight.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Pinned ScrollTrigger timeline",
              "Fullscreen video background",
              "Velocity-based video playback",
              "Floating character callouts",
              "Boss reveal motion",
              "Dark cinematic UI styling",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white/70"
              >
                {item}
              </div>
            ))}

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-red-500 px-8 py-4 font-medium text-black hover:bg-red-400"
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