import Hero from "@/app/components/home/Hero";
import Footer from "@/app/components/Footer";
import Header from"@/app/components/Header";
import HomeWorkTeaser from "@/app/components/home/HomeWorkTeaser";
import HomeLabTeaser from "@/app/components/home/HomeLabTeaser";
import HomeDragonTeaser from "@/app/components/home/HomeDragonTeaser";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white">
      <Header/>
      <Hero />
      <HomeWorkTeaser />
      <HomeLabTeaser />
      <HomeDragonTeaser />
      <Footer />
    </main>
  );
}