
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThreeCanvas from "./ThreeCanvas";

const Hero = () => {
  useEffect(() => {
    // Enhanced animation observer with better performance
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
      }, index * 200);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-iconic-dark via-iconic-dark/95 to-iconic-dark">
      {/* Enhanced 3D Background */}
      <ThreeCanvas />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-iconic-dark/80 via-transparent to-iconic-dark/40 z-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-iconic-gold opacity-0 animate-on-load leading-tight"
            style={{ animationDelay: "300ms" }}
          >
            ICONIC Infinity Group
            <span className="block mt-6 text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent animate-pulse">
              Face of the Future
            </span>
          </h1>
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-6 opacity-0 animate-on-load mt-16" 
            style={{ animationDelay: "600ms" }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-iconic-blue/30"
            >
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-2 border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10 font-medium text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-iconic-gold/30"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        {/* Enhanced feature icons with better animations */}
        <div 
          className="mt-32 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-5xl mx-auto opacity-0 animate-on-load"
          style={{ animationDelay: "900ms" }}
        >
          {[
            { icon: "star", title: "Excellence", delay: "0ms" },
            { icon: "target", title: "Quality", delay: "150ms" },
            { icon: "zap", title: "Innovation", delay: "300ms" },
            { icon: "users", title: "Customer Focus", delay: "450ms" }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer"
              style={{ animationDelay: item.delay }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-iconic-blue/20 to-iconic-gold/20 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-iconic-gold/30 backdrop-blur-sm border border-iconic-gold/30">
                {item.icon === "star" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-300">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )}
                {item.icon === "target" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-300">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                )}
                {item.icon === "zap" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-300">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                )}
                {item.icon === "users" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-300">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                )}
              </div>
              <h3 className="font-semibold text-white text-lg group-hover:text-iconic-gold transition-colors duration-300">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-iconic-gold hover:text-iconic-gold/80 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
