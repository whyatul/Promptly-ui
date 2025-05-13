"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollRevealHeading = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!headingRef.current) return;
    
    const splitText = () => {
      const heading = headingRef.current!;
      const text = heading.innerText;
      const words = text.split(' ');
      heading.innerHTML = '';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'words-wrapper relative';
      heading.appendChild(wrapper);

      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = `typewriter-word word-${index}`;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.visibility = 'hidden';
        span.style.marginRight = '0.3em';
        span.style.transform = 'translateY(20px)';
        span.textContent = word;
        
        wrapper.appendChild(span);
      });
      
      return wrapper.querySelectorAll('.typewriter-word');
    };
    
    const words = splitText();
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%", 
        end: "top 20%",   
        scrub: 1,         
        toggleActions: "play none none reverse"
      }
    });
    
    tl.to(words, {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      stagger: 0.1,
      duration: 0.3,
    });
    
    if (paragraphRef.current) {
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-left overflow-hidden mb-8"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit nulla nec odio nisl aliquam aliquet vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae sed euismod diam eget bibendum ultricies nunc tincidunt nisl id aliquet nunc nisi eget nisl ut facilisis justo ut lacus tempor eget volutpat magna faucibus
        </h1>
      </div>
    </div>
  );
};

export default ScrollRevealHeading;
