"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AICodeLivePreviewProps {
  codeSnippets?: string[];
  previewComponent?: React.ReactNode;
  title?: string;
  subtitle?: string;
  language?: string;
  typingSpeed?: number;
  showLineNumbers?: boolean;
  darkMode?: boolean;
  height?: string;
}

const DefaultCodeSnippet = `import { useState, useEffect } from 'react';

export function AnimatedHeader() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show the header with animation after page load
    setIsVisible(true);
    
    // Add scroll animation effect
    const handleScroll = () => {
      const header = document.querySelector('.animated-header');
      if (window.scrollY > 100) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={\`animated-header \${isVisible ? 'visible' : ''}\`}>
      <div className="logo">
        <span className="gradient-text">Promptly</span>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
      <button className="cta-button">
        Get Started <span className="arrow">→</span>
      </button>
    </header>
  );
}`;

const AICodeLivePreview: React.FC<AICodeLivePreviewProps> = ({
  codeSnippets = [DefaultCodeSnippet],
  previewComponent,
  title = "Live Code Preview",
  subtitle = "Watch AI write code in real-time",
  language = "jsx",
  typingSpeed = 20,
  showLineNumbers = true,
  darkMode = true,
  height = "500px",
}) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Type code with animation
  useEffect(() => {
    if (currentSnippetIndex >= codeSnippets.length) return;
    
    const currentCode = codeSnippets[currentSnippetIndex];
    let currentPosition = 0;
    let currentLine = 0;
    let currentChar = 0;
    
    setIsTyping(true);
    setDisplayedCode('');
    
    const typeCharacter = () => {
      if (currentPosition < currentCode.length) {
        const char = currentCode[currentPosition];
        setDisplayedCode(prev => prev + char);
        
        // Update cursor position
        if (char === '\n') {
          currentLine++;
          currentChar = 0;
        } else {
          currentChar++;
        }
        
        setCursorPosition({ line: currentLine, ch: currentChar });
        currentPosition++;
        
        // Randomize typing speed slightly for realism
        let speed = typingSpeed;
        if (char === ';' || char === '{' || char === '}') {
          speed = typingSpeed * 3; // Pause slightly after punctuation
        } else if (char === '\n') {
          speed = typingSpeed * 5; // Longer pause after new line
        }
        
        // Occasionally simulate a thinking pause
        if (Math.random() < 0.02) {
          speed = typingSpeed * 10;
        }
        
        // Occasionally show and quickly fix an error
        if (Math.random() < 0.005 && !showError) {
          setShowError(true);
          setTimeout(() => setShowError(false), 800);
        }
        
        typingRef.current = setTimeout(typeCharacter, speed);
      } else {
        setIsTyping(false);
        
        // Show preview after typing finishes
        setTimeout(() => {
          setShowPreview(true);
        }, 500);
        
        // Move to next snippet after pause
        setTimeout(() => {
          if (currentSnippetIndex < codeSnippets.length - 1) {
            setCurrentSnippetIndex(prev => prev + 1);
            setShowPreview(false);
          } else {
            setAnimationComplete(true);
          }
        }, 5000);
      }
    };
    
    typingRef.current = setTimeout(typeCharacter, 1000);
    
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentSnippetIndex, codeSnippets, typingSpeed]);
  
  // Format code with syntax highlighting (basic version)
  const formatCode = (code: string) => {
    // Very simple syntax highlighting - for production, use a proper library
    const keywords = ['import', 'export', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'useEffect', 'useState'];
    const strings = code.match(/(['"`])(?:(?=(\\?))\2.)*?\1/g) || [];
    const comments = code.match(/\/\/.*$/gm) || [];
    
    let formattedCode = code;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      formattedCode = formattedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Highlight strings
    strings.forEach(str => {
      formattedCode = formattedCode.replace(str, `<span class="string">${str}</span>`);
    });
    
    // Highlight comments
    comments.forEach(comment => {
      formattedCode = formattedCode.replace(comment, `<span class="comment">${comment}</span>`);
    });
    
    // Add line numbers if needed
    if (showLineNumbers) {
      const lines = formattedCode.split('\n');
      const lineNumbers = lines.map((_, idx) => `<span class="line-number">${idx + 1}</span>`).join('\n');
      
      return {
        lineNumbers,
        code: lines.map(line => `<span class="line">${line}</span>`).join('\n')
      };
    }
    
    return { code: formattedCode, lineNumbers: '' };
  };
  
  const { code: highlightedCode, lineNumbers } = formatCode(displayedCode);
  
  // Default preview component if none provided
  const defaultPreview = (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      <div className="w-full max-w-3xl mx-auto p-4">
        <header className="flex justify-between items-center p-4 bg-gradient-to-r from-[#FF6B6B]/5 to-[#FF8E53]/5 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]"></div>
            <span className="font-bold text-gray-800">Promptly</span>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">About</a></li>
            </ul>
          </nav>
          
          <button className="px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white rounded-full text-sm">
            Get Started →
          </button>
        </header>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Preview updates as you type</p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className={`relative rounded-xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`} style={{ height }}>
      {/* Header bar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {title}
        </div>
        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {language.toUpperCase()}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-2 h-[calc(100%-40px)]">
        {/* Code editor */}
        <div 
          ref={codeEditorRef}
          className={`relative font-mono text-sm overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          style={{ height: 'calc(100%)' }}
        >
          {/* Status bar */}
          <div className={`absolute top-2 left-2 right-2 flex items-center justify-between z-10 text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            <span>Writing code{isTyping ? '...' : ' ✓'}</span>
            <span>Line {cursorPosition.line + 1}, Col {cursorPosition.ch + 1}</span>
          </div>
          
          {/* Line numbers */}
          {showLineNumbers && (
            <div 
              className={`absolute top-10 left-0 pt-4 pl-2 pr-2 text-right select-none ${darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'}`}
              style={{ fontFamily: 'monospace', whiteSpace: 'pre', height: 'calc(100% - 40px)', width: '30px' }}
              dangerouslySetInnerHTML={{ __html: lineNumbers }}
            ></div>
          )}
          
          {/* Code */}
          <div 
            className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} pt-10 pl-10 pr-4 pb-4`}
            style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          ></div>
          
          {/* Cursor */}
          {isTyping && (
            <div 
              className="absolute w-[2px] h-[1.2em] bg-white animate-blink"
              style={{ 
                top: `${10 + 1.5 * cursorPosition.line}em`,
                left: `${10 + 0.6 * cursorPosition.ch}ch`, 
              }}
            ></div>
          )}
          
          {/* Error highlight animation */}
          {showError && (
            <div 
              className="absolute bg-red-500/20 animate-pulse"
              style={{ 
                top: `${10 + 1.5 * cursorPosition.line}em`,
                left: `${10 + 0.6 * (cursorPosition.ch - 5)}ch`,
                height: '1.2em', 
                width: '5ch'
              }}
            ></div>
          )}
        </div>
        
        {/* Preview */}
        <div 
          ref={previewRef}
          className={`border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-auto`}
        >
          <div className={`p-2 border-b text-xs ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-700'}`}>
            <div className="flex justify-between items-center">
              <span>Live Preview</span>
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${showPreview ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span>{showPreview ? 'Ready' : 'Compiling...'}</span>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="h-full w-full transition-opacity duration-500"
            animate={{ 
              opacity: showPreview ? 1 : 0.5,
              filter: showPreview ? 'blur(0px)' : 'blur(2px)'
            }}
          >
            {previewComponent || defaultPreview}
          </motion.div>
        </div>
      </div>
      
      {/* Code writing indicator overlay */}
      {isTyping && (
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white text-xs rounded-full flex items-center animate-pulse">
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>AI Writing Code</span>
        </div>
      )}

      <style jsx>{`
        .keyword {
          color: ${darkMode ? '#ff79c6' : '#d73a49'};
        }
        .string {
          color: ${darkMode ? '#f1fa8c' : '#032f62'};
        }
        .comment {
          color: ${darkMode ? '#6272a4' : '#6a737d'};
        }
        .line-number {
          display: block;
          color: ${darkMode ? '#6272a4' : '#aaaaaa'};
          user-select: none;
        }
        .line {
          display: block;
          min-height: 1.5em;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default AICodeLivePreview; 