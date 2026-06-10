import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header"

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-white">
        <Header/>
      

      <ContactSection />

      <Footer />
    </main>
  );
}