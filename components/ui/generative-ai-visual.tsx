"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const GenerativeAIVisual: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [buildPhase, setBuildPhase] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [components, setComponents] = useState<string[]>([]);
  
  // Code snippets that will "type" in sequence
  const codeSnippets = [
    "<div className='hero'>",
    "  <h1>Welcome to our site</h1>",
    "  <p>Built with AI assistance</p>",
    "</div>",
    "// Adding navigation component",
    "function Navbar() {",
    "  return (",
    "    <nav className='flex items-center'>",
    "      <Logo />",
    "      <Menu items={navItems} />",
    "    </nav>",
    "  )",
    "}",
  ];
  
  // UI components that will appear as the AI "builds" them
  const uiComponents = [
    "Navbar",
    "Hero Section",
    "Features Grid",
    "Testimonials",
    "Contact Form",
    "Footer"
  ];
  
  useEffect(() => {
    // Start the build animation sequence
    const buildTimer = setTimeout(() => {
      const buildInterval = setInterval(() => {
        setBuildPhase(prev => {
          const newPhase = prev + 1;
          if (newPhase >= 4) clearInterval(buildInterval);
          return newPhase;
        });
      }, 2000);
      
      return () => clearInterval(buildInterval);
    }, 500);
    
    return () => clearTimeout(buildTimer);
  }, []);
  
  // Add code lines one by one with a typing effect
  useEffect(() => {
    if (buildPhase >= 1) {
      const codeInterval = setInterval(() => {
        setCodeLines(prev => {
          if (prev.length >= codeSnippets.length) {
            clearInterval(codeInterval);
            return prev;
          }
          return [...prev, codeSnippets[prev.length]];
        });
      }, 700);
      
      return () => clearInterval(codeInterval);
    }
  }, [buildPhase]);
  
  // Add UI components one by one
  useEffect(() => {
    if (buildPhase >= 2) {
      const componentInterval = setInterval(() => {
        setComponents(prev => {
          if (prev.length >= uiComponents.length) {
            clearInterval(componentInterval);
            return prev;
          }
          return [...prev, uiComponents[prev.length]];
        });
      }, 800);
      
      return () => clearInterval(componentInterval);
    }
  }, [buildPhase]);
  
  useEffect(() => {
    const container = canvasRef.current;
    const mockup = mockupRef.current;
    
    if (!container || !mockup) return;
    
    // Clear any existing floating elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create floating elements with the consistent orange/coral color scheme
    for (let i = 0; i < 15; i++) {
      const el = document.createElement('div');
      
      const size = Math.floor(Math.random() * 70) + 30;
      const x = Math.floor(Math.random() * 80) + 10;
      const delay = Math.random() * 4;
      const duration = Math.random() * 8 + 10;
      
      // Use the consistent gradient colors with varied opacity
      const colorIndex = Math.floor(Math.random() * 2); // Keep only 2 variants for consistency
      let hue, saturation, lightness;
      
      switch (colorIndex) {
        case 0: // Coral (#FF6B6B)
          hue = Math.floor(Math.random() * 5) + 0;
          saturation = 90;
          lightness = 65;
          break;
        case 1: // Orange (#FF8E53)
          hue = Math.floor(Math.random() * 10) + 20;
          saturation = 95;
          lightness = 60;
          break;
      }
      
      const opacity = Math.random() * 0.25 + 0.1; // 0.1-0.35
      
      el.style.position = 'absolute';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${x}%`;
      el.style.bottom = '-20%';
      el.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      el.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
      el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      el.style.zIndex = '1';
      el.style.filter = 'blur(5px)';
      
      container.appendChild(el);
    }
    
    // Apply improved initial animation to the mockup
    gsap.fromTo(mockup, 
      { 
        y: 30, 
        opacity: 0,
        scale: 0.95,
        rotationY: -5
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2, 
        ease: "power3.out",
        delay: 0.2
      }
    );
    
    // Add smooth hover animation for the mockup
    const mockupHoverEffect = () => {
      gsap.to(mockup, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    };
    
    setTimeout(mockupHoverEffect, 1000);
    
    // Create shimmer effect on the browser mockup
    const addShimmerEffect = () => {
      const shimmer = document.createElement('div');
      shimmer.className = 'absolute inset-0 animate-shimmer overflow-hidden opacity-70';
      shimmer.style.borderRadius = 'inherit';
      mockup.appendChild(shimmer);
    };
    
    addShimmerEffect();
    
    // Create enhanced float animation style
    if (!document.querySelector('#float-animation')) {
      const style = document.createElement('style');
      style.id = 'float-animation';
      style.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-180px) rotate(180deg) scale(1.1);
            opacity: 0.25;
          }
          100% {
            transform: translateY(-350px) rotate(360deg) scale(0.9);
            opacity: 0.1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.querySelector('#float-animation');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <div className="relative h-96 md:h-[480px] w-full flex items-center justify-center">
      <div ref={canvasRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* AI building indicator */}
      {buildPhase === 0 && (
        <div className="absolute top-5 left-6 md:left-12 z-20 flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] animate-ai-thinking"></div>
          <div className="text-[#FF6B6B] text-sm font-medium">AI thinking...</div>
        </div>
      )}
      
      {buildPhase >= 1 && (
        <div className="absolute top-5 left-6 md:left-12 z-20 flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]"></div>
          <div className="text-[#FF6B6B] text-sm font-medium">AI building website...</div>
        </div>
      )}
      
      <div ref={mockupRef} className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform-gpu">
        {/* Browser chrome */}
        <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="mx-auto px-4 py-1 bg-white rounded-full text-xs text-gray-500 flex items-center w-64">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            promptly.ui
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-[#FDF6ED] to-white min-h-[300px] flex">
          {/* Code editor panel - shows during build */}
          {buildPhase >= 1 && (
            <div className="w-1/2 bg-gray-900 text-gray-300 text-xs p-3 rounded-md overflow-hidden mr-2 font-mono h-[300px] opacity-90">
              {codeLines.map((line, index) => (
                <div 
                  key={index} 
                  className="animate-element-appear" 
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  {line}
                </div>
              ))}
              {codeLines.length > 0 && codeLines.length < codeSnippets.length && (
                <div className="h-4 w-2 bg-[#FF6B6B] inline-block animate-pulse ml-1"></div>
              )}
            </div>
          )}
          
          {/* Website preview panel */}
          <div className={`${buildPhase >= 1 ? 'w-1/2' : 'w-full'} bg-white rounded-md relative overflow-hidden`}>
            {/* AI Generated components */}
            <div className="h-full flex flex-col">
              {buildPhase >= 2 && (
                <div className="animate-website-build">
                  {/* UI components being built */}
                  <div className="w-full h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] mb-3 rounded-t-md flex items-center px-2">
                    <div className="w-3 h-3 rounded-full bg-white mr-1 opacity-80"></div>
                    <div className="text-white text-xs font-medium">Navigation</div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 p-2">
                    {components.map((component, index) => (
                      <div 
                        key={index}
                        className="animate-component-drop bg-gray-100 rounded-md p-2 text-xs flex items-center"
                        style={{animationDelay: `${index * 0.3}s`}}
                      >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] mr-2"></div>
                        {component}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {buildPhase >= 3 && (
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white text-xs px-2 py-1 rounded">
                  Website Ready
                </div>
              )}
            </div>
            
            {/* Initial content shown before build starts */}
            {buildPhase === 0 && (
              <>
                <div className="w-full h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-md mb-3 animate-gradient"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded-sm mb-3"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded-sm mb-3"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded-sm mb-5"></div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden animate-shimmer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] animate-pulse absolute"></div>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden animate-shimmer"></div>
                  <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden animate-shimmer"></div>
                  <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden animate-shimmer"></div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* AI floating elements */}
        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-10 blur-lg animate-float"></div>
        
        {buildPhase >= 3 && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-10 animate-shimmer"></div>
        )}
      </div>
    </div>
  );
};

export default GenerativeAIVisual;
