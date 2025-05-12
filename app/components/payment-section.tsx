"use client"

import { useEffect, useRef } from "react"
import { CreditCard } from "@/app/components/credit-card"
import { GradientText } from "@/app/components/gradient-text"

export default function PaymentSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".credit-card")
    if (!cards) return

    // Set initial positions with different offsets
    cards.forEach((card, index) => {
      const element = card as HTMLElement
      element.style.transform = `translateY(${index * 10}px)`
      element.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left side - Credit Cards */}
        <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px]" ref={cardsRef}>
          <div className="absolute credit-card animate-float-slow">
            <CreditCard
              color="#FFD700"
              secondaryColor="#FFA500"
              rotation="-6deg"
              scale={0.9}
              zIndex={3}
              offsetX="-20px"
              offsetY="40px"
            />
          </div>
          <div className="absolute credit-card animate-float-medium">
            <CreditCard
              color="#9370DB"
              secondaryColor="#8A2BE2"
              rotation="4deg"
              scale={1}
              zIndex={2}
              offsetX="0px"
              offsetY="0px"
            />
          </div>
          <div className="absolute credit-card animate-float-fast">
            <CreditCard
              color="#FF7F50"
              secondaryColor="#FF6347"
              rotation="-2deg"
              scale={0.95}
              zIndex={1}
              offsetX="20px"
              offsetY="-40px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Pay on the <GradientText>Go</GradientText>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-black/70">Seamless payments for the modern world</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Experience the freedom of making payments anywhere, anytime. Our secure platform lets you manage all your
            cards in one place, with <GradientText>instant transactions</GradientText> and real-time notifications. Say
            goodbye to the hassle of traditional banking.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
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
