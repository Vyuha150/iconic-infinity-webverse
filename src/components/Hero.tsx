
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThreeCanvas from "./ThreeCanvas";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a short delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Animation for text elements with progressive reveal
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
    });

    return () => {
      clearTimeout(timer);
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Typewriter effect text
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Driven by excellence, quality, and innovation";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-iconic-dark via-iconic-dark/80 to-iconic-dark">
      {/* 3D Background */}
      <ThreeCanvas />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-iconic-gold/20 animate-pulse absolute -top-2 -left-2 md:-top-4 md:-left-4"></div>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-iconic-gold/10 flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold animate-float">
                  <path d="M18 6h-5c-1.1 0-2 .9-2 2v8"></path>
                  <path d="M13 6h-2c-1.1 0-2 .9-2 2v8"></path>
                  <path d="M18 18h-5c-1.1 0-2-.9-2-2"></path>
                  <path d="M8 8v8"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-iconic-gold opacity-100 animate-on-load relative"
            style={{ animationDelay: "200ms" }}
          >
            ICONIC Infinity Group
            <span className="block mt-4 text-iconic-gold text-2xl md:text-3xl lg:text-4xl">
              Face of the Future
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-iconic-gold/30"></span>
            </span>
          </h1>
          
          <div className="my-8 h-6 text-white/90 text-lg md:text-xl">
            <span className="inline-block border-r-2 border-iconic-gold/70 pr-1 animate-pulse">{typewriterText}</span>
          </div>
          
          <div 
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-100 animate-on-load mt-12 sm:mt-24" 
            style={{ animationDelay: "400ms" }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-iconic-gold hover:bg-iconic-gold/90 text-iconic-dark font-medium group transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to="/services" className="flex items-center gap-2">
                Explore Our Services
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Get In Touch
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                </svg>
              </Link>
            </Button>
          </div>
        </div>

        <div 
          className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-on-load"
          style={{ animationDelay: "600ms" }}
        >
          <div className="feature-card">
            <div className="w-14 h-14 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow relative group">
              <div className="absolute inset-0 rounded-full bg-iconic-gold/5 transform scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold relative z-10">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Excellence</h3>
          </div>
          
          <div className="feature-card" style={{ animationDelay: "150ms" }}>
            <div className="w-14 h-14 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow relative group">
              <div className="absolute inset-0 rounded-full bg-iconic-gold/5 transform scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold relative z-10">
                <circle cx="12" cy="12" r="8"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Quality</h3>
          </div>
          
          <div className="feature-card" style={{ animationDelay: "300ms" }}>
            <div className="w-14 h-14 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow relative group">
              <div className="absolute inset-0 rounded-full bg-iconic-gold/5 transform scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold relative z-10">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
            <h3 className="font-semibold text-white">Innovation</h3>
          </div>
          
          <div className="feature-card" style={{ animationDelay: "450ms" }}>
            <div className="w-14 h-14 rounded-full bg-iconic-gold/10 flex items-center justify-center mb-3 hover-glow relative group">
              <div className="absolute inset-0 rounded-full bg-iconic-gold/5 transform scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold relative z-10">
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

      {/* Floating particles background */}
      <div className="absolute inset-0 z-0 opacity-10">
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={index}
            className="absolute w-1.5 h-1.5 rounded-full bg-iconic-gold"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-iconic-gold hover:text-white transition-colors duration-300">
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
