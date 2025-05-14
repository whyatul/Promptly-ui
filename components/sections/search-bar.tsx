import React, { useState, useEffect, useRef } from 'react';
import AITypingEffect from '@/components/animations/ai-typing-effect';

const AttachmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-sky-blue transition-colors duration-200 ease-in-out">
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.323a1.5 1.5 0 0 1-2.122-2.122l7.693-7.693c.659-.659 1.73-.659 2.389 0l.53.53a1.778 1.778 0 0 1 0 2.389l-7.693 7.693a.75.75 0 0 1-1.06-1.06l7.693-7.693a3 3 0 0 0-4.243-4.243l-10.94 10.94a6 6 0 1 0 8.486 8.486l7.693-7.693a.75.75 0 0 1 1.06 1.06Z" />
  </svg>
);

const AIAssistantIcon = () => (
  <div className="relative animate-ai-thinking">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
      <path d="M16.5 7.5h-9v9h9v-9z" />
      <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] blur-sm -z-10 rounded-full opacity-60"></div>
  </div>
);

const SuggestionIcons = {
  "Book scanner": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  "AI chat": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  "Waitlist website": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  "Portfolio site": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "Team dashboard": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const SearchBar = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [animateSuggestions, setAnimateSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Simulate AI suggestion loading
  useEffect(() => {
    if (searchValue.length > 0) {
      setIsTyping(true);
      setShowAiSuggestions(false);
      setAiSuggestions([]);
      
      const timer = setTimeout(() => {
        // Generate some contextual AI suggestions based on input
        const suggestions = generateAiSuggestions(searchValue);
        setAiSuggestions(suggestions);
        setShowAiSuggestions(true);
        setIsTyping(false);
        
        // Animate suggestions appearing
        setAnimateSuggestions(true);
        setTimeout(() => setAnimateSuggestions(false), 1000);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setShowAiSuggestions(false);
      setIsTyping(false);
    }
  }, [searchValue]);
  
  // Generate AI suggestions based on input
  const generateAiSuggestions = (input: string): string[] => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('portfolio') || lowercaseInput.includes('website')) {
      return [
        "Portfolio website with animation effects",
        "Minimalist professional portfolio",
        "Interactive portfolio with 3D elements"
      ];
    } else if (lowercaseInput.includes('dashboard') || lowercaseInput.includes('admin')) {
      return [
        "Admin dashboard with data visualization",
        "Team dashboard with real-time updates",
        "Analytics dashboard with AI insights"
      ];
    } else if (lowercaseInput.includes('chat') || lowercaseInput.includes('ai')) {
      return [
        "AI chatbot with custom knowledge base",
        "Voice-enabled AI assistant",
        "Multilingual AI conversation interface"
      ];
    } else if (lowercaseInput.includes('shop') || lowercaseInput.includes('e-commerce')) {
      return [
        "E-commerce store with AI product recommendations",
        "Fashion marketplace with AR try-on",
        "Subscription-based e-commerce platform"
      ];
    } else {
      // Default suggestions
      return [
        `AI-powered ${input} project`,
        `Interactive ${input} with modern UI`,
        `${input} with data visualization`
      ];
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
        style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          What do you want to{" "}
          <span className="bg-gradient-to-r from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent animate-pulse">
            make?
          </span>
        </h2>
        <p className="text-lg text-promptly-foreground/80 max-w-2xl mx-auto">
          Describe your project and let our AI help you build it in seconds
        </p>
      </div>
    
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["Book scanner", "AI chat", "Waitlist website", "Portfolio site", "Team dashboard"].map((suggestion, index) => (
          <button
            key={suggestion}
            type="button"
            className="relative px-6 py-2.5 bg-transparent text-sky-blue font-medium rounded-full border-0 group hover:scale-105 transition-all duration-200 ease-in-out animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSearchValue(suggestion)}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF8E53] via-[#FF6B6B] to-[#FF5E99] opacity-70 group-hover:opacity-100 -z-10"></span>
            <span className="absolute inset-[2px] rounded-full bg-white/90 -z-10"></span>
            
            <div className="flex items-center space-x-2">
              <span className="text-gradient-to-r from-[#FF8E53] via-[#FF6B6B] to-[#FF5E99]">
                {SuggestionIcons[suggestion as keyof typeof SuggestionIcons]}
              </span>
              <span>{suggestion}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto mb-8 relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8E53] via-[#FF6B6B] to-[#FF5E99] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          
          <div className="relative flex items-center h-14 px-4 rounded-xl bg-gradient-to-r from-[#FF8E53] via-[#FF6B6B] to-[#FF5E99] shadow-lg">
            <div className="flex-shrink-0 w-5 h-5 mr-2">
              {isTyping ? <AIAssistantIcon /> : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white/90" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              )}
            </div>
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search"
              className="flex-grow h-full bg-transparent border-none text-white placeholder-white/70 font-bold focus:outline-none focus:ring-0 px-3 py-2 text-base"
              value={searchValue}
              onChange={handleInputChange}
            />
            
            {searchValue && (
              <button 
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                onClick={() => setSearchValue('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* AI suggestions dropdown */}
        {showAiSuggestions && aiSuggestions.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-1 border-b border-gray-100">
              <div className="px-3 py-2 text-xs text-gray-500 flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] mr-2 animate-ai-thinking"></div>
                AI Suggestions
              </div>
            </div>
            <div className="py-2">
              {aiSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer text-left ${animateSuggestions ? 'animate-element-appear' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-70 mr-2 flex-shrink-0 mt-1"></div>
                    <div>
                      <AITypingEffect 
                        text={suggestion}
                        speed={10}
                        delay={index * 100}
                        cursor={false}
                        highlightWords={searchValue.split(' ')}
                        className="text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* AI assistant message */}
      <div className="max-w-3xl mx-auto">
        <div className={`transition-all duration-300 transform ${searchValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-start animate-data-processing">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center animate-ai-thinking mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-400">AI Assistant</div>
              {searchValue && (
                <AITypingEffect
                  text={`I'll help you create a ${searchValue.toLowerCase()}. Let me design the key components for you...`}
                  speed={25}
                  delay={500}
                  className="text-gray-700 text-sm"
                  highlightWords={[searchValue]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
