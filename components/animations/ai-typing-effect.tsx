"use client";

import React, { useState, useEffect, useRef } from 'react';

interface AITypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
  onComplete?: () => void;
  highlightWords?: string[];
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

const AITypingEffect: React.FC<AITypingEffectProps> = ({
  text,
  speed = 30,
  delay = 0,
  cursor = true,
  className = '',
  onComplete,
  highlightWords = [],
  tag: Tag = 'p',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textIndex = useRef(0);
  
  // Function to highlight specific words
  const highlightText = (text: string) => {
    if (highlightWords.length === 0) return text;
    
    let result = text;
    highlightWords.forEach(word => {
      // Case insensitive replace with span
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '<span class="text-gradient">$1</span>');
    });
    
    return result;
  };

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    textIndex.current = 0;
    setIsComplete(false);
    setIsTyping(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      
      // Start the typing effect
      intervalRef.current = setInterval(() => {
        if (textIndex.current < text.length) {
          textIndex.current += 1;
          setDisplayedText(text.substring(0, textIndex.current));
        } else {
          // Typing complete
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);
    
    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, delay, onComplete]);

  // Add a "thinking pause" randomly during typing to simulate AI thinking
  useEffect(() => {
    if (!isTyping || !intervalRef.current) return;
    
    // Random pauses while typing to simulate thinking
    const shouldPause = Math.random() > 0.9; // 10% chance
    
    if (shouldPause) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      
      // Pause typing briefly
      const pauseDuration = Math.random() * 300 + 100; // 100-400ms pause
      
      setTimeout(() => {
        // Resume typing
        intervalRef.current = setInterval(() => {
          if (textIndex.current < text.length) {
            textIndex.current += 1;
            setDisplayedText(text.substring(0, textIndex.current));
          } else {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsTyping(false);
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }, speed);
      }, pauseDuration);
    }
  }, [displayedText, isTyping, speed, text, onComplete]);

  // Base class for the cursor
  const cursorClass = cursor 
    ? `${isTyping ? 'after:animate-cursor' : isComplete ? 'after:opacity-0' : ''} after:content-['|'] after:ml-[1px] after:animate-blink after:text-[#FF6B6B]` 
    : '';

  return (
    <Tag 
      className={`${className} ${cursorClass}`}
      dangerouslySetInnerHTML={{ __html: highlightText(displayedText) }}
    />
  );
};

export default AITypingEffect;

// Add this to globals.css:
// .text-gradient {
//   background: linear-gradient(to right, #FF6B6B, #FF8E53);
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
//   display: inline;
// }
// 
// @keyframes blink {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0; }
// }
// 
// .animate-blink {
//   animation: blink 1s infinite;
// }
// 
// @keyframes cursor {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// 
// .animate-cursor {
//   animation: blink 0.5s infinite;
// } 