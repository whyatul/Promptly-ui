"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const texts = [
  "Enhance efficiency, accelerate growth, and transform your workflows using a fully integrated, AI-powered platform.",
  "Use Promptly to automate routine tasks, streamline content creation, manage operations, and unlock innovative opportunities across business, education, and personal productivity.",
  "From idea generation to execution, Promptly empowers teams and individuals to work smarter, faster, and more creatively.",
  "Use Promptly to replace multiple tools with one cohesive platform—saving time, reducing costs, and increasing productivity.",
  "Get inspired, get started, and get results—Promptly brings AI to your fingertips with zero complexity.",
];

const tools = [
  { icon: "✍️", name: "Writing Tool" },
  { icon: "📘", name: "Study Buddy" },
  { icon: "🎨", name: "Design Assistant" },
  { icon: "📣", name: "Marketing Helper" },
  { icon: "🩺", name: "Health Tracker" },
  { icon: "⚖️", name: "Legal Researcher" },
];

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeTool, setActiveTool] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Text animation logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visibleCount < texts.length) {
      timer = setTimeout(() => setVisibleCount((prev) => prev + 1), 2000);
    } else {
      timer = setTimeout(() => setVisibleCount(0), 5000);
    }
    return () => clearTimeout(timer);
  }, [visibleCount]);

  // Tool rotation logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTool((prev) => (prev + 1) % tools.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTool, isHovered]);

  return (
    <main className="min-h-screen bg-[#FDF6ED] relative font-sans p-10 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="max-w-9xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-bold text-black mb-6">
            An all-in-one suite of AI productivity and creative tools
          </h1>

          {texts.slice(0, visibleCount).map((text, index) => (
            <motion.p
              key={index}
              className="text-md text-gray-700 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        </div>



      {/* FLOATING TOOL GRID */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-1/2 right-10 transform -translate-y-1/2 w-[700px] h-[600px] rounded-2xl bg-[#FDF6ED] border border-gray-300 shadow-lg flex items-center justify-center transition-all z-10"
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? "0 0 24px rgba(0, 0, 0, 0.1)"
            : "0 0 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="grid grid-cols-3 gap-6 p-6">
          {tools.map((tool, index) => {
            const isVisible = isHovered || index === activeTool;
            return (
              <motion.div
  key={index}
  className={`w-50 h-50 flex flex-col items-center justify-center rounded-xl border-2 ${
    isVisible ? "border-[#8A2BE2]" : "border-gray-300"
  } bg-[#FDF6ED] shadow-md transition-all`}
  animate={{
    opacity: isVisible ? 1 : 0.6,
    scale: isVisible ? 1.1 : 1,
  }}
  transition={{ duration: 0.4, type: "spring" }}
  title={tool.name}
>
  <div className="text-5xl">{tool.icon}</div>
  <div className="text-sm mt-2 text-black font-medium text-center">
    {tool.name}
  </div>
</motion.div>

            );
          })}
        </div>
      </motion.div>
    </main>
  );
}