
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extended loading time for better visibility
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased from 2000 to 4000ms

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-iconic-dark z-[9999] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Larger infinity symbol - doubled in size */}
        <svg className="w-96 h-64" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          {/* Complete Infinity Symbol */}
          <path
            className="animate-dash"
            d="M50,60 C50,30 70,30 80,45 C90,60 110,60 120,45 C130,30 150,30 150,60 C150,90 130,90 120,75 C110,60 90,60 80,75 C70,90 50,90 50,60 Z"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
          />
          
          {/* Enhanced animated particles */}
          <circle r="6" fill="#FFD700" opacity="0.9">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>
          
          <circle r="5" fill="#0047AB" opacity="0.8">
            <animateMotion dur="4s" repeatCount="indefinite" begin="2s">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>

          <circle r="4" fill="#FFD700" opacity="0.7">
            <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>
          
          <circle r="3" fill="#0047AB" opacity="0.6">
            <animateMotion dur="4s" repeatCount="indefinite" begin="3s">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>
          
          {/* Hidden path for animation */}
          <path id="infinityPath" 
            d="M50,60 C50,30 70,30 80,45 C90,60 110,60 120,45 C130,30 150,30 150,60 C150,90 130,90 120,75 C110,60 90,60 80,75 C70,90 50,90 50,60 Z"
            fill="none" stroke="none"/>
          
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0047AB" />
              <stop offset="25%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#0047AB" />
              <stop offset="75%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#0047AB" />
              <animateTransform 
                attributeName="gradientTransform" 
                type="translate" 
                values="0 0; 200 0; 0 0" 
                dur="3s" 
                repeatCount="indefinite"/>
            </linearGradient>
          </defs>
        </svg>
        
        <div className="mt-8 text-iconic-gold font-display font-bold text-3xl animate-pulse">
          ICONIC Infinity Group
        </div>
        <div className="mt-3 text-iconic-gold/70 text-lg">Loading Excellence...</div>
        
        {/* Progress indicator */}
        <div className="mt-6 w-64 h-1 bg-iconic-slate rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-iconic-blue to-iconic-gold animate-pulse" 
               style={{ 
                 animation: 'progressFill 4s ease-out forwards',
                 width: '0%'
               }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
