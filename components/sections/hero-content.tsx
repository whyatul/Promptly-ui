import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AITypingEffect from '@/components/animations/ai-typing-effect';

const HeroContent = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!headlineRef.current) return;
    
    const splitText = () => {
      const headlines = headlineRef.current!.querySelectorAll('.headline-part');
      const results: {chars: NodeListOf<Element>, lines: NodeListOf<Element>} = {
        chars: document.createDocumentFragment().childNodes as any,
        lines: headlines
      };
      
      headlines.forEach((headline, idx) => {
        const originalText = headline.textContent || '';
        const chars = originalText.split('');
        const isGradient = headline.classList.contains('gradient-headline');
        
        // Clear the headline content
        headline.textContent = '';
        
        // Create spans for each character
        chars.forEach((char, charIdx) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'char-element';
          
          if (isGradient) {
            span.classList.add('gradient-char');
            // Apply explicit inline gradient style to ensure visibility
            span.style.background = 'linear-gradient(to right, #FF6B6B, #FF8E53)';
            span.style.webkitBackgroundClip = 'text';
            span.style.backgroundClip = 'text';
            span.style.color = 'transparent';
            span.style.display = 'inline-block';
            
            // Add extra letter spacing for better readability
            span.style.letterSpacing = '0.03em';
          }
          
          // Add animation delay
          span.style.animationDelay = `${(idx * 0.05) + (charIdx * 0.03)}s`;
          span.classList.add('animate-float-in');
          
          headline.appendChild(span);
        });
      });
      
      return results;
    };
    
    // Animate the hero section elements
    const animateHero = () => {
      if (!heroRef.current) return;
      
      // Split text for character animations
      splitText();
      
      // Animate the button
      gsap.from(btnRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
      });
      
      // Add floating animation to decorative elements
      const decorativeElements = heroRef.current.querySelectorAll('.decor-element');
      decorativeElements.forEach((el, idx) => {
        gsap.to(el, {
          y: -15,
          duration: 2.5 + (idx * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: idx * 0.2
        });
      });
    };
    
    animateHero();
  }, []);

  return (
    <div className="pt-20 pb-16 px-4 max-w-7xl mx-auto relative" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20 animate-pulse" suppressHydrationWarning></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-[#FF8E53]/20 to-[#FF6B6B]/20 animate-float" style={{animationDelay:"1s"}} suppressHydrationWarning></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 animate-float" style={{animationDelay:"2s"}} suppressHydrationWarning></div>
      
      {/* Fixed code snippets with suppressHydrationWarning */}
      <div className="absolute top-1/4 right-1/4 transform rotate-6 opacity-5 decoration-clone" suppressHydrationWarning>
        <div className="bg-gray-600/30 backdrop-blur-sm rounded-lg p-3 text-[8px] font-mono text-white whitespace-pre" suppressHydrationWarning>
          {"<motion.div animate={{ y: [0, 10, 0] }} />"}
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 transform -rotate-3 opacity-5 decoration-clone" suppressHydrationWarning>
        <div className="bg-gray-600/30 backdrop-blur-sm rounded-lg p-3 text-[8px] font-mono text-white whitespace-pre" suppressHydrationWarning>
          {"@keyframes float { 0%, 100% { transform: translateY(0); } }"}
        </div>
      </div>
      
      {/* Digital grid pattern in background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-cal-sans), sans-serif", letterSpacing: "0.02em" }}
        >
          <div className="mb-2">
            Build your{" "}
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF5E99] bg-clip-text text-transparent animate-pulse">
              websites
            </span>
          </div>
          <div>
            seamlessly with{" "}
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FF5E99] bg-clip-text text-transparent animate-pulse">
              AI
            </span>
          </div>
        </h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <AITypingEffect
            text="Transform your ideas into beautiful, functional websites without code. Our AI understands exactly what you need and brings your vision to life instantly."
            speed={15}
            delay={800}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            highlightWords={["AI", "beautiful", "functional", "instantly"]}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            ref={btnRef}
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-white rounded-full group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53]"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#FF8E53] opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative flex items-center text-lg">
              Get Started
              <svg className="w-6 h-6 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
          
          <button className="px-8 py-4 rounded-full border-2 border-[#FF6B6B] text-[#FF6B6B] bg-white/30 backdrop-blur-sm font-medium text-lg hover:bg-[#FF6B6B]/10 transition-colors">
            View Examples
          </button>
        </div>
      </div>
      
      {/* Enhanced shimmer effect overlay for the hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8E53] to-transparent animate-shimmer-slow"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent animate-shimmer-slow animation-delay-1000"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8E53] to-transparent animate-shimmer-slow animation-delay-2000"></div>
        </div>
      </div>
      
      {/* Mouse scroll indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start p-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
