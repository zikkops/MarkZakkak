import AnimationLab from "@/app/components/AnimationLab";
import LottieScrollShowcase from "@/app/components/LottieScrollShowcase";
import SplineShowcase from "@/app/components/SplineShowcase";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header"

export default function LabPage() {
  return (
    <main className="bg-[#050505] text-white">
        <Header/>
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#4DA3FF]/20 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#4DA3FF]">
            Animation Lab
          </p>

          <h1 className="font-heading text-6xl font-black leading-[0.9] md:text-8xl">
            Where Ideas<br/> Get Weird.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            ScrollTrigger scenes, cursor effects, Lottie experiments, Spline embeds — the lab is where concepts become interactions.
          </p>
        </div>
      </section>

      <AnimationLab />
      <LottieScrollShowcase />
      <SplineShowcase />

      <Footer />
    </main>
  );
}