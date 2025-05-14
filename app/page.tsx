"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
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
import AIWebsiteBuilder from "@/components/ui/ai-website-builder";
import AIParticleEffect from "@/components/animations/ai-particle-effect";
import AIEnergyOrb from "@/components/animations/ai-energy-orb";
import AICircuitAnimation from "@/components/animations/ai-circuit-animation";
import AITypingEffect from "@/components/animations/ai-typing-effect";
import AICodeLivePreview from "@/components/animations/ai-code-live-preview";
import NoSSR from "@/lib/utils/no-ssr";
import dynamic from "next/dynamic";
import PageAnimations from "@/components/animations/PageAnimations";


// Improved testimonial slider with better fallback
const TestimonialSlider = dynamic(
  () => import("@/components/sections/testimonial-slider"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-60 animate-pulse" style={{animationDelay: "300ms"}}></div>
            <div className="absolute inset-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-80 animate-pulse" style={{animationDelay: "600ms"}}></div>
          </div>
          <p className="text-lg text-white animate-pulse">Loading testimonials...</p>
        </div>
      </div>
    )
  }
);

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withGlow?: boolean;
  withCircuit?: boolean;
  withParticles?: boolean;
  darkMode?: boolean;
}

// Section component for organization
const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  id = "",
  withGlow = false,
  withCircuit = false,
  withParticles = false,
  darkMode = false
}) => {
  return (
    <section id={id} className={`w-full relative overflow-hidden ${className} ${darkMode ? 'bg-[#1F2937] text-white' : ''}`}>
      {withCircuit && (
        <NoSSR>
          <div className="absolute inset-0 opacity-20">
            <AICircuitAnimation 
              width={typeof window !== 'undefined' ? window.innerWidth : 1200} 
              height={600} 
              nodeCount={35} 
            />
          </div>
        </NoSSR>
      )}
      
      {withParticles && (
        <NoSSR>
          <div className="absolute inset-0 opacity-30">
            <AIParticleEffect />
          </div>
        </NoSSR>
      )}
      
      <div className={`relative z-10 ${withGlow ? 'animate-ai-glow rounded-2xl overflow-hidden' : ''}`}>
        {children}
      </div>
    </section>
  );
};

// Sample code snippets for the live preview
const codeSnippets = [
  `// Animation.tsx
import { motion } from 'framer-motion';

export function FadeInAnimation({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}`,
  `// GradientButton.tsx
import { useState } from 'react';

export function GradientButton({ text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={\`px-6 py-3 rounded-full font-medium transition-all duration-300
        \${isHovered ? 'shadow-lg scale-105' : 'shadow-md'}
        bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
      <span className="ml-2">→</span>
    </button>
  );
}`
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [showTitleEffect, setShowTitleEffect] = useState(false);

  useEffect(() => {
    if (pageRef.current) {
      gsap.from(pageRef.current.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Trigger the typing effect after a delay
      setTimeout(() => {
        setShowTitleEffect(true);
      }, 500);
    }
  }, []);

  return (
    <PageAnimations>
      <div 
        ref={pageRef} 
        className="min-h-screen flex flex-col items-center bg-promptly-background text-promptly-foreground font-sans"
        style={{
          background: "var(--background)",
          position: "relative",
          zIndex: 0
        }}
      >
        {/* Background effects */}
        <NoSSR>
          <AIParticleEffect />
          <AIEnergyOrb 
            size={300} 
            position="top-right" 
            intensity="low" 
            primaryColor="#FF6B6B" 
            secondaryColor="#FF8E53" 
          />
          <AIEnergyOrb 
            size={250} 
            position="bottom-left" 
            intensity="low" 
            primaryColor="#FF5E99" 
            secondaryColor="#9940FF" 
          />
        </NoSSR>

        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
          <div className="animate-in relative z-10">
            <HeroContent />
          </div>
          <NoSSR>
            <div className="animate-in">
              <SocialProof />
            </div>
          </NoSSR>
          <div className="animate-in relative z-10">
            <SearchBar />
          </div>
          <NoSSR>
            <div className="animate-in">
              <ScrollRevealHeading />
            </div>
          </NoSSR>
        </main>

        <NoSSR>
          <Section className="animate-in py-20">
            <PaymentSection />
          </Section>
        </NoSSR>
        <NoSSR>
          <Section 
            className="animate-in py-20" 
            withParticles={true}
          >
            <div className="max-w-6xl mx-auto px-4 relative z-10">
              <AITypingEffect
                text="Watch AI write animation code in real-time"
                speed={30}
                tag="h2"
                highlightWords={["AI", "animation", "code", "real-time"]}
                className="text-center text-4xl sm:text-5xl font-bold mb-12"
              />
              <div className="animate-ai-glow rounded-2xl overflow-hidden shadow-2xl">
                <AICodeLivePreview 
                  codeSnippets={codeSnippets}
                  height="550px"
                  typingSpeed={15}
                />
              </div>
            </div>
          </Section>
        </NoSSR>

        <NoSSR>
          <Section className="animate-in py-20 bg-[#FDF6ED]" withParticles={true}>
            <CalmWorkSection />
          </Section>
        </NoSSR>
        
        <NoSSR>
          <Section className="animate-in py-20">
            <ModernLandingDemo />
          </Section>
        </NoSSR>
        
        <NoSSR>
          <Section className="animate-in py-24" darkMode={true} withGlow={true}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <AITypingEffect
                  text="What our customers are saying"
                  speed={30}
                  className="text-4xl sm:text-5xl font-bold mb-4 text-white"
                  tag="h2"
                />
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who are building amazing websites with our AI technology
                </p>
              </div>
              <TestimonialSlider />
            </div>
          </Section>
        </NoSSR>
        
        <NoSSR>
          <Section className="animate-in">
            <Footer />
          </Section>
        </NoSSR>
      </div>
    </PageAnimations>
  );
}
