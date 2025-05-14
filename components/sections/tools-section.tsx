"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import CategoryCard from "./category-card"
import FlippableToolCard from "./flippable-tool-card"
import { toolCategories } from "@/data/tool-categories"

export default function ToolsSection() {
  const [activeSection, setActiveSection] = useState<string>("general")
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for card animations
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Pre-calculate spring configurations and offsets outside the map function
  const springConfig = { damping: 15, stiffness: 150 }
  const xOffsets = toolCategories.map((category, index) => {
    return useSpring(mouseX, {
      damping: springConfig.damping,
      stiffness: springConfig.stiffness,
      restDelta: 0.001,
    })
  })

  const yOffsets = toolCategories.map((category, index) => {
    return useSpring(mouseY, {
      damping: springConfig.damping,
      stiffness: springConfig.stiffness,
      restDelta: 0.001,
    });
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const { top } = container.getBoundingClientRect();
      mouseX.set(e.clientX);
      mouseY.set(e.clientY - top);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      // Find the current section based on scroll position
      for (const category of toolCategories) {
        const element = sectionsRef.current[category.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(category.id)
            break
          }
        }
      }
    }
    // Removed invalid code
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section when card is clicked
  const scrollToSection = (id: string) => {
    const element = sectionsRef.current[id]
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Group tools by type within each category
  const getToolGroups = (categoryId: string) => {
    const category = toolCategories.find((cat) => cat.id === categoryId)
    if (!category) return []

    // Simple grouping logic - group by first word or specific prefixes
    const groups: { [key: string]: typeof category.tools } = {}

    category.tools.forEach((tool) => {
      // Extract group name from tool name (first word or before hyphen)
      let groupName = tool.name.split(" ")[0]

      // Special cases for specific tool types
      if (tool.name.includes("Generator")) groupName = "Generator"
      if (tool.name.includes("AI")) groupName = "AI"
      if (tool.name.includes("Planner")) groupName = "Planner"
      if (tool.name.includes("Checker")) groupName = "Checker"

      // Initialize group if it doesn't exist
      if (!groups[groupName]) {
        groups[groupName] = []
      }

      // Add tool to group
      groups[groupName].push(tool)
    })

    // Convert to array format for rendering
    return Object.entries(groups).map(([name, tools]) => ({
      name,
      tools,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-16">
        Our{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Powerful
        </span>{" "}
        Tools
      </h1>

      <div className="flex flex-col lg:flex-row">
        {/* Left side - Scrollable content */}
        <div className="lg:w-1/2 pr-4">
          <div className="prose max-w-none mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">Discover Our Suite of AI-Powered Tools</h2>
            <p className="text-gray-700 mb-6">
              Our platform offers a comprehensive collection of AI tools designed to enhance productivity, creativity,
              and efficiency across various domains. From general-purpose assistants to specialized tools for education,
              writing, design, marketing, healthcare, social media, legal, and finance - we have everything you need to
              succeed.
            </p>
            <p className="text-gray-700 mb-6">
              Each tool is meticulously crafted to deliver exceptional results while maintaining an intuitive user
              experience. Our AI models are trained on diverse datasets to ensure accuracy, relevance, and ethical
              performance.
            </p>
            <div className="mt-8">
              <button className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 hover:from-blue-600 hover:via-purple-600 hover:to-yellow-600 transition-all duration-300 shadow-md">
                Try All Tools
              </button>
            </div>
          </div>

          {/* Tool category sections */}
          {toolCategories.map((category) => {
            const toolGroups = getToolGroups(category.id)

            return (
              <div
                key={category.id}
                id={category.id}
                ref={(el) => {
                  if (el) sectionsRef.current[category.id] = el;
                }}
                className="mt-24 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500" />
                  <h3 className="text-2xl font-bold text-black">{category.title}</h3>
                </div>
                <p className="text-black/70 mb-8 max-w-3xl">{category.description}</p>

                {/* Tool groups as flippable cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                  {toolGroups.map((group, index) => (
                    <FlippableToolCard
                      key={`${category.id}-${group.name}-${index}`}
                      title={group.name}
                      tools={group.tools}
                      icon={group.tools[0].icon}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right side - Fixed category cards */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="lg:w-1/3 lg:sticky flex-1 lg:top-24 lg:h-[calc(100vh-12rem)] self-start overflow-hidden p-2"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {toolCategories.map((category, index) => {
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isActive={activeSection === category.id}
                  onClick={() => scrollToSection(category.id)}
                  xOffset={xOffsets[index]}
                  yOffset={yOffsets[index]}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
