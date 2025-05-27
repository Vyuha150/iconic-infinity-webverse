
import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        // Main cursor follows immediately
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
        
        // Dot follows with delay
        setTimeout(() => {
          if (dotRef.current) {
            dotRef.current.style.left = e.clientX + 'px';
            dotRef.current.style.top = e.clientY + 'px';
          }
        }, 100);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 border-2 border-iconic-gold rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Following dot */}
      <div
        ref={dotRef}
        className={`fixed w-2 h-2 bg-iconic-blue rounded-full pointer-events-none z-[9999] transition-all duration-200 ${
          isVisible ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default CustomCursor;
