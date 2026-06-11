import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import PageTransition from "@/app/components/PageTransition";

export const metadata = {
  title: "Mark Zakkak",
  description: "Frontend Developer • GSAP • Motion Design",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        <PageTransition>
          <Header />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}