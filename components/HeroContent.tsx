import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// SplitText is a premium GSAP plugin - you need to register it properly
// Import it after purchasing a GSAP Club license
// import { SplitText } from 'gsap/SplitText';
// gsap.registerPlugin(SplitText);

// Load the CalSans font
const calSans = localFont({
  src: '../fonts/CalSans-Regular.ttf',
  display: 'swap',
});

const HeroContent = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!headlineRef.current) return;
    
    // Create a manual text splitting solution since SplitText might not be available
    // This works similarly to SplitText by wrapping characters in spans
    const splitText = () => {
      const headlines = headlineRef.current!.querySelectorAll('.headline-part');
      
      headlines.forEach((headline, idx) => {
        const originalText = headline.textContent || '';
        const chars = originalText.split('');
        
        headline.innerHTML = ''; // Clear content
        
        // Create wrapper for better animation control
        const wrapper = document.createElement('div');
        wrapper.className = 'chars-wrapper';
        headline.appendChild(wrapper);
        
        // Add characters with individual spans
        chars.forEach((char, i) => {
          const span = document.createElement('span');
          span.className = `char char-${i}`;
          span.style.display = 'inline-block'; // Important for animation
          span.style.position = 'relative';    // Enables 3D transforms
          
          // Handle spaces properly
          if (char === ' ') {
            span.innerHTML = '&nbsp;';
          } else {
            span.textContent = char;
          }
          
          wrapper.appendChild(span);
        });
      });
      
      return {
        chars: headlineRef.current!.querySelectorAll('.char'),
        lines: headlines
      };
    };
    
    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(".headline-part, .char");
    
    // Split the text
    const { chars, lines } = splitText();
    
    // Create timeline
    const tl = gsap.timeline({
      defaults: { 
        ease: "back.out(1.7)", 
        duration: 0.6 
      }
    });
    
    // Set initial state - hide everything
    gsap.set(chars, { 
      opacity: 0,
      y: 40,
      rotationX: -90,
      transformOrigin: "0% 50% -50"
    });
    
    // Apply special styles to the "Promptly AI" line (assuming it's the last line)
    const lastLineChars = lines[lines.length - 1].querySelectorAll('.char');
    
    // Apply vibrant animations in sequence
    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      stagger: 0.02,
      ease: "back.out(1.7)",
      duration: 0.8,
      onComplete: () => {
        // Add a subtle hover effect after animation completes
        gsap.to(lastLineChars, {
          keyframes: [
            { y: -3, duration: 0.3, ease: "power1.inOut" },
            { y: 0, duration: 0.3, ease: "power1.inOut" }
          ],
          repeat: -1,
          repeatDelay: 3,
          delay: 1
        });
      }
    });
    
    // Cleanup function
    return () => {
      gsap.killTweensOf(".headline-part, .char");
    };
    
  }, []);
  
  return (
    <>
      {/* Main Headline with improved structure for animation */}
      <h1 
        ref={headlineRef}
        className={`${calSans.className} text-7xl sm:text-7xl md:text-9xl font-extrabold tracking-wide mb-8 relative`}
        style={{ perspective: "1000px" }}  // Enable 3D perspective for better animation
      >
        {/* Fixed structure with proper font styles - spans must be inside h1 */}
        <span className="headline-part block text-black">Simplify your workflow</span>
        <span className="headline-part block text-black">with</span>
        
        {/* Fixed gradient text implementation */}
        <span 
          className="headline-part block"
          style={{
            background: "linear-gradient(to bottom, #ffd319, #ff2975, #8c1eff)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            display: "block",
            width: "100%"
          }}
        >
          Promptly AI
        </span>
      </h1>

      {/* CTA Button */}
      <button className="bg-fuchsia-600 text-white text-lg font-semibold mt-6 md:mt-12 px-8 py-4 rounded-lg shadow-gentle hover:bg-sky-blue-darker hover:shadow-gentle-lift transform hover:scale-105 transition-all duration-300 ease-in-out animate-in focus:outline-none focus:ring-2 focus:ring-sky-blue focus:ring-opacity-50">
        Get Started
      </button>
    </>
  );
};

export default HeroContent;
