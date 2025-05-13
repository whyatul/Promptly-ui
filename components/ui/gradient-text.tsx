"use client";

import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  const defaultGradient = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500";
  
  return (
    <span className={`${defaultGradient} bg-clip-text text-transparent ${className || ''}`}>
      {children}
    </span>
  );
};
