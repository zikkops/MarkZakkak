import Hero from "@/app/components/hero";
import WorkSection from "@/app/components/WorkSection";
import AnimationLab from "@/app/components/AnimationLab";
import MarqueeBanner from "@/app/components/MarqueeBanner";
import DndScene from "@/app/components/DndScene";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkSection />
      <MarqueeBanner />
      <AnimationLab />
      <DndScene />
    </main>
  );
}