
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
        {/* ICONIC Logo */}
        <div className="w-32 h-32 mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <img 
              src="/lovable-uploads/78fefb48-540c-4c98-95cf-d3372e6a8d82.png" 
              alt="ICONIC Infinity Group Logo" 
              className="w-24 h-24 object-contain animate-float"
            />
          </div>
          {/* Animated ring around logo */}
          <div className="absolute inset-0 rounded-full border-4 border-iconic-gold border-t-transparent animate-spin"></div>
        </div>
        
        <div className="mt-6 text-iconic-gold font-display font-bold text-2xl animate-pulse">
          ICONIC Infinity Group
        </div>
        <div className="mt-2 text-iconic-gold/70 text-sm">Loading Excellence...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
