import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroContent = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (!headlineRef.current) return;
    
    const splitText = () => {
      const headlines = headlineRef.current!.querySelectorAll('.headline-part');
      const results: {chars: NodeListOf<Element>[], lines: NodeListOf<Element>} = {
        chars: document.createDocumentFragment().childNodes as any,
        lines: headlines
      };
      
      headlines.forEach((headline, idx) => {
        const originalText = headline.textContent || '';
        const chars = originalText.split('');
        const isGradient = headline.classList.contains('gradient-text');
        
        headline.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.className = isGradient ? 'chars-wrapper gradient-wrapper' : 'chars-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        headline.appendChild(wrapper);
        
        chars.forEach((char, i) => {
          const charContainer = document.createElement('div');
          charContainer.className = 'char-container';
          charContainer.style.position = 'relative';
          charContainer.style.display = 'inline-block';
          charContainer.style.overflow = 'hidden';
          charContainer.style.verticalAlign = 'top';
          
          const span = document.createElement('span');
          span.className = `char char-${i}`;
          span.style.display = 'inline-block';
          span.style.willChange = 'transform';
          
          if (isGradient) {
            span.className += ' gradient-char';
            span.style.backgroundImage = 'linear-gradient(to bottom, #ffd319, #ff2975, #8c1eff)';
            span.style.WebkitBackgroundClip = 'text';
            span.style.backgroundClip = 'text';
            span.style.color = 'transparent';
          }
          
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else {
            span.textContent = char;
          }
          
          charContainer.appendChild(span);
          wrapper.appendChild(charContainer);
        });
        
        if (idx === 0) {
          results.chars = wrapper.querySelectorAll('.char');
        }
      });
      
      return results;
    };
    
    gsap.killTweensOf(".headline-part, .char, .char-container");
    
    const { chars, lines } = splitText();
    
    const masterTl = gsap.timeline({
      defaults: { 
        ease: "power3.out", 
        duration: 0.5
      }
    });
    
    gsap.set(".char", { 
      opacity: 0,
      y: 80,
      rotationX: -90,
      scale: 0.8,
    });
    
    masterTl.to(".char", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 1.2, 
        from: "start",
        ease: "power2.inOut"
      },
      ease: "elastic.out(1, 0.8)"
    });
    
    if (btnRef.current) {
      gsap.set(btnRef.current, { opacity: 1, y: 0, scale: 1 });
      
      gsap.fromTo(btnRef.current, 
        { opacity: 0, y: 40, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          delay: 1.2,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          clearProps: "all"
        }
      );
    }
    
    const lastLineChars = lines[lines.length - 1].querySelectorAll('.char');
    masterTl.add(() => {
      gsap.to(lastLineChars, {
        keyframes: [
          { y: -5, duration: 0.4, ease: "sine.inOut", stagger: 0.03 },
          { y: 0, duration: 0.4, ease: "sine.inOut", stagger: 0.03 }
        ],
        repeat: -1,
        repeatDelay: 4,
        delay: 1.5
      });
    });
    
    return () => {
      gsap.killTweensOf(".headline-part, .char, .char-container");
    };
  }, []);
  
  return (
    <>
      <h1 
        ref={headlineRef}
        className="font-calSans text-7xl sm:text-7xl md:text-9xl font-extrabold tracking-wide mb-12 relative"
        style={{ 
          perspective: "1000px",
          fontFamily: "var(--font-cal-sans), sans-serif" 
        }} 
      >
        <span className="headline-part block text-promptly-heading">Simplify your workflow</span> 
        <span className="headline-part block text-promptly-heading">with</span> 
        <span 
          className="headline-part gradient-text bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent"
          style={{ 
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Promptly AI
        </span>
      </h1>

      <button 
        ref={btnRef}
        className="relative overflow-hidden bg-gray-900 text-white text-lg font-semibold mt-4 px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 ease-out focus:outline-none"
        style={{ opacity: 1 }}
      >
        <span className="relative z-10">Get Started</span>
        <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
      </button>
    </>
  );
};

export default HeroContent;
