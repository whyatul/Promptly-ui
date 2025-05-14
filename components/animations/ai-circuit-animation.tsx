"use client";

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Node {
  x: number;
  y: number;
  connections: number[];
  pulseDelay: number;
  size: number;
  type: 'input' | 'hidden' | 'output';
}

interface AICircuitAnimationProps {
  width?: number;
  height?: number;
  nodeCount?: number;
  className?: string;
  density?: number;
  animated?: boolean;
}

const AICircuitAnimation: React.FC<AICircuitAnimationProps> = ({
  width = 600,
  height = 400,
  nodeCount = 25,
  className = '',
  density = 0.3, // 0 to 1, how densely connected
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const currentTimeRef = useRef<number>(0);
  
  // Helper function to generate circuit board dots/patterns
  const generateCircuitPatterns = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    
    // Draw circuit dots
    const dotSpacing = 20;
    const rows = Math.floor(height / dotSpacing);
    const cols = Math.floor(width / dotSpacing);
    
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Skip some dots randomly for a more organic look
        if (Math.random() > 0.7) continue;
        
        const x = c * dotSpacing;
        const y = r * dotSpacing;
        
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Draw some circuit paths
    ctx.strokeStyle = 'rgba(255,142,83,0.1)';
    ctx.lineWidth = 1;
    
    const pathCount = Math.floor(width / 100);
    
    for (let i = 0; i < pathCount; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      let currentX = startX;
      let currentY = startY;
      
      // Create 3-5 segments per path
      const segments = Math.floor(Math.random() * 3) + 3;
      
      for (let s = 0; s < segments; s++) {
        // 50% chance to go horizontal or vertical
        if (Math.random() > 0.5) {
          currentX = Math.random() * width;
          ctx.lineTo(currentX, currentY);
        } else {
          currentY = Math.random() * height;
          ctx.lineTo(currentX, currentY);
        }
      }
      
      ctx.stroke();
    }
    
    ctx.restore();
  };
  
  // Generate node connections
  const connectNodes = (nodes: Node[], density: number): Node[] => {
    // For each node, connect to some other nodes
    nodes.forEach((node, idx) => {
      const connectionCount = Math.floor(Math.random() * 5) + 1; // 1-5 connections
      
      for (let i = 0; i < connectionCount; i++) {
        // Find a target node that isn't self and isn't already connected
        let attempts = 0;
        while (attempts < 10) { // Limit attempts to prevent infinite loop
          const targetIdx = Math.floor(Math.random() * nodes.length);
          
          // Don't connect to self and ensure probability based on density
          if (targetIdx !== idx && Math.random() < density && !node.connections.includes(targetIdx)) {
            node.connections.push(targetIdx);
            break;
          }
          attempts++;
        }
      }
    });
    
    return nodes;
  };
  
  // Initialize nodes
  const initializeNodes = (width: number, height: number, count: number): Node[] => {
    const nodes: Node[] = [];
    
    // Add input nodes (left side)
    const inputCount = Math.floor(count * 0.2);
    for (let i = 0; i < inputCount; i++) {
      nodes.push({
        x: width * 0.15,
        y: (i + 1) * (height / (inputCount + 1)),
        connections: [],
        pulseDelay: Math.random() * 5,
        size: Math.random() * 2 + 6,
        type: 'input'
      });
    }
    
    // Add hidden layer nodes (middle)
    const hiddenCount = Math.floor(count * 0.6);
    for (let i = 0; i < hiddenCount; i++) {
      nodes.push({
        x: width * (0.3 + Math.random() * 0.4), // Randomly distribute in middle section
        y: Math.random() * height,
        connections: [],
        pulseDelay: Math.random() * 5,
        size: Math.random() * 2 + 4,
        type: 'hidden'
      });
    }
    
    // Add output nodes (right side)
    const outputCount = Math.floor(count * 0.2);
    for (let i = 0; i < outputCount; i++) {
      nodes.push({
        x: width * 0.85,
        y: (i + 1) * (height / (outputCount + 1)),
        connections: [],
        pulseDelay: Math.random() * 5,
        size: Math.random() * 2 + 6,
        type: 'output'
      });
    }
    
    return connectNodes(nodes, density);
  };
  
  // Draw the network
  const drawNetwork = (
    ctx: CanvasRenderingContext2D, 
    nodes: Node[], 
    time: number, 
    width: number, 
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background with subtle circuit pattern
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0, 0, width, height);
    generateCircuitPatterns(ctx, width, height);
    
    // Draw connections first (so they're behind nodes)
    nodes.forEach((node, idx) => {
      node.connections.forEach(targetIdx => {
        const target = nodes[targetIdx];
        
        // Calculate the pulse position along the line
        const pulseSpeed = 0.5; // Higher = faster pulses
        const pulsePhase = (time + node.pulseDelay) * pulseSpeed % 1;
        
        // Line coordinates
        const startX = node.x;
        const startY = node.y;
        const endX = target.x;
        const endY = target.y;
        
        // Pulse coordinates along the line
        const pulseX = startX + (endX - startX) * pulsePhase;
        const pulseY = startY + (endY - startY) * pulsePhase;
        
        // Draw the connection line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Only draw pulses if animation is enabled
        if (animated) {
          // Draw the pulse
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 142, 83, 0.8)';
          ctx.fill();
          
          // Draw a glow around the pulse
          const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
          gradient.addColorStop(0, 'rgba(255, 142, 83, 0.4)');
          gradient.addColorStop(1, 'rgba(255, 142, 83, 0)');
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
    });
    
    // Draw nodes
    nodes.forEach(node => {
      // For animated nodes, calculate the pulse effect
      let nodeSize = node.size;
      let alpha = 0.7;
      
      if (animated) {
        // Make nodes pulse subtly
        const pulseFactor = Math.sin((time + node.pulseDelay) * 2) * 0.15 + 1;
        nodeSize *= pulseFactor;
        alpha = 0.5 + pulseFactor * 0.3;
      }
      
      // Colors based on node type
      let nodeColor: string;
      switch (node.type) {
        case 'input':
          nodeColor = `rgba(255, 107, 107, ${alpha})`;
          break;
        case 'output':
          nodeColor = `rgba(255, 142, 83, ${alpha})`;
          break;
        default:
          nodeColor = `rgba(153, 64, 255, ${alpha})`;
      }
      
      // Draw the node
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      
      // Draw a glow effect
      if (animated) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 2);
        gradient.addColorStop(0, `rgba(255, 107, 107, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    });
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Initialize nodes
    nodesRef.current = initializeNodes(width, height, nodeCount);
    
    // Animation function
    const animate = (timestamp: number) => {
      if (!animated) {
        drawNetwork(ctx, nodesRef.current, 0, width, height);
        return;
      }
      
      // Convert to seconds
      const time = timestamp / 1000;
      currentTimeRef.current = time;
      
      drawNetwork(ctx, nodesRef.current, time, width, height);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    if (animated) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      drawNetwork(ctx, nodesRef.current, 0, width, height);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, height, nodeCount, width, density]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width, height }}
    />
  );
};

export default AICircuitAnimation; 