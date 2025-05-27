
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-iconic-dark z-[9999] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <svg className="w-48 h-32" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          {/* Complete Infinity Symbol */}
          <path
            className="animate-dash"
            d="M50,60 C50,30 70,30 80,45 C90,60 110,60 120,45 C130,30 150,30 150,60 C150,90 130,90 120,75 C110,60 90,60 80,75 C70,90 50,90 50,60 Z"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Animated particles along the path */}
          <circle r="4" fill="#FFD700">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>
          
          <circle r="3" fill="#0047AB">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
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
                dur="2s" 
                repeatCount="indefinite"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-6 text-iconic-gold font-display font-bold text-2xl animate-pulse">
          ICONIC Infinity Group
        </div>
        <div className="mt-2 text-iconic-gold/70 text-sm">Loading Excellence...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
