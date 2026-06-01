import Hero from "@/app/components/hero";
import WorkSection from "@/app/components/WorkSection";
import AnimationLab from "@/app/components/AnimationLab";
import MarqueeBanner from "@/app/components/MarqueeBanner";
import DndScene from "@/app/components/DndScene";
import DangerBanner from "@/app/components/DangerBanner";
import Text3DCarousel from "@/app/components/Text3DCarousel";
import CanAnimation from "@/app/components/CanAnimation"

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkSection />
      <MarqueeBanner />
      <AnimationLab />
      <DangerBanner />
      <DndScene />
      <Text3DCarousel />
      <CanAnimation/>
      
    </main>
  );
}