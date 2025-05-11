"use client"

import type React from "react"

import { useState, useRef } from "react"

export default function GenerativeAIVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Handle mouse movement to calculate tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2

    // Determine if mouse is on left or right side
    const isRightSide = e.clientX > centerX

    // Set rotation based on which side is being hovered
    if (isRightSide) {
      setRotation({ x: 0, y: -45 }) // Tilt left when hovering right side
    } else {
      setRotation({ x: 0, y: 45 }) // Tilt right when hovering left side
    }
  }

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
  }

  // Set hovering state when mouse enters
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transform-style-3d transition-transform duration-300"
        style={{
          transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : "rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Website Builder with AI SVG */}
        <svg
          width="400"
          height="320"
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Browser Window Frame */}
          <rect x="40" y="20" width="320" height="220" rx="8" fill="white" stroke="#E0E0E0" strokeWidth="2" />

          {/* Browser Header */}
          <rect x="40" y="20" width="320" height="30" rx="8" fill="#F5F5F5" />
          <circle cx="60" cy="35" r="5" fill="#FF6B6B" />
          <circle cx="80" cy="35" r="5" fill="#FFD166" />
          <circle cx="100" cy="35" r="5" fill="#06D6A0" />

          {/* URL Bar */}
          <rect x="120" y="27.5" width="220" height="15" rx="7.5" fill="white" stroke="#E0E0E0" strokeWidth="1" />

          {/* Website Content */}
          <rect
            x="60"
            y="70"
            width="120"
            height="20"
            rx="4"
            fill="#FF8E53"
            opacity="0.8"
            className="animate-pulse-slow"
          />
          <rect x="60" y="100" width="180" height="10" rx="2" fill="#EAEAEA" />
          <rect x="60" y="120" width="160" height="10" rx="2" fill="#EAEAEA" />
          <rect x="60" y="140" width="140" height="10" rx="2" fill="#EAEAEA" />

          {/* AI Elements */}
          <circle cx="280" cy="110" r="30" fill="url(#gradientMain)" className="animate-pulse-slow" />

          {/* Connecting Nodes */}
          <g className="animate-float">
            <circle cx="240" cy="90" r="10" fill="#FF6B6B" opacity="0.8" />
            <path d="M250 90L270 100" stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          <g className="animate-float-slow">
            <circle cx="250" cy="140" r="8" fill="#FF8E53" opacity="0.8" />
            <path d="M258 140L270 120" stroke="#FF8E53" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          <g className="animate-float">
            <circle cx="310" cy="90" r="6" fill="#FF6B6B" opacity="0.8" />
            <path d="M304 90L290 100" stroke="#FF6B6B" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          <g className="animate-float-slow">
            <circle cx="320" cy="130" r="8" fill="#FF8E53" opacity="0.8" />
            <path d="M312 130L290 120" stroke="#FF8E53" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>

          {/* AI Generated Elements */}
          <g className="animate-float">
            <path d="M280 140L280 170" stroke="#FF8E53" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect
              x="240"
              y="170"
              width="80"
              height="50"
              rx="4"
              fill="#FF8E53"
              opacity="0.1"
              stroke="#FF8E53"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <rect x="250" y="180" width="60" height="8" rx="2" fill="#FF8E53" opacity="0.6" />
            <rect x="250" y="195" width="40" height="6" rx="2" fill="#FF8E53" opacity="0.4" />
            <rect x="250" y="207" width="50" height="6" rx="2" fill="#FF8E53" opacity="0.4" />
          </g>

          {/* Small Particles */}
          <circle cx="230" cy="70" r="3" fill="#FF6B6B" className="animate-pulse-fast" />
          <circle cx="320" cy="80" r="2" fill="#FF8E53" className="animate-pulse-fast" />
          <circle cx="330" cy="120" r="3" fill="#FF6B6B" className="animate-pulse-fast" />
          <circle cx="310" cy="160" r="2" fill="#FF8E53" className="animate-pulse-fast" />
          <circle cx="240" cy="150" r="3" fill="#FF6B6B" className="animate-pulse-fast" />

          {/* Code Elements */}
          <g transform="translate(60, 170)">
            <rect width="140" height="50" rx="4" fill="#F8F9FA" stroke="#E0E0E0" strokeWidth="1" />
            <rect x="10" y="10" width="40" height="6" rx="2" fill="#FF6B6B" opacity="0.6" />
            <rect x="55" y="10" width="20" height="6" rx="2" fill="#EAEAEA" />
            <rect x="80" y="10" width="30" height="6" rx="2" fill="#EAEAEA" />
            <rect x="10" y="22" width="30" height="6" rx="2" fill="#FF8E53" opacity="0.6" />
            <rect x="45" y="22" width="50" height="6" rx="2" fill="#EAEAEA" />
            <rect x="10" y="34" width="60" height="6" rx="2" fill="#EAEAEA" />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradientMain" x1="250" y1="80" x2="310" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B6B" />
              <stop offset="1" stopColor="#FF8E53" />
            </linearGradient>

            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B6B" />
              <stop offset="1" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
        </svg>

        {/* Background glow effect */}
        <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full"></div>
      </div>

      {/* Instruction text */}
      <div className="absolute bottom-0 text-center text-sm text-black/50">
        Hover over left or right side to see the tilt effect
      </div>
    </div>
  )
}
