"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Import CSS at the top level
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Slider components dynamically to prevent SSR issues
const SliderModule = dynamic(() => import("react-slick"), {
  ssr: false,
});

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

const TestimonialSlider: React.FC = () => {
  const slider1Ref = useRef<any>(null);
  const slider2Ref = useRef<any>(null);
  
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Simulate a timeout for loading to prevent infinite loading state
    const timeout = setTimeout(() => {
      if (!mounted && !error) {
        setError("Testimonials could not be loaded. Please refresh the page.");
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const settingsLTR: any = {
    dots: false,
    infinite: true,
    speed: 8000, // Slowed down for better readability
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    beforeChange: (_: any, next: number) => setActiveIndex(next),
  };

  const settingsRTL: any = {
    ...settingsLTR,
    rtl: true,
    speed: 10000, // Slowed down for better readability
  };

  const testimonials: Testimonial[] = [
    {
      quote: "Promptly has revolutionized how our team approaches UI animations. The AI suggestions are spot-on and save us countless hours of work!",
      author: "Alex Chen",
      role: "Lead Designer",
      company: "Creative Solutions Inc."
    },
    {
      quote: "The speed at which we can now prototype and implement animations is incredible. Promptly's AI has become an essential part of our workflow.",
      author: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechFront Studios"
    },
    {
      quote: "I was skeptical about AI-driven design tools, but Promptly changed my mind. It understands exactly what I need and delivers every time.",
      author: "Michael Rodriguez",
      role: "UX Director",
      company: "Innovate UX"
    },
    {
      quote: "As a solo designer, Promptly feels like having an entire animation team at my fingertips. The quality and speed are unmatched.",
      author: "Emma Wilson",
      role: "Freelance Designer",
      company: "Self-employed"
    },
    {
      quote: "Our clients are consistently impressed with the polished animations we deliver. Promptly has elevated our entire design output.",
      author: "David Park",
      role: "Agency Owner",
      company: "Pixel Perfect Design"
    },
    {
      quote: "The learning curve was non-existent. We were up and running with complex animations in minutes. Simply revolutionary.",
      author: "Olivia Martinez",
      role: "Product Manager",
      company: "SaaS Innovations"
    },
  ];

  // Loading state with animated placeholder
  if (!mounted) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-60 animate-pulse" style={{animationDelay: "300ms"}}></div>
            <div className="absolute inset-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-80 animate-pulse" style={{animationDelay: "600ms"}}></div>
          </div>
          <p className="text-lg text-gray-100 animate-pulse">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-[#FF6B6B]/30">
          <div className="text-[#FF6B6B] text-4xl mb-4">⚠️</div>
          <p className="text-lg text-gray-100 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-full text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Regular display
  return (
    <div className="relative w-full px-6 animate-in overflow-hidden" suppressHydrationWarning>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF8E53]/10 to-[#FF6B6B]/5 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent animate-pulse"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
          >
            Trusted by designers & developers
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who are creating beautiful animations in record time
          </p>
        </div>

        <div className="mb-20 overflow-visible relative">
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          
          {/* Active slider indicator */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
            {testimonials.slice(0, 3).map((_, idx) => (
              <div 
                key={idx} 
                className={`w-8 h-1 rounded-full transition-all duration-300 
                  ${activeIndex === idx ? 'bg-[#FF8E53]' : 'bg-gray-500/30'}`}
              ></div>
            ))}
          </div>
          
          <SliderModule {...settingsLTR} ref={slider1Ref}>
            {testimonials.map((testimonial, index) => (
              <div key={`ltr-${index}`} className="px-4 py-2">
                <div 
                  className={`bg-white/5 backdrop-blur-sm text-white rounded-2xl p-8 border border-[#FF8E53]/20 h-auto flex flex-col justify-between transition-all duration-500 
                    ${activeIndex === index ? 'scale-105 shadow-[0_0_35px_rgba(255,110,65,0.35)]' : 'scale-100'}
                    hover:border-[#FF8E53]/50 hover:shadow-[0_0_45px_5px_rgba(255,110,65,0.35)] hover:-translate-y-1`}
                >
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[#FF8E53] text-xl">★</span>
                    ))}
                  </div>
                  
                  <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-100">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white text-lg font-semibold leading-tight">{testimonial.author}</p>
                      <p className="text-sm text-gray-300 leading-tight">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SliderModule>
        </div>

        <div className="overflow-visible relative">
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          
          <SliderModule {...settingsRTL} ref={slider2Ref}>
            {[...testimonials].reverse().map((testimonial, index) => (
              <div key={`rtl-${index}`} className="px-4 py-2">
                <div 
                  className="bg-white/5 backdrop-blur-sm text-white rounded-2xl p-8 border border-[#FF8E53]/20 h-auto flex flex-col justify-between transition-all duration-500 
                  hover:border-[#FF8E53]/50 hover:shadow-[0_0_45px_5px_rgba(255,110,65,0.35)] hover:-translate-y-1"
                >
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[#FF8E53] text-xl">★</span>
                    ))}
                  </div>
                  
                  <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-100">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white text-lg font-semibold leading-tight">{testimonial.author}</p>
                      <p className="text-sm text-gray-300 leading-tight">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SliderModule>
        </div>
      </div>

      <style jsx global>{`
        .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .slick-slide {
          height: inherit !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        .slick-slide > div {
          margin: 0 10px;
          height: 100%;
          width: 100%;
        }
        .slick-list {
          margin: 0 -10px;
          overflow: visible;
          padding: 40px 0 !important;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
