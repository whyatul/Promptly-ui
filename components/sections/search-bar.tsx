import React from 'react';

const AttachmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-sky-blue transition-colors duration-200 ease-in-out">
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.323a1.5 1.5 0 0 1-2.122-2.122l7.693-7.693c.659-.659 1.73-.659 2.389 0l.53.53a1.778 1.778 0 0 1 0 2.389l-7.693 7.693a.75.75 0 0 1-1.06-1.06l7.693-7.693a3 3 0 0 0-4.243-4.243l-10.94 10.94a6 6 0 1 0 8.486 8.486l7.693-7.693a.75.75 0 0 1 1.06 1.06Z" />
  </svg>
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
  return (
    <div className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 "
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
            className="relative px-6 py-2.5 bg-transparent text-sky-blue font-medium rounded-full border-0 group hover:scale-105 transition-all duration-200 ease-in-out"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff1947] via-[#ff2975] to-[#8c1eff] opacity-70 group-hover:opacity-100 -z-10"></span>
            <span className="absolute inset-[2px] rounded-full bg-white/90 -z-10"></span>
            
            <div className="flex items-center space-x-2">
              <span className="text-gradient-to-r from-[#ffd319] via-[#ff2975] to-[#8c1eff]">
                {SuggestionIcons[suggestion as keyof typeof SuggestionIcons]}
              </span>
              <span>{suggestion}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-300 via-pink-500 to-fuchsia-300 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          
          <div className="relative flex items-center h-14 px-4 rounded-xl bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-700 shadow-lg">
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
            
            <input
              type="text"
              placeholder="Type a command or search"
              className="flex-grow h-full bg-transparent border-none text-white placeholder-gray-300/60 focus:outline-none focus:ring-0 px-3 py-2 text-base"
            />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
