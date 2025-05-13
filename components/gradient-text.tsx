import type React from "react"
interface GradientTextProps {
  children: React.ReactNode
}

export function GradientText({ children }: GradientTextProps) {
  return (
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-500 to-orange-500 font-bold">
      {children}
    </span>
  )
}
