import React from 'react';

// Placeholder data for recent apps
const recentAppsData = [
  { id: 1, icon: 'JS', name: 'JS Practice', time: '9 months ago', isPublic: true },
  { id: 2, icon: 'Py', name: 'Python API', time: '1 month ago', isPublic: false },
  { id: 3, icon: '🎨', name: 'Design System', time: '3 weeks ago', isPublic: true },
  // Add a fourth card for better grid display on some screens
  { id: 4, icon: '🚀', name: 'Launch Page', time: '2 days ago', isPublic: true },
];

// Placeholder for icons - in a real app, use SVG components or an icon library
const AttachmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-sky-blue transition-colors duration-200 ease-in-out">
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.323a1.5 1.5 0 0 1-2.122-2.122l7.693-7.693c.659-.659 1.73-.659 2.389 0l.53.53a1.778 1.778 0 0 1 0 2.389l-7.693 7.693a.75.75 0 0 1-1.06-1.06l7.693-7.693a3 3 0 0 0-4.243-4.243l-10.94 10.94a6 6 0 1 0 8.486 8.486l7.693-7.693a.75.75 0 0 1 1.06 1.06Z" />
  </svg>
);

const ThreeDotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-sky-blue transition-colors duration-200 ease-in-out">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);


const SearchBar = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans antialiased">
      {/* Greeting - text-heading-color is applied via globals.css h2 styling */}
      <h2 className="text-3xl sm:text-4xl font-semibold mt-6 md:mt-12 mb-8 text-center">
        What do you want to make?
      </h2>

      {/* Suggestion Buttons - use themed styles */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["Book scanner", "AI chat", "Waitlist website"].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="px-5 py-2.5 bg-card-bg text-sky-blue font-medium rounded-lg border border-border-soft shadow-gentle hover:bg-ui-hover hover:border-sky-blue/50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-blue focus:ring-opacity-30"
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      {/* Main Input Area - use themed card styles */}
      <div className="bg-card-bg p-5 sm:p-6 rounded-xl shadow-xl mb-10 border border-border-soft backdrop-blur-sm">
    
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <textarea
            id="appDescription"
            rows={3}
            className="flex-grow w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all duration-200 ease-in-out shadow-sm text-promptly-foreground placeholder-gray-400 text-base bg-white/80"
            placeholder="Describe the app or site you want to create, e.g., 'a to-do list app with user authentication'..."
          />
          <div className="flex items-center space-x-3 self-stretch sm:self-end">
            <button type="button" className="group p-3.5 h-full bg-gray-100 rounded-lg hover:bg-ui-hover transition-colors duration-200 ease-in-out border border-border-soft focus:outline-none focus:ring-1 focus:ring-sky-blue">
              <AttachmentIcon />
            </button>
            {/* Use themed button styles */}
            <button
              type="button"
              className="px-6 py-3.5 h-full bg-sky-blue text-white font-semibold rounded-lg shadow-gentle hover:bg-sky-blue-darker hover:shadow-gentle-lift transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-blue focus:ring-opacity-50"
            >
              Start building
            </button>
          </div>
        </div>
      </div>

      {/* ... (Recent Apps section if it were to be re-added would also get card styling) ... */}
    </div>
  );
};

export default SearchBar;
