"use client"

import { useEffect, useRef, useState } from "react"
import { CreditCard } from "@/components/ui/credit-card" 
import { GradientText } from "@/components/ui/gradient-text"
import gsap from "gsap"

export default function PaymentSection() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const cardBaseWidth = 320;
  const cardBaseHeight = 200;

  const scaleCard1 = 1.05; 
  const scaleCard2 = 1.15;  
  const scaleCard3 = 1.1; 

  const stackOffsetX = 5;
  const stackOffsetY = 8;
  
  const centerX = 200; 
  const centerY = 250;

  useEffect(() => {
    if (!cardsRef.current) return;
    
    const cards = cardsRef.current.querySelectorAll(".credit-card");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.set(cards, { 
      opacity: 0, 
      scale: 0.8, 
      rotationY: -15,
      transformOrigin: "center center -50px",
      filter: "blur(10px)"
    });
    
    tl.to(cards, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      stagger: 0.15,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "elastic.out(1, 0.8)",
      onComplete: () => {
        cards.forEach((card, index) => {
          const element = card as HTMLElement;
          gsap.to(element, {
            y: `${Math.sin(index) * 10}px`,
            rotateZ: index % 2 === 0 ? "2deg" : "-2deg",
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsRef.current) return;
      
      const rect = cardsRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };
    
    const container = cardsRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', () => setIsHovering(true));
    container.addEventListener('mouseleave', () => setIsHovering(false));
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', () => setIsHovering(true));
      container.removeEventListener('mouseleave', () => setIsHovering(false));
      gsap.killTweensOf(cards);
    };
  }, []);

  const getTiltTransform = (intensity: number) => {
    if (!isHovering) return '';
    
    const rotateX = -mousePosition.y * 10 * intensity;
    const rotateY = mousePosition.x * 15 * intensity;
    const translateZ = 50 * Math.abs(mousePosition.x * mousePosition.y) * intensity;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-16 md:py-24 lg:py-32 animate-in bg-promptly-background text-promptly-foreground overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      
        <div 
          className="w-full lg:w-1/2 relative h-[550px] md:h-[650px] perspective-1000 cursor-pointer" 
          ref={cardsRef}
          style={{ perspective: "1500px" }}
        >
          <div className="absolute credit-card transition-all duration-500 ease-out will-change-transform">
            <CreditCard
              color="#FFD700"
              secondaryColor="#FFA500"
              rotation={isHovering ? "0deg" : "-6deg"}
              scale={scaleCard1}
              zIndex={3}
              offsetX={`${centerX - stackOffsetX}px`} 
              offsetY={`${centerY - stackOffsetY}px`}
              customTransform={getTiltTransform(0.7)}
            />
          </div>
          <div className="absolute credit-card transition-all duration-500 ease-out will-change-transform">
            <CreditCard
              color="#9370DB"
              secondaryColor="#8A2BE2"
              rotation={isHovering ? "0deg" : "4deg"}
              scale={scaleCard2}
              zIndex={2}
              offsetX={`${centerX}px`} 
              offsetY={`${centerY}px`}
              customTransform={getTiltTransform(1)}
            />
          </div>
          <div className="absolute credit-card transition-all duration-500 ease-out will-change-transform">
            <CreditCard
              color="#FF7F50"
              secondaryColor="#FF6347"
              rotation={isHovering ? "0deg" : "-2deg"}
              scale={scaleCard3}
              zIndex={1}
              offsetX={`${centerX + stackOffsetX}px`}  
              offsetY={`${centerY + stackOffsetY}px`}
              customTransform={getTiltTransform(1.3)}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-promptly-heading "
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
          >
            Pay on the <GradientText>Go</GradientText>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-promptly-foreground/70">Seamless payments for the modern world</h2>
          <p className="text-promptly-foreground/90 text-lg leading-relaxed">
            Experience the freedom of making payments anywhere, anytime. Our secure platform lets you manage all your
            cards in one place, with <GradientText>instant transactions</GradientText> and real-time notifications. Say
            goodbye to the hassle of traditional banking.
          </p>
          <p className="text-promptly-foreground/90 text-lg leading-relaxed">
            With our <GradientText>advanced security</GradientText> features and user-friendly interface, managing your
            finances has never been easier or more convenient.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-purple-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
