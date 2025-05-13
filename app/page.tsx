"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/layout/Navbar";
import HeroContent from "@/components/sections/hero-content";
import SearchBar from "@/components/sections/search-bar";
import ScrollRevealHeading from "@/components/sections/scroll-reveal-heading"; 
import SocialProof from "@/components/sections/social-proof";
import Footer from "@/components/layout/Footer";
// import ToolsSection from "@/components/sections/tools-section";
import PaymentSection from "@/components/sections/payment-section";
import CalmWorkSection from "@/components/sections/calm-work-section";
import ModernLandingDemo from "@/components/sections/modern-landing-demo"; 
import NoSSR from "@/lib/utils/no-ssr";
import dynamic from "next/dynamic";


const TestimonialSlider = dynamic(
  () => import("@/components/sections/testimonial-slider"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-60 bg-promptly-background flex items-center justify-center">
        <div className="text-promptly-foreground text-lg">Loading testimonials...</div>
      </div>
    ) 
  }
);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
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
    <div ref={pageRef} className="min-h-screen flex flex-col items-center bg-promptly-background text-promptly-foreground font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <HeroContent />
        <NoSSR>
          <SocialProof />
        </NoSSR>
        <SearchBar />
        <NoSSR>
          <ScrollRevealHeading />
        </NoSSR>
      </main>
{/* 
      <NoSSR>
        <ToolsSection />
      </NoSSR> */}

      <NoSSR>
        <PaymentSection />
      </NoSSR>

      <NoSSR>
        <CalmWorkSection />
      </NoSSR>
      
      <NoSSR>
        <ModernLandingDemo />
      </NoSSR>
      
      <NoSSR>
        <TestimonialSlider />
      </NoSSR>
      
      <NoSSR>
        <Footer />
      </NoSSR>
    </div>
  );
}
