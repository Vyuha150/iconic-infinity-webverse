
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThreeCanvas from "./ThreeCanvas";

const Hero = () => {
  useEffect(() => {
    // Enhanced animation observer with staggered animations
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
      }, index * 300 + 500); // Added initial delay
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-iconic-dark via-iconic-dark/95 to-iconic-slate/50">
      {/* Enhanced 3D Background */}
      <ThreeCanvas />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-iconic-dark/90 via-transparent to-iconic-dark/60 z-5" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-iconic-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-iconic-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Main heading with enhanced typography */}
          <div className="text-center mb-16">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-iconic-gold opacity-0 animate-on-load leading-tight"
              style={{ animationDelay: "500ms" }}
            >
              <span className="block bg-gradient-to-r from-iconic-gold via-white to-iconic-gold bg-clip-text text-transparent">
                ICONIC
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/90 mt-4">
                Infinity Group
              </span>
            </h1>
            
            <div 
              className="mt-8 opacity-0 animate-on-load"
              style={{ animationDelay: "800ms" }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent animate-pulse">
                Face of the Future
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/70 mt-6 max-w-3xl mx-auto leading-relaxed">
                Driven by excellence, quality and innovation. We build customer-friendly brands across multiple verticals.
              </p>
            </div>
          </div>
          
          {/* Enhanced CTA buttons */}
          <div 
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 opacity-0 animate-on-load mb-20" 
            style={{ animationDelay: "1100ms" }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium text-lg px-10 py-6 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-iconic-blue/40 transform-gpu"
            >
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-2 border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10 font-medium text-lg px-10 py-6 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-iconic-gold/40 backdrop-blur-sm transform-gpu"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>

          {/* Enhanced feature showcase with better responsive grid */}
          <div 
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto opacity-0 animate-on-load"
            style={{ animationDelay: "1400ms" }}
          >
            {[
              { icon: "star", title: "Excellence", subtitle: "Uncompromising quality", delay: "0ms" },
              { icon: "target", title: "Precision", subtitle: "Strategic focus", delay: "200ms" },
              { icon: "zap", title: "Innovation", subtitle: "Future-ready solutions", delay: "400ms" },
              { icon: "users", title: "Customer First", subtitle: "Relationship driven", delay: "600ms" }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: item.delay }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-iconic-blue/20 to-iconic-gold/20 flex items-center justify-center mb-4 transition-all duration-700 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-iconic-gold/40 backdrop-blur-sm border border-iconic-gold/30 group-hover:border-iconic-gold/60">
                  {item.icon === "star" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-500">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  )}
                  {item.icon === "target" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-500">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  )}
                  {item.icon === "zap" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-500">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  )}
                  {item.icon === "users" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-110 transition-transform duration-500">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl group-hover:text-iconic-gold transition-colors duration-500 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-500">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#about" className="text-iconic-gold hover:text-iconic-gold/80 transition-colors duration-300 block p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
