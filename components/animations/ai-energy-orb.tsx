"use client";

import React, { useEffect, useRef } from 'react';

interface AIEnergyOrbProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  intensity?: 'low' | 'medium' | 'high';
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

const positionClasses = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

const intensitySettings = {
  'low': { blur: '100px', opacity: 0.3, animationSpeed: 'slow' },
  'medium': { blur: '120px', opacity: 0.5, animationSpeed: 'normal' },
  'high': { blur: '150px', opacity: 0.7, animationSpeed: 'fast' },
};

const AIEnergyOrb: React.FC<AIEnergyOrbProps> = ({
  size = 300,
  position = 'center',
  intensity = 'medium',
  primaryColor = '#FF6B6B',
  secondaryColor = '#FF8E53',
  className = '',
}) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const particles = particlesRef.current;
    if (!orb || !particles) return;

    // Create random particles around the orb
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      
      // Random particle properties
      const particleSize = Math.random() * 6 + 2;
      const distance = (Math.random() * size * 0.7) + (size * 0.3);
      const angle = Math.random() * 360;
      const x = Math.cos(angle * Math.PI / 180) * distance;
      const y = Math.sin(angle * Math.PI / 180) * distance;
      const animationDuration = Math.random() * 4 + 3;
      const animationDelay = Math.random() * 2;
      
      // Style the particle
      particle.className = 'absolute rounded-full';
      particle.style.width = `${particleSize}px`;
      particle.style.height = `${particleSize}px`;
      particle.style.background = Math.random() > 0.5 ? primaryColor : secondaryColor;
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      particle.style.transform = `translate(${x}px, ${y}px)`;
      particle.style.animation = `aiOrbParticleFloat ${animationDuration}s infinite ease-in-out ${animationDelay}s`;
      
      particles.appendChild(particle);
    }

    // Create pulsing animation
    const speeds = {
      slow: 8,
      normal: 5,
      fast: 3,
    };
    
    const animationSpeed = speeds[intensitySettings[intensity].animationSpeed as keyof typeof speeds];
    
    // Add keyframes dynamically
    if (!document.querySelector('#ai-orb-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ai-orb-keyframes';
      style.textContent = `
        @keyframes aiOrbPulse {
          0% { transform: scale(0.9); opacity: ${intensitySettings[intensity].opacity * 0.7}; }
          50% { transform: scale(1.05); opacity: ${intensitySettings[intensity].opacity}; }
          100% { transform: scale(0.9); opacity: ${intensitySettings[intensity].opacity * 0.7}; }
        }
        
        @keyframes aiOrbGlow {
          0% { filter: blur(${parseInt(intensitySettings[intensity].blur) * 0.8}px); }
          50% { filter: blur(${intensitySettings[intensity].blur}); }
          100% { filter: blur(${parseInt(intensitySettings[intensity].blur) * 0.8}px); }
        }
        
        @keyframes aiOrbParticleFloat {
          0% { transform: translate(var(--x), var(--y)) scale(0.8); opacity: var(--base-opacity); }
          50% { transform: translate(calc(var(--x) * 1.1), calc(var(--y) * 1.1)) scale(1.2); opacity: calc(var(--base-opacity) * 1.5); }
          100% { transform: translate(var(--x), var(--y)) scale(0.8); opacity: var(--base-opacity); }
        }
      `;
      document.head.appendChild(style);
    }

    // Apply animations
    orb.style.animation = `aiOrbPulse ${animationSpeed}s infinite ease-in-out, aiOrbGlow ${animationSpeed * 1.2}s infinite ease-in-out`;
    
    return () => {
      const style = document.querySelector('#ai-orb-keyframes');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [size, intensity, primaryColor, secondaryColor]);

  return (
    <div className={`fixed ${positionClasses[position]} pointer-events-none z-0 ${className}`}>
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        {/* Orb */}
        <div 
          ref={orbRef}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${primaryColor} 0%, ${secondaryColor} 70%, transparent 100%)`,
            opacity: intensitySettings[intensity].opacity,
            filter: `blur(${intensitySettings[intensity].blur})`,
          }}
        ></div>
        
        {/* Particles container */}
        <div 
          ref={particlesRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
        ></div>
      </div>
    </div>
  );
};

export default AIEnergyOrb; 