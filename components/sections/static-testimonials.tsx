"use client";

import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const StaticTestimonials: React.FC = () => {
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
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index}
          className="bg-white/5 backdrop-blur-sm text-white rounded-2xl p-8 border border-[#FF8E53]/20 h-auto flex flex-col justify-between transition-all duration-500
            hover:border-[#FF8E53]/50 hover:shadow-[0_0_45px_5px_rgba(255,110,65,0.35)] hover:-translate-y-1"
        >
          <div className="mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-[#FF8E53] text-xl">★</span>
            ))}
          </div>
          
          <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-100">"{testimonial.quote}"</p>
          
          <div className="flex items-center mt-auto">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mr-4">
              <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white text-lg font-semibold leading-tight">{testimonial.author}</p>
              <p className="text-sm text-gray-300 leading-tight">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaticTestimonials; 