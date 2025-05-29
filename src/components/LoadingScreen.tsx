
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increased loading time for better visibility (10 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-iconic-dark z-[9999] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Logo-based Loading Animation */}
        <div className="w-32 h-32 mb-8 relative">
          <div className="relative w-full h-full">
            {/* Main logo container with rotating border */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-iconic-gold border-r-iconic-blue animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-iconic-gold border-l-iconic-blue animate-spin animation-reverse"></div>
            
            {/* Logo in center */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-iconic-gold/20 to-iconic-blue/20 p-4 animate-pulse">
              <img 
                src="/lovable-uploads/4fa324e0-d92d-45ae-92ab-42b0e8a621a1.png" 
                alt="ICONIC Logo" 
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-iconic-gold rounded-full -translate-x-1/2 -translate-y-1"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-iconic-blue rounded-full -translate-x-1/2 translate-y-1"></div>
            </div>
          </div>
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
            animation: loading-progress 10s ease-in-out forwards;
          }
          
          .animation-reverse {
            animation-direction: reverse;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
