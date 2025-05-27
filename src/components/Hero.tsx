
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThreeCanvas from "./ThreeCanvas";

const Hero = () => {
  useEffect(() => {
    // Enhanced staggered animation system
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
      // Enhanced staggered timing
      setTimeout(() => {
        el.classList.add("animate-fade-in");
      }, index * 300 + 500);
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

      {/* Professional overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-iconic-dark/90 via-transparent to-iconic-dark/50 z-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Creative header with animations */}
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-iconic-gold opacity-0 animate-on-load leading-none tracking-tight">
                <span className="inline-block transform translate-y-full animate-slide-up" style={{ animationDelay: "800ms" }}>
                  ICONIC
                </span>
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 opacity-0 animate-on-load">
                <span className="inline-block bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent transform translate-y-full animate-slide-up" style={{ animationDelay: "1100ms" }}>
                  Infinity Group
                </span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <div className="opacity-0 animate-on-load" style={{ animationDelay: "1400ms" }}>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-iconic-gold to-transparent mx-auto mb-8"></div>
                <p className="text-2xl md:text-3xl text-iconic-gold/90 font-light tracking-wide transform translate-y-full animate-slide-up">
                  Face of the Future
                </p>
              </div>
            </div>

            {/* Tagline with typewriter effect */}
            <div className="mt-12 opacity-0 animate-on-load" style={{ animationDelay: "1700ms" }}>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Driven by excellence, quality, and innovation across multiple verticals
              </p>
            </div>
          </div>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 opacity-0 animate-on-load mb-20" style={{ animationDelay: "2000ms" }}>
            <Button 
              asChild
              size="lg" 
              className="group bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium text-xl px-10 py-6 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-iconic-blue/40 transform hover:-translate-y-1"
            >
              <Link to="/services" className="flex items-center gap-3">
                Explore Our Services
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="group border-2 border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10 font-medium text-xl px-10 py-6 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-iconic-gold/40 backdrop-blur-sm transform hover:-translate-y-1"
            >
              <Link to="/contact" className="flex items-center gap-3">
                Get In Touch
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </Button>
          </div>

          {/* Enhanced feature showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto opacity-0 animate-on-load" style={{ animationDelay: "2300ms" }}>
            {[
              { icon: "star", title: "Excellence", subtitle: "Premium Quality" },
              { icon: "target", title: "Precision", subtitle: "Accurate Solutions" },
              { icon: "zap", title: "Innovation", subtitle: "Future Ready" },
              { icon: "users", title: "Customer Focus", subtitle: "Your Success" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                style={{ animationDelay: `${2600 + (index * 200)}ms` }}
              >
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-iconic-blue/30 to-iconic-gold/30 flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-iconic-gold/30 backdrop-blur-sm border border-iconic-gold/40 group-hover:border-iconic-gold/80">
                  <div className="absolute inset-0 bg-gradient-to-br from-iconic-blue/10 to-iconic-gold/10 rounded-full animate-pulse"></div>
                  {item.icon === "star" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-125 transition-transform duration-500 relative z-10">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  )}
                  {item.icon === "target" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-125 transition-transform duration-500 relative z-10">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  )}
                  {item.icon === "zap" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-125 transition-transform duration-500 relative z-10">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  )}
                  {item.icon === "users" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold group-hover:scale-125 transition-transform duration-500 relative z-10">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-white text-xl mb-2 group-hover:text-iconic-gold transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-500">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="group text-iconic-gold hover:text-iconic-gold/80 transition-all duration-300 flex flex-col items-center gap-2">
          <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">Scroll to explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
