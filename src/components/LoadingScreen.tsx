
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increased loading time for better visibility
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Increased from 5500ms to 8000ms

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-iconic-dark z-[9999] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Enhanced Infinity Symbol Animation */}
        <div className="w-48 h-24 mb-8 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="25%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="75%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#4F46E5" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-200,0;200,0;-200,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main infinity path */}
            <path
              d="M50,50 C50,25 25,25 25,50 C25,75 50,75 50,50 C50,25 75,25 75,50 C75,75 100,75 100,50 C100,25 125,25 125,50 C125,75 150,75 150,50 C150,25 175,25 175,50"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              className="animate-pulse"
            />
            
            {/* Moving particle along the path */}
            <circle r="6" fill="#FFD700" filter="url(#glow)">
              <animateMotion dur="4s" repeatCount="indefinite">
                <path d="M50,50 C50,25 25,25 25,50 C25,75 50,75 50,50 C50,25 75,25 75,50 C75,75 100,75 100,50 C100,25 125,25 125,50 C125,75 150,75 150,50 C150,25 175,25 175,50" />
              </animateMotion>
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            </circle>
            
            {/* Secondary particle moving in opposite direction */}
            <circle r="4" fill="#4F46E5" opacity="0.8" filter="url(#glow)">
              <animateMotion dur="5s" repeatCount="indefinite">
                <path d="M175,50 C175,25 150,25 150,50 C150,75 125,75 125,50 C125,25 100,25 100,50 C100,75 75,75 75,50 C75,25 50,25 50,50 C50,75 25,75 25,50" />
              </animateMotion>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        <div className="mt-8 text-iconic-gold font-display font-bold text-3xl animate-pulse">
          ICONIC Infinity Group
        </div>
        <div className="mt-3 text-iconic-gold/70 text-lg animate-bounce">
          Loading Excellence...
        </div>
        
        {/* Progress indicator */}
        <div className="mt-6 w-64 h-1 bg-iconic-slate/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-iconic-blue to-iconic-gold rounded-full animate-loading-progress"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes loading-progress {
            0% { width: 0%; transform: translateX(-100%); }
            50% { width: 70%; transform: translateX(0%); }
            100% { width: 100%; transform: translateX(0%); }
          }
          
          .animate-loading-progress {
            animation: loading-progress 8s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
