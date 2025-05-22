
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
        <svg className="w-24 h-24" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
          <path
            className="animate-dash"
            d="M30,10 C55,10 55,50 80,50 C55,50 55,10 30,10 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
          />
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0047AB" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#0047AB" />
            <animate attributeName="x1" values="0%;100%;0%" dur="2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="100%;0%;100%" dur="2s" repeatCount="indefinite" />
          </linearGradient>
        </svg>
        <div className="mt-4 text-iconic-gold font-display font-bold text-xl">ICONIC Infinity Group</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
