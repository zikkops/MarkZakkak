import Hero from "@/app/components/hero";
import WorkSection from "@/app/components/WorkSection";
import AnimationLab from "@/app/components/AnimationLab";
import MarqueeBanner from "@/app/components/MarqueeBanner";
import DndScene from "@/app/components/DndScene";
import DangerBanner from "@/app/components/DangerBanner";
import Text3DCarousel from "@/app/components/Text3DCarousel";
import BillboardSection from "@/app/components/BillboardSection"
import ContactSection from "@/app/components/ContractSection";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <main>
      <Header/>
      <Hero />
      <WorkSection />
      <MarqueeBanner />
      <AnimationLab />
      <DangerBanner />
      <DndScene />
      <Text3DCarousel />
      <BillboardSection/>
      <div className="relative bg-[#050505]">
        <div className="last-section-wrapper relative z-10">
          <ContactSection />
        </div>

        <Footer />
      </div>
      
    </main>
  );
}