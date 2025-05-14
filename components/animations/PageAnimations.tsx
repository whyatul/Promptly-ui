"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

interface PageAnimationsProps {
  children: ReactNode;
}

const PageAnimations: React.FC<PageAnimationsProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Fade in the entire page with a more dramatic effect
    tl.fromTo('body', 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
    );
    
    // Add scroll-based animations to sections
    gsap.utils.toArray('section').forEach((section: any, i) => {
      // Add subtle parallax effect
      gsap.fromTo(section, 
        { y: 0, rotation: 0 }, 
        {
          y: -20 * (i % 2 ? 1 : -1), // Reduced movement to avoid layout issues
          rotation: 0.2 * (i % 2 ? 1 : -1), // Slight rotation for more dynamic feel
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8, // Smoother scrub effect
          }
        }
      );
      
      // Add staggered reveal for children elements
      const sectionChildren = section.querySelectorAll('.animate-on-scroll');
      if (sectionChildren.length) {
        gsap.from(sectionChildren, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      }
    });

    // Enhanced animation for headings
    gsap.utils.toArray('h1, h2').forEach((heading: any) => {
      gsap.from(heading, {
        opacity: 0,
        y: 30, // Reduced movement
        duration: 1,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=80',
          toggleActions: 'play none none none',
          once: true
        }
      });
    });
    
    // Button hover effects
    gsap.utils.toArray('a, button').forEach((button: any) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.5)',
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.out',
        });
      });
    });
    
    // Add enhanced cursor trail effect with coral/orange color scheme
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    // Fix type issues with Observer
    if (typeof Observer !== 'undefined') {
      Observer.create({
        type: 'pointer',
        onMove: (self) => {
          if (self && self.event) {
            const e = self.event as MouseEvent;
            const clientX = e.clientX || 0;
            const clientY = e.clientY || 0;
            gsap.to(cursorTrail, {
              x: clientX,
              y: clientY,
              duration: 0.4, // Slightly faster for more responsive feel
              ease: 'power2.out'
            });
          }
        }
      });
    }

    // Clean up animations when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (cursorTrail.parentNode) {
        cursorTrail.parentNode.removeChild(cursorTrail);
      }
    };
  }, []);

  return (
    <>
      <div ref={contentRef}>
        {children}
      </div>
      
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .cursor-trail {
          position: fixed;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, rgba(255, 142, 83, 0.3) 70%, transparent 100%);
          pointer-events: none;
          z-index: 9999;
          opacity: 0.7;
          transform: translate(-50%, -50%);
          filter: blur(2px);
          box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
        }
        
        @media (prefers-reduced-motion) {
          section, .animate-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default PageAnimations;
