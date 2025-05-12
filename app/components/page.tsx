"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TestimonialSlider: React.FC = () => {
  const slider1Ref = useRef<Slider>(null);
  const slider2Ref = useRef<Slider>(null);

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
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    author: "Lorem Ipsum",
    role: "Lorem Ipsum",
    company: "",
  });

  return (
    <div className="relative min-h-screen bg-[#0F0E1E] text-white py-16 px-4">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4">What people says</h2>
        <p className="text-[#cfcfcf] max-w-2xl mx-auto mb-12">
          Discover what our satisfied customer have to say about their experiences with Promptly
        </p>
      </div>

      <div className="mb-10">
        <Slider {...settingsLTR} ref={slider1Ref}>
          {testimonials.map((testimonial, index) => (
            <div key={`ltr-${index}`} className="px-2">
              <div
                className={`bg-[#1B1A2D] text-white rounded-xl p-6 border border-white/10 h-48 flex flex-col justify-between transition-all duration-300 ${index === 1 ? "border border-[#9B7BFF] shadow-[0_0_40px_#9B7BFF55]" : "hover:bg-white/10 hover:shadow-[0_0_20px_rgba(109,40,217,0.3)]"}`}
              >
                <p className="text-sm mb-4">“{testimonial.quote}”</p>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <p className="text-white text-sm font-medium leading-none">{testimonial.author}</p>
                    <p className="text-xs text-gray-400 leading-none">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div>
        <Slider {...settingsRTL} ref={slider2Ref}>
          {[...testimonials].reverse().map((testimonial, index) => (
            <div key={`rtl-${index}`} className="px-2">
              <div
                className={`bg-[#1B1A2D] text-white rounded-xl p-6 border border-white/10 h-48 flex flex-col justify-between transition-all duration-300 ${index === 1 ? "border border-[#9B7BFF] shadow-[0_0_40px_#9B7BFF55]" : "hover:bg-white/10 hover:shadow-[0_0_20px_rgba(109,40,217,0.3)]"}`}
              >
                <p className="text-sm mb-4">“{testimonial.quote}”</p>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <p className="text-white text-sm font-medium leading-none">{testimonial.author}</p>
                    <p className="text-xs text-gray-400 leading-none">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .slick-slide > div {
          margin: 0 10px;
        }
        .slick-list {
          margin: 0 -10px;
          overflow: visible;
        }
        .slick-slide {
          transition: transform 0.3s ease;
        }
        .slick-slide:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
