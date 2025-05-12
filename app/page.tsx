"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import SearchBar from "@/components/SearchBar";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      // This will animate direct children of main and also elements with .animate-in inside components
      // if those components are structured to have their root or key elements receive this class.
      // The current components are structured so their top-level elements or key content parts have .animate-in.
      gsap.from(pageRef.current.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    // The background color will be applied from body styles (globals.css)
    <div ref={pageRef} className="min-h-screen flex flex-col items-center">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <HeroContent />
        <SocialProof />
        <SearchBar />
      </main>

      <Footer />
    </div>
  );
}
