
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThreeCanvas from "./ThreeCanvas";

const Hero = () => {
  useEffect(() => {
    // Animation for text elements - with fixed visibility
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
    elements.forEach((el) => {
      observer.observe(el);
      // Ensure visibility by adding class after a short delay
      setTimeout(() => {
        el.classList.add("animate-fade-in");
      }, 100);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-iconic-dark via-iconic-dark/80 to-iconic-dark">
      {/* 3D Background */}
      <ThreeCanvas />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-iconic-gold opacity-100 animate-on-load"
            style={{ animationDelay: "200ms" }}
          >
            ICONIC Infinity Group
            <span className="block mt-4 text-iconic-gold text-2xl md:text-3xl lg:text-4xl">Face of the Future</span>
          </h1>
          
          {/* Removing the text paragraph as requested */}
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-100 animate-on-load mt-48" 
            style={{ animationDelay: "400ms" }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-iconic-blue hover:bg-iconic-blue/90 text-white font-medium"
            >
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10"
            >
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        <div 
          className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto opacity-100 animate-on-load"
          style={{ animationDelay: "600ms" }}
        >
          <div className="flex flex-col items-center text-center animate-feature-icon">
            <div className="w-12 h-12 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Excellence</h3>
          </div>
          
          <div className="flex flex-col items-center text-center animate-feature-icon" style={{ animationDelay: "150ms" }}>
            <div className="w-12 h-12 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                <circle cx="12" cy="12" r="8"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Quality</h3>
          </div>
          
          <div className="flex flex-col items-center text-center animate-feature-icon" style={{ animationDelay: "300ms" }}>
            <div className="w-12 h-12 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Innovation</h3>
          </div>
          
          <div className="flex flex-col items-center text-center animate-feature-icon" style={{ animationDelay: "450ms" }}>
            <div className="w-12 h-12 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Customer Focus</h3>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-iconic-gold">
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
