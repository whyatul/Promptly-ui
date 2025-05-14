"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'code' | 'ui' | 'dot';
  vx: number;
  vy: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const codeSnippets = [
  '<div>',
  '</div>',
  '<Button>',
  '<Nav>',
  'function()',
  'import React',
  '<App />',
  'useState()',
  'AI.build()',
  'GPT.render()',
  '{ data }',
  'async()',
  '.then()',
  'export default',
];

const uiElements = [
  '□', '■', '○', '●', '◇', '◆', '△', '▲', '▽', '▼', '◁', '◀', '▷', '▶'
];

const AIParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.current = [];
      const count = Math.min(window.innerWidth / 10, 50); // responsive count based on screen size
      
      for (let i = 0; i < count; i++) {
        const type = Math.random() > 0.8 
          ? 'code' 
          : Math.random() > 0.5 
            ? 'ui' 
            : 'dot';
            
        const randomColor = () => {
          const colors = ['#FF6B6B', '#FF8E53', '#FF5E99', '#9940FF'];
          return colors[Math.floor(Math.random() * colors.length)];
        };
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: type === 'dot' ? Math.random() * 4 + 2 : Math.random() * 12 + 10,
          color: randomColor(),
          type,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Apply position and rotation
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        if (particle.type === 'code') {
          // Draw code snippet text
          const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          ctx.font = `${particle.size}px monospace`;
          ctx.fillStyle = particle.color;
          ctx.fillText(text, 0, 0);
        } else if (particle.type === 'ui') {
          // Draw UI element
          const element = uiElements[Math.floor(Math.random() * uiElements.length)];
          ctx.font = `${particle.size * 1.5}px sans-serif`;
          ctx.fillStyle = particle.color;
          ctx.fillText(element, 0, 0);
        } else {
          // Draw dot
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        ctx.restore();
      });
    };

    const update = () => {
      frame.current++;
      
      // Update particles
      particles.current.forEach(particle => {
        // Move
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rotate
        particle.rotation += particle.rotationSpeed;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }
        
        // Gradually change opacity for pulsing effect
        const opacityChange = Math.sin(frame.current * 0.01) * 0.1;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity + opacityChange * 0.01));
      });
      
      draw();
      requestAnimationFrame(update);
    };

    // Initialize
    resizeCanvas();
    createParticles();
    update();

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AIParticleEffect; 