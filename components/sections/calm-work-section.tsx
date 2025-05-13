"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CalmWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.animate-item'), {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-promptly-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 
          className="animate-item font-calSans text-4xl md:text-5xl lg:text-6xl text-center mb-12 text-black font-bold" 
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          Calm work awaits
        </h1>

        <div className="animate-item rounded-2xl overflow-hidden mb-12">
          <div className="bg-gradient-to-br from-cream via-peach to-blue relative overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "url('/images/wave-pattern-red.svg')",
              backgroundSize: "cover",
              mixBlendMode: "multiply"
            }}></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Everything in your Whimsical workspace is connected.
              </h3>
              <p className=" text-lg leading-relaxed">
                Create links between files to craft a connected workspace. Use focus mode to zero in on what matters, 
                while always maintaining context with your broader work.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-item rounded-xl overflow-hidden shadow-gentle-lift mb-12">
          <Image
            src="/professional-team.png"
            alt="Whimsical workspace with flowchart diagrams"
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="animate-item bg-white rounded-xl p-6 md:p-8 shadow-gentle">
            <h4 className="text-2xl font-bold text-promptly-heading mb-4">Notifications done right</h4>
            <p className="text-promptly-foreground mb-6">
              Notifications that keep you in the loop without being distracting. 
              Real-time updates that respect your focus and bring clarity to your workflow.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/professional-team.png"
                alt="Notification panel with chat list"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="animate-item bg-white rounded-xl p-6 md:p-8 shadow-gentle">
            <h4 className="text-2xl font-bold text-promptly-heading mb-4">Say it better with Posts</h4>
            <p className="text-promptly-foreground mb-6">
              Use Posts for thoughtful, productive communication with your team. Format your ideas 
              beautifully and schedule posts for when your team needs them most.
            </p>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/professional-team.png"
                alt="Post settings panel with scheduling options"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
