
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RubiksCube from "./RubiksCube";

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
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-iconic-dark overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-iconic-dark dark:via-iconic-slate/20 dark:to-iconic-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered Content Layout - Similar to Mage.ai */}
          <div className="text-center mb-16">
            {/* Main Heading */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <h1 className="opacity-0 animate-on-load text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                <span className="bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent">
                  ICONIC Infinity Group
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl mt-4 text-gray-800 dark:text-gray-200">
                  Face of the Future
                </span>
              </h1>
              
              <p className="opacity-0 animate-on-load text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                ICONIC Infinity Group delivers excellence, quality and innovation across multiple verticals. We build brands that customers love and trust.
              </p>
              
              {/* CTA Buttons */}
              <div className="opacity-0 animate-on-load flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium text-lg px-10 py-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-iconic-blue/20 hover:scale-105"
                >
                  <Link to="/services">Explore Our Services</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-lg px-10 py-6 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Centered Rubik's Cube */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl h-[500px] lg:h-[600px] opacity-0 animate-on-load">
              <RubiksCube />
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
