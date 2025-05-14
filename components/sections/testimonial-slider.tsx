"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Import CSS at the top level
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Slider dynamically to prevent SSR issues
const Slider = dynamic(() => import("react-slick"), {
  ssr: false
});

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Use useEffect to track client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const settingsLTR = {
    dots: false,
    infinite: true,
    speed: 8000,
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

  const settingsRTL = {
    ...settingsLTR,
    rtl: true,
    speed: 10000,
  };

  const testimonials: Testimonial[] = [
    {
      quote: "Promptly transformed how we design websites. We've cut our development time in half while creating more visually stunning results. Our clients are amazed by what we can deliver now.",
      author: "Alex Chen",
      role: "Lead Designer",
      company: "Creative Solutions Inc."
    },
    {
      quote: "The AI-powered website builder is revolutionary. I created a complete e-commerce store in just one afternoon that would have taken weeks with traditional tools. The conversion rate has been phenomenal.",
      author: "Sarah Johnson",
      role: "Frontend Developer",
      company: "TechFront Studios"
    },
    {
      quote: "As a non-technical founder, Promptly was a game-changer for our startup. We launched our SaaS product with a beautiful, responsive website that looks like we spent thousands on a design agency.",
      author: "Michael Rodriguez",
      role: "UX Director",
      company: "Innovate UX"
    },
    {
      quote: "I've used every website builder on the market, and nothing comes close to Promptly. The AI understands exactly what I need and creates custom solutions that perfectly match my brand identity.",
      author: "Emma Wilson",
      role: "Freelance Designer",
      company: "Self-employed"
    },
    {
      quote: "Our agency has increased client capacity by 40% since adopting Promptly. The seamless workflow from concept to deployment means we can deliver professional websites in record time.",
      author: "David Park",
      role: "Agency Owner",
      company: "Pixel Perfect Design"
    },
    {
      quote: "The SEO optimization alone was worth the investment. Our organic traffic increased by 78% in the first month after migrating to a Promptly-built site. The AI just knows what Google wants.",
      author: "Olivia Martinez",
      role: "Marketing Director",
      company: "SaaS Innovations"
    },
    {
      quote: "Promptly helped us rebuild our entire enterprise website in just two weeks. The AI's ability to maintain brand consistency across hundreds of pages while optimizing for performance is unmatched.",
      author: "James Wilson",
      role: "CTO",
      company: "EnterpriseFlow"
    },
    {
      quote: "As a small business owner with no tech background, I was able to create a website that rivals my bigger competitors. The AI guided me through every step with suggestions that felt custom-made for my industry.",
      author: "Sophia Lee",
      role: "Owner",
      company: "Artisan Crafts Co."
    },
    {
      quote: "The accessibility features in Promptly are incredible. Our university website now meets all WCAG guidelines without any additional work, and the AI automatically suggests improvements for inclusive design.",
      author: "Robert Johnson",
      role: "Digital Accessibility Lead",
      company: "State University"
    },
    {
      quote: "Our e-commerce conversion rate jumped 35% after switching to Promptly. The AI-optimized checkout flow and product pages seem to know exactly what our customers need to see before making a purchase.",
      author: "Nina Patel",
      role: "E-commerce Manager",
      company: "Global Retail Solutions"
    }
  ];

  // Show a simple loading state until client-side rendering is complete
  if (!mounted) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent animate-pulse">
            Trusted by website creators worldwide
          </h2>
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
          <p className="text-lg text-white animate-pulse">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  // Client-side rendered content with Slider
  return (
    <div className="relative w-full px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF8E53]/10 to-[#FF6B6B]/5 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent animate-pulse"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
          >
            Trusted by website creators worldwide
          </h2>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who are building stunning websites in record time
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
          
          <Slider {...settingsLTR}>
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
          </Slider>
        </div>

        <div className="overflow-visible relative">
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#1F2937] to-transparent z-10 pointer-events-none"></div>
          
          <Slider {...settingsRTL}>
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
          </Slider>
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
