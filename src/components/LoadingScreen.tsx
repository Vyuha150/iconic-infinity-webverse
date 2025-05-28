
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading time for better visibility
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-iconic-dark z-[9999] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Infinity Symbol Animation */}
        <div className="w-32 h-16 mb-8 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            <path
              d="M25,25 C25,11 11,11 11,25 C11,39 25,39 25,25 C25,11 39,11 39,25 C39,39 53,39 53,25 C53,11 67,11 67,25 C67,39 81,39 81,25 C81,11 95,11 95,25"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <circle r="4" fill="#FFD700" className="animate-bounce">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M25,25 C25,11 11,11 11,25 C11,39 25,39 25,25 C25,11 39,11 39,25 C39,39 53,39 53,25 C53,11 67,11 67,25 C67,39 81,39 81,25 C81,11 95,11 95,25" />
              </animateMotion>
            </circle>
          </svg>
        </div>
        
        <div className="mt-6 text-iconic-gold font-display font-bold text-2xl animate-pulse">
          ICONIC Infinity Group
        </div>
        <div className="mt-2 text-iconic-gold/70 text-sm">Loading Excellence...</div>
      </div>

      <style>
        {`
          @keyframes infinityFlow {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
