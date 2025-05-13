"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const SocialProof = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const logos = [
    { name: 'Spotify', src: '/logo/Black_Spotify_logo_with_text.png', alt: 'Spotify Logo' },
    { name: 'Google', src: '/logo/google.png', alt: 'Google Logo' },
    { name: 'Linktree', src: '/logo/Linktree.png', alt: 'Linktree Logo' },
    { name: 'Reddit', src: '/logo/reddit.png', alt: 'Reddit Logo' },
    { name: 'Webflow', src: '/logo/Webflow_logo.png', alt: 'Webflow Logo' },
  ];

  if (!mounted) {
    return (
      <div className="mt-14 md:mt-16 h-32 flex items-center justify-center">
        <div className="text-gray-400">Loading partners...</div>
      </div>
    );
  }

  return (
    <>
      <p className="mt-16 md:mt-32 text-gray-500 max-w-xl animate-in"> 
        Over 20,000 creative teams use Jitter to create stunning animations online.
      </p>

      <div className="mt-8 w-full max-w-3xl animate-in">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-10">
          {logos.map(logo => (
            <div 
              key={logo.name} 
              className="grayscale hover:grayscale-0 transition-all duration-300 w-24 h-12 flex items-center justify-center"
            >
              <div className="relative w-24 h-10 flex items-center justify-center">
                <Image 
                  src={logo.src} 
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialProof;
