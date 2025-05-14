"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GenerativeAIVisual from "@/components/ui/generative-ai-visual";
import gsap from "gsap";

// Define SVG icons for fallback
const Icons = {
  Star: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )
};

export default function ModernLandingDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsRef.current) return;
    
    // Create animated background blobs
    const createBackgroundBlobs = () => {
      // Clear any existing background blobs
      const existingBlobs = sectionRef.current?.querySelectorAll('.bg-blob');
      existingBlobs?.forEach(blob => blob.remove());
      
      // Create new animated background blobs
      for (let i = 0; i < 6; i++) {
        const blob = document.createElement('div');
        blob.className = 'bg-blob';
        
        // Randomize blob properties
        const size = Math.floor(Math.random() * 300) + 150;
        const isOdd = i % 2 === 0;
        
        // Set blob styles
        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;
        blob.style.background = `var(--gradient-main)`;
        blob.style.opacity = '0.1';
        blob.style.borderRadius = '40% 60% 60% 40% / 60% 30% 70% 40%';
        
        // Position randomly
        blob.style.top = `${Math.random() * 100}%`;
        blob.style.left = `${Math.random() * 100}%`;
        
        // Add different animations to each blob
        if (isOdd) {
          blob.classList.add('animate-floating-blob');
        } else {
          blob.classList.add('animate-floating-blob-2');
        }
        
        // Add delay to animations
        blob.style.animationDelay = `${i * 1.5}s`;
        
        sectionRef.current?.appendChild(blob);
      }
    };
    
    // Animate heading with split text effect
    const heading = headingRef.current;
    const text = heading.innerText;
    heading.innerHTML = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px) rotate(5deg)';
      span.style.transition = 'all 0.5s ease';
      span.style.transitionDelay = `${i * 0.03}s`;
      heading.appendChild(span);
    });
    
    // Create background elements
    createBackgroundBlobs();
    
    // Setup intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate heading letters when visible
          if (entry.target === heading) {
            Array.from(heading.children).forEach(span => {
              (span as HTMLElement).style.opacity = '1';
              (span as HTMLElement).style.transform = 'translateY(0) rotate(0)';
            });
          }
          
          // Animate feature cards when visible
          if (entry.target === cardsRef.current) {
            gsap.from('.feature-card', {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.5)",
            });
          }
          
          // Unobserve once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(heading);
    observer.observe(cardsRef.current);
    
    // Add animated shimmer effect to the section
    const shimmerEl = document.createElement('div');
    shimmerEl.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine opacity-70';
    shimmerEl.style.zIndex = '-1';
    sectionRef.current.appendChild(shimmerEl);
    
    return () => {
      // Clean up observer
      observer.disconnect();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="w-full font-sans relative overflow-hidden py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight font-poppins">
              Build Your Website Faster
            </h1>

            <p className="text-lg text-gray-700 max-w-xl animate-fade-in">
              Elevate your website build with our intuitive tools for faster, more efficient, quality-driven elements for
              a seamless digital experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link
                href="#"
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium relative overflow-hidden group"
                style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8E53)' }}
              >
                <span className="relative z-10">Get it now</span>
                <span className="relative z-10 h-5 w-5">
                  <Icons.ArrowRight />
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF8E53] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link
                href="#"
                className="px-6 py-3 bg-white text-black/70 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium border border-gray-200 hover:border-gray-300 gradient-border"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="md:w-1/2">
            <GenerativeAIVisual />
          </div>
        </div>

        <div className="py-24 relative">
          {/* Decorative background elements */}
          <div className="absolute -z-10 w-64 h-64 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-full blur-3xl top-0 left-0 animate-floating-blob"></div>
          <div className="absolute -z-10 w-80 h-80 bg-gradient-to-r from-[#FF8E53]/10 to-[#FF6B6B]/10 rounded-full blur-3xl bottom-0 right-0 animate-floating-blob-2" style={{ animationDelay: "2s" }}></div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in"
              style={{ 
                fontFamily: "var(--font-poppins), sans-serif",
                background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Powerful Features
            </h2>
            <p className="text-black/70 max-w-2xl mx-auto animate-fade-in">
              Everything you need to build stunning websites in record time
            </p>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.Zap /></div>,
                title: "Lightning Fast",
                description:
                  "Build and deploy websites in minutes, not days. Our optimized workflow saves you valuable time.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.Shield /></div>,
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security with 99.9% uptime guarantee. Your websites are always safe and available.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.Users /></div>,
                title: "Collaborative",
                description:
                  "Work seamlessly with your team in real-time. Share, edit, and deploy together effortlessly.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.CheckCircle /></div>,
                title: "SEO Optimized",
                description:
                  "Built-in SEO tools to help your websites rank higher in search engines and attract more visitors.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.Zap /></div>,
                title: "Responsive Design",
                description: "Create websites that look stunning on any device with our responsive design framework.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
              {
                icon: <div className="h-6 w-6 text-[#fff]"><Icons.Shield /></div>,
                title: "Custom Domains",
                description: "Connect your own domain in seconds with our simple DNS management system.",
                gradient: "from-[#FF6B6B] to-[#FF8E53]"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-[#FDF6ED] relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 hover:opacity-5 transition-opacity duration-300`}></div>
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 relative z-10 bg-gradient-to-r ${feature.gradient} bg-opacity-10`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10"
                  style={{ 
                    fontFamily: "var(--font-poppins), sans-serif",
                    background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-700 relative z-10"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-3xl p-10 md:p-14 relative overflow-hidden animate-gradient" style={{ backgroundSize: "200% 200%" }}>
            {/* Animated decorative elements */}
            <div className="absolute z-0 top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 animate-pulse">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 transform rotate-12"></div>
            </div>

            <div className="absolute z-0 top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 animate-float">
              <div className="h-40 w-40 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8E53]/20 transform -rotate-12"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 animate-fade-in"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Ready to Build{" "}
                <span style={{ 
                  background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                  transform: 'rotate(-1deg)'
                }}>
                  Faster
                </span>
                ?
              </h2>
              <p className="text-lg text-gray-700 mb-8 animate-fade-in"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Join thousands of developers and designers who are already building amazing websites with Promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#"
                  className="px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium relative overflow-hidden group"
                  style={{ background: 'linear-gradient(to right, #FF6B6B, #FF8E53)' }}
                >
                  <span className="relative z-10">Get Started Now</span>
                  <span className="relative z-10 h-5 w-5">
                    <Icons.ArrowRight />
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF8E53] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
                <Link
                  href="#"
                  className="px-8 py-4 bg-white text-black/70 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium border border-gray-200 hover:border-gray-300 gradient-border"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
