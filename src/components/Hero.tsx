
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IconicLogo3D from "./IconicLogo3D";

const Hero = () => {
  useEffect(() => {
    // Simple fade-in animation for elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, index) => {
      observer.observe(el);
      // Staggered animation delay
      setTimeout(() => {
        el.classList.add("animate-fade-in");
      }, index * 200 + 300);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-iconic-dark overflow-hidden pt-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-iconic-dark dark:via-iconic-slate/20 dark:to-iconic-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-6 text-center">
              <h1 className="opacity-0 animate-on-load text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                <span className="bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent">
                  ICONIC Infinity Group
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
                  Face of the Future
                </span>
              </h1>
              
              <p className="opacity-0 animate-on-load text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                ICONIC Infinity Group delivers excellence, quality and innovation across multiple verticals. We build brands that customers love and trust.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-on-load flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-iconic-blue/20"
              >
                <Link to="/services">Explore Our Services</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-base px-8 py-6 rounded-lg transition-all duration-300"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - 3D ICONIC Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-[600px] opacity-0 animate-on-load">
              <IconicLogo3D />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-400 hover:text-iconic-blue transition-colors duration-300 block p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
