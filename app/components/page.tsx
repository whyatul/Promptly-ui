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
    <div className="relative min-h-screen bg-[#0F0E1E] text-white py-20 px-6 font-[\'Ubuntu\']">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-white mb-4">What people says</h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto">
          Discover what our satisfied customers have to say about their experiences with {" "}
          <span className="bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent font-semibold">
            Promptly
          </span>
        </p>
      </div>

      <div className="mb-14">
        <Slider {...settingsLTR} ref={slider1Ref}>
          {testimonials.map((testimonial, index) => (
            <div key={`ltr-${index}`} className="px-3">
              <div
                className={`bg-[#1B1A2D] text-white rounded-2xl p-7 border border-white/10 h-52 flex flex-col justify-between transition-all duration-300 group hover:border-[#9B7BFF] hover:shadow-[0_0_40px_#9B7BFF55]`}
              >
                <p className="text-base md:text-lg leading-relaxed mb-5">“{testimonial.quote}”</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <p className="text-white text-base font-semibold leading-tight">{testimonial.author}</p>
                    <p className="text-sm text-gray-400 leading-none">{testimonial.role}</p>
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
            <div key={`rtl-${index}`} className="px-3">
              <div
                className={`bg-[#1B1A2D] text-white rounded-2xl p-7 border border-white/10 h-52 flex flex-col justify-between transition-all duration-300 group hover:border-[#9B7BFF] hover:shadow-[0_0_40px_#9B7BFF55]`}
              >
                <p className="text-base md:text-lg leading-relaxed mb-5">“{testimonial.quote}”</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <p className="text-white text-base font-semibold leading-tight">{testimonial.author}</p>
                    <p className="text-sm text-gray-400 leading-none">{testimonial.role}</p>
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
        body {
          font-family: 'Ubuntu', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
