"use client";

import React, { useEffect, useRef } from 'react';

const GenerativeAIVisual: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    
    const createFloatingElements = () => {
      // Clear previous elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
   
      for (let i = 0; i < 8; i++) {
        const el = document.createElement('div');
        
        // Randomize properties
        const size = Math.floor(Math.random() * 60) + 40; // 40-100px
        const x = Math.floor(Math.random() * 80) + 10; // 10-90%
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15; // 15-25s
        const hue = Math.floor(Math.random() * 30) + 15; // orangish
        
      
        el.style.position = 'absolute';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${x}%`;
        el.style.bottom = '-20%';
        el.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.2)`;
        el.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
        el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        el.style.zIndex = '1';
        el.style.backdropFilter = 'blur(3px)';
        
        container.appendChild(el);
      }
    };
    
    createFloatingElements();
    if (!document.querySelector('#float-animation')) {
      const style = document.createElement('style');
      style.id = 'float-animation';
      style.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-150px) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-300px) rotate(360deg);
            opacity: 0.1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // Clean up
      const style = document.querySelector('#float-animation');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return (
    <div className="relative h-96 md:h-[500px] w-full flex items-center justify-center">
      <div ref={canvasRef} className="absolute inset-0 overflow-hidden"></div>
      
    
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        {/* Browser bar */}
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
        
        <div className="p-4 bg-gradient-to-br from-[#FDF6ED] to-white min-h-[300px]">
          <div className="w-full h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-md mb-3"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded-sm mb-3"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded-sm mb-3"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded-sm mb-5"></div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]"></div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-md"></div>
            <div className="aspect-video bg-gray-100 rounded-md"></div>
            <div className="aspect-video bg-gray-100 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIVisual;
