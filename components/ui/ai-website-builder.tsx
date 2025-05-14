"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentType {
  name: string;
  code: string;
  preview: React.ReactNode;
}

// Sample code fragments that AI will generate
const codeFragments = [
  { 
    id: 'navbar',
    language: 'jsx',
    title: 'Navigation Component',
    code: `export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="logo font-bold text-2xl">Promptly</div>
      <div className="links space-x-6">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <button className="btn-primary">Get Started</button>
      </div>
    </nav>
  );
}`
  },
  {
    id: 'hero',
    language: 'jsx',
    title: 'Hero Section',
    code: `export function Hero() {
  return (
    <section className="flex flex-col md:flex-row py-20">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-bold gradient-text">
          Build beautiful UIs faster
        </h1>
        <p className="text-lg text-gray-600">
          Design, develop and ship your product in record time
        </p>
        <div className="flex space-x-4">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
      <div className="flex-1 mt-10 md:mt-0">
        <img src="/hero-image.png" alt="Hero" />
      </div>
    </section>
  );
}`
  },
  {
    id: 'feature-card',
    language: 'jsx',
    title: 'Feature Card Component',
    code: `export function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md
      transition-all duration-300 transform hover:-translate-y-2">
      <div className="icon-wrapper mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}`
  },
  {
    id: 'theme',
    language: 'css',
    title: 'Theme CSS Variables',
    code: `:root {
  --background: #FDF6ED;
  --foreground: #374151;
  --heading-color: #1F2937;
  --accent-coral: #FF6B6B;
  --accent-orange: #FF8E53;
  --gradient-main: linear-gradient(to right, #FF6B6B, #FF8E53);
  --card-background: #FFFFFF;
  --border-color-soft: rgba(0, 0, 0, 0.05);
}`
  }
];

// Website preview component items
const previewComponents = [
  { id: 'navbar', name: 'Navigation Bar', color: '#FF6B6B' },
  { id: 'hero', name: 'Hero Section', color: '#FF8E53' },
  { id: 'features', name: 'Features Grid', color: '#FF7A5C' },
  { id: 'testimonials', name: 'Testimonials', color: '#FF6B6B' },
  { id: 'pricing', name: 'Pricing Table', color: '#FF8E53' },
  { id: 'cta', name: 'Call to Action', color: '#FF7A5C' },
  { id: 'footer', name: 'Footer', color: '#FF6B6B' }
];

const AIWebsiteBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCode, setDisplayedCode] = useState('');
  const [completedComponents, setCompletedComponents] = useState<string[]>([]);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const components: ComponentType[] = [
    {
      name: "Header Component",
      code: `// Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white p-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
        <span className="font-bold text-xl">Promptly</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-orange-500 transition-colors">Features</a>
        <a href="#" className="hover:text-orange-500 transition-colors">Pricing</a>
        <a href="#" className="hover:text-orange-500 transition-colors">Documentation</a>
        <a href="#" className="hover:text-orange-500 transition-colors">About</a>
      </nav>
      <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full">
        Get Started
      </button>
    </header>
  );
}`,
      preview: (
        <div className="bg-white p-4 flex justify-between items-center shadow-sm rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full" />
            <span className="font-bold text-sm">Promptly</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <span className="text-xs">Features</span>
            <span className="text-xs">Pricing</span>
            <span className="text-xs">Docs</span>
          </div>
          <button className="px-2 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-full text-xs">
            Login
          </button>
        </div>
      )
    },
    {
      name: "Hero Section",
      code: `// Hero.jsx
import React from 'react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="block">Create stunning</span>
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            animations with AI
          </span>
          <span className="block">in seconds</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform your ideas into beautiful, fluid animations without code.
          Our AI understands exactly what you need.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow">
          Get Started
        </button>
      </div>
    </div>
  );
}`,
      preview: (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 rounded-lg">
          <div className="max-w-full mx-auto text-center">
            <h2 className="text-lg font-bold mb-2">
              <span className="block">Create stunning</span>
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
                animations with AI
              </span>
            </h2>
            <p className="text-xs text-gray-600 mb-4 px-6">
              Transform your ideas into beautiful animations without code.
            </p>
            <button className="px-3 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-full text-xs">
              Get Started
            </button>
          </div>
        </div>
      )
    },
    {
      name: "Feature Card Component",
      code: `// FeatureCard.jsx
export function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-orange-50 relative overflow-hidden">
      <div className="icon-wrapper mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full -z-10 opacity-50"></div>
    </div>
  );
}`,
      preview: (
        <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden">
          <div className="mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-semibold mb-1">AI-Powered Animations</h3>
          <p className="text-xs text-gray-600">Create stunning effects with just a few clicks.</p>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#FF8E53]/20 to-[#FF6B6B]/10 rounded-full -z-10"></div>
        </div>
      )
    },
    {
      name: "Features Section",
      code: `// FeaturesSection.jsx
import React from 'react';
import { FeatureCard } from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: <BoltIcon className="w-8 h-8 text-orange-500" />,
      title: "Lightning Fast",
      description: "Generate complex animations in seconds, not hours."
    },
    {
      icon: <SparklesIcon className="w-8 h-8 text-orange-500" />,
      title: "AI-Powered",
      description: "Our intelligent algorithm understands your needs."
    },
    {
      icon: <CodeIcon className="w-8 h-8 text-orange-500" />,
      title: "No Coding Required",
      description: "Create professional animations without writing code."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}`,
      preview: (
        <div className="py-4 px-2 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-center mb-3">Features</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 rounded bg-[#FF6B6B]/20 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF6B6B]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xs font-semibold">Fast</h4>
              <p className="text-[10px] text-gray-600">Generate in seconds</p>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 rounded bg-[#FF8E53]/20 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF8E53]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </div>
              <h4 className="text-xs font-semibold">AI</h4>
              <p className="text-[10px] text-gray-600">Smart algorithms</p>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 rounded bg-[#FF6B6B]/20 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#FF6B6B]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xs font-semibold">No Code</h4>
              <p className="text-[10px] text-gray-600">Easy to use</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Simulating typing effect for code
  useEffect(() => {
    if (currentStep >= components.length) return;
    
    const currentCode = components[currentStep].code;
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedCode('');
    
    const typeCharacter = () => {
      if (charIndex < currentCode.length) {
        setDisplayedCode(prev => prev + currentCode.charAt(charIndex));
        charIndex++;
        typingRef.current = setTimeout(typeCharacter, Math.random() * 10 + 5); // Random typing speed for realism
      } else {
        setIsTyping(false);
        // Move to next component after a pause
        setTimeout(() => {
          if (currentStep < components.length - 1) {
            setCurrentStep(prev => prev + 1);
          }
          setCompletedComponents(prev => [...prev, components[currentStep].name]);
        }, 1000);
      }
    };
    
    typingRef.current = setTimeout(typeCharacter, 500);
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentStep, components]);

  // Simulated progress indicator
  const totalSteps = components.length;
  const progress = Math.min(((currentStep + (isTyping ? 0.5 : 1)) / totalSteps) * 100, 100);

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="ml-4 text-gray-300 text-sm font-mono">
            Generating UI components ({Math.round(progress)}%)...
          </div>
        </div>
        <div className="bg-gray-700 h-2 rounded-full w-32">
          <div 
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 relative">
        {/* Code editor with typing effect */}
        <div className="bg-gray-800 rounded-lg shadow-inner overflow-hidden">
          <div className="bg-gray-700 px-3 py-1.5 text-gray-300 text-xs flex justify-between">
            <span>{currentStep < components.length ? components[currentStep].name : 'Complete'}</span>
            <span>jsx</span>
          </div>
          <pre className="p-4 text-gray-300 text-xs font-mono h-[400px] overflow-auto">
            <code className="whitespace-pre-wrap break-all">
              {displayedCode}
              {isTyping && <span className="inline-block w-2 h-4 bg-[#FF6B6B] animate-blink"></span>}
            </code>
          </pre>
        </div>
        
        {/* Preview panel */}
        <div className="bg-gray-100 rounded-lg shadow-inner overflow-hidden">
          <div className="bg-gray-200 px-3 py-1.5 text-gray-600 text-xs flex justify-between">
            <span>preview.promptly.ui</span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refreshing
            </span>
          </div>
          <div ref={previewRef} className="p-4 h-[400px] overflow-auto">
            <div className="space-y-4 animate-fade-in">
              {/* Display completed components */}
              {completedComponents.map((componentName, idx) => {
                const comp = components.find(c => c.name === componentName);
                return (
                  <div key={idx} className="animate-component-drop" style={{ animationDelay: `${idx * 0.3}s` }}>
                    {comp?.preview}
                  </div>
                );
              })}
              
              {/* Currently building component */}
              {isTyping && currentStep < components.length && (
                <div className="border-2 border-dashed border-[#FF8E53] rounded-lg p-4 bg-white/50 animate-pulse">
                  <div className="flex justify-center items-center h-20">
                    <div className="flex items-center space-x-2 text-[#FF8E53]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span className="text-sm font-medium">Building {components[currentStep].name}...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with AI assistant */}
      <div className="mt-4 bg-gray-800 rounded-lg p-3 flex items-start">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mr-3 flex-shrink-0 animate-ai-thinking">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="text-xs text-gray-400">AI Assistant</div>
          <div className="text-gray-300 text-sm">
            {currentStep < components.length 
              ? `Building ${components[currentStep].name}...` 
              : 'All components built successfully! Ready for deployment.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWebsiteBuilder; 