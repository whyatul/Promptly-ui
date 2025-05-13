"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Observer } from 'gsap/Observer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);
}

interface PageAnimationsProps {
  children: ReactNode;
}

const PageAnimations: React.FC<PageAnimationsProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Fade in the entire page
    tl.fromTo('body', 
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Create smooth scrolling experience
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1, // Adjust the smoothness (higher = smoother but more delay)
      effects: true,
      normalizeScroll: true,
    });
    
    // Add scroll-based parallax effects to sections
    gsap.utils.toArray('section').forEach((section: any, i) => {
      // Add subtle parallax to sections
      gsap.fromTo(section, 
        { y: 0 }, 
        {
          y: -50 * (i % 2 ? 1 : -1), // Alternate direction
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
      
      // Add fade in and scale effect for sections
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom-=100',
        end: 'top center',
        toggleClass: 'section-visible',
        once: true
      });
    });

    // Page backgrounds parallax effect
    const backgrounds = document.querySelectorAll('.bg-promptly-background');
    backgrounds.forEach((bg: any) => {
      gsap.to(bg, {
        backgroundPosition: `50% ${-20}%`,
        ease: "none",
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
    
    // Add animation to headings
    gsap.utils.toArray('h1, h2').forEach((heading: any) => {
      gsap.from(heading, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=50',
          toggleActions: 'play none none none',
          once: true
        }
      });
    });
    
    // Add cursor trail effect
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    Observer.create({
      type: 'pointer',
      onMove: (self) => {
        const { clientX, clientY } = self;
        gsap.to(cursorTrail, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Clean up animations when component unmounts
    return () => {
      if (smootherRef.current) smootherRef.current.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (cursorTrail.parentNode) {
        cursorTrail.parentNode.removeChild(cursorTrail);
      }
    };
  }, []);

  return (
    <>
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
      
      <style jsx global>{`
        .smooth-wrapper {
          overflow: hidden;
          position: relative;
        }
        
        .smooth-content {
          will-change: transform;
        }
        
        section {
          opacity: 0.85;
          transform: scale(0.95);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.section-visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .cursor-trail {
          position: fixed;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,211,25,0.5) 0%, rgba(255,41,117,0.2) 70%, transparent 100%);
          pointer-events: none;
          z-index: 9999;
          opacity: 0.6;
          transform: translate(-50%, -50%);
          filter: blur(2px);
        }
        
        @media (prefers-reduced-motion) {
          .smooth-wrapper, .smooth-content {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default PageAnimations;
