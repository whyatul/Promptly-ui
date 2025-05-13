"use client";

import { useState, useRef, useEffect } from "react"; // Added useEffect import
import dynamic from "next/dynamic";

// Import CSS at the top level, not in useEffect
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
}

const TestimonialSlider: React.FC = () => {
  const slider1Ref = useRef<any>(null);
  const slider2Ref = useRef<any>(null);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settingsLTR: any = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const settingsRTL: any = {
    ...settingsLTR,
    rtl: true,
    speed: 15000,
  };

  const testimonials: Testimonial[] = Array(8).fill({
    quote: "Promptly has revolutionized how our team approaches UI animation. It's intuitive, powerful, and incredibly fast!",
    author: "Alex Chen",
    role: "Lead Designer",
    company: "Creative Solutions Inc.",
  });

  if (!mounted) {
    return <div className="h-60 bg-promptly-background"></div>;
  }

  return (
    <div className="relative w-full bg-promptly-background text-promptly-foreground py-20 px-6 animate-in" suppressHydrationWarning>
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-promptly-heading mb-4 "
        style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >What people says</h2>
        <p className="text-lg text-promptly-foreground/80 max-w-3xl mx-auto">
          Discover what our satisfied customers have to say about their experiences with{" "}
          <span className="bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent font-semibold">
            Promptly
          </span>
        </p>
      </div>

      <div className="mb-14">
        <SliderModule {...settingsLTR} ref={slider1Ref}>
          {testimonials.map((testimonial, index) => (
            <div key={`ltr-${index}`} className="px-3">
              <div className="bg-card-bg text-promptly-foreground rounded-2xl p-7 border border-border-soft h-52 flex flex-col justify-between transition-all duration-300 group hover:border-sky-blue hover:shadow-[0_0_45px_5px_theme(colors.sky-blue/0.35)] hover:-translate-y-1">
                <p className="text-base md:text-lg leading-relaxed mb-5 text-promptly-foreground/90">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="text-promptly-heading text-base font-semibold leading-tight">{testimonial.author}</p>
                    <p className="text-sm text-subheading-color leading-none">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SliderModule>
      </div>

      <div>
        <SliderModule {...settingsRTL} ref={slider2Ref}>
          {[...testimonials].reverse().map((testimonial, index) => (
            <div key={`rtl-${index}`} className="px-3">
              <div className="bg-card-bg text-promptly-foreground rounded-2xl p-7 border border-border-soft h-52 flex flex-col justify-between transition-all duration-300 group hover:border-sky-blue hover:shadow-[0_0_45px_5px_theme(colors.sky-blue/0.35)] hover:-translate-y-1">
                <p className="text-base md:text-lg leading-relaxed mb-5 text-promptly-foreground/90">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="text-promptly-heading text-base font-semibold leading-tight">{testimonial.author}</p>
                    <p className="text-sm text-subheading-color leading-none">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SliderModule>
      </div>

      <style jsx global>{`
        .slick-slide > div {
          margin: 0 10px;
        }
        .slick-list {
          margin: 0 -10px;
          overflow: visible;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
