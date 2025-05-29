
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
        {/* Proper Infinity Symbol Animation */}
        <div className="w-64 h-32 mb-8 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5">
                  <animate attributeName="stop-color" 
                    values="#4F46E5;#FFD700;#4F46E5" 
                    dur="3s" 
                    repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#FFD700">
                  <animate attributeName="stop-color" 
                    values="#FFD700;#4F46E5;#FFD700" 
                    dur="3s" 
                    repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4F46E5">
                  <animate attributeName="stop-color" 
                    values="#4F46E5;#FFD700;#4F46E5" 
                    dur="3s" 
                    repeatCount="indefinite" />
                </stop>
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Infinity Symbol Path */}
            <path
              d="M75,75 C75,45 45,45 45,75 C45,105 75,105 75,75 C75,45 105,45 105,75 C105,105 135,105 135,75 C135,45 165,45 165,75 C165,105 195,105 195,75 C195,45 225,45 225,75 C225,105 255,105 255,75"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow)"
            >
              <animate attributeName="stroke-dasharray" 
                values="0,1000;300,1000;600,1000;900,1000;0,1000" 
                dur="4s" 
                repeatCount="indefinite" />
            </path>
            
            {/* Moving particles along the infinity path */}
            <circle r="8" fill="#FFD700" filter="url(#glow)">
              <animateMotion dur="4s" repeatCount="indefinite">
                <path d="M75,75 C75,45 45,45 45,75 C45,105 75,105 75,75 C75,45 105,45 105,75 C105,105 135,105 135,75 C135,45 165,45 165,75 C165,105 195,105 195,75 C195,45 225,45 225,75 C225,105 255,105 255,75" />
              </animateMotion>
              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="fill" values="#FFD700;#4F46E5;#FFD700" dur="3s" repeatCount="indefinite" />
            </circle>
            
            {/* Counter-rotating particle */}
            <circle r="6" fill="#4F46E5" opacity="0.8" filter="url(#glow)">
              <animateMotion dur="5s" repeatCount="indefinite">
                <path d="M255,75 C255,105 225,105 225,75 C225,45 195,45 195,75 C195,105 165,105 165,75 C165,45 135,45 135,75 C135,105 105,105 105,75 C105,45 75,45 75,75 C75,105 45,105 45,75" />
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
        
        {/* Enhanced Progress indicator */}
        <div className="mt-6 w-80 h-2 bg-iconic-slate/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue rounded-full animate-loading-progress"></div>
        </div>
        
        {/* Floating particles around the infinity symbol */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-iconic-gold rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i * 0.2)}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes loading-progress {
            0% { width: 0%; transform: translateX(-100%); }
            25% { width: 30%; transform: translateX(-50%); }
            50% { width: 60%; transform: translateX(-20%); }
            75% { width: 85%; transform: translateX(-10%); }
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
