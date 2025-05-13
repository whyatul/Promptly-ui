import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full max-w-6xl mt-4 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center animate-in bg-promptly-background">
      <div className="flex items-center space-x-16" suppressHydrationWarning>
        <div className="flex items-center space-x-2" suppressHydrationWarning>
          <Image src="/logo/logo.png" alt="Promptly Logo" width={32} height={32} />
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center font-calSans font-bold leading-none tracking-tighter text-transparent text-2xl">
            Promptly
          </span>
        </div>
        
        <div className="hidden md:flex space-x-8 items-center nav-links group" suppressHydrationWarning>
          <a href="#" className="nav-item text-promptly-foreground hover:text-sky-blue font-semibold transition-colors duration-200 ease-in-out">
            Why Promptly?
          </a>
          <div 
            className="nav-item flex items-center space-x-1 cursor-pointer text-promptly-foreground hover:text-sky-blue font-semibold transition-colors duration-200 ease-in-out" 
            suppressHydrationWarning
          >
            <a href="#">Tools</a> 
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
          <a href="#" className="nav-item text-promptly-foreground hover:text-sky-blue font-semibold transition-colors duration-200 ease-in-out">
            Contact
          </a>
          <a href="#" className="nav-item text-promptly-foreground hover:text-sky-blue font-semibold transition-colors duration-200 ease-in-out">
            Pricing
          </a>
        </div>
      </div>
      
      <button className="bg-black text-white font-semibold px-5 py-2.5 rounded-full shadow-gentle  hover:shadow-gentle-lift transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-blue focus:ring-opacity-50">
        LogIn
      </button>

      <style jsx>{`
        .nav-links:hover .nav-item:not(:hover) {
          color: #9ca3af; 
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
