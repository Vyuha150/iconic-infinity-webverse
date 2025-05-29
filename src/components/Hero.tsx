
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RubiksCube from "./RubiksCube";
import { Star, Target, Zap, Users, ArrowRight, Sparkles } from "lucide-react";

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

  const coreValues = [
    {
      icon: Star,
      title: "Excellence",
      description: "Uncompromising quality"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Strategic focus"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Future-ready solutions"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Relationship driven"
    }
  ];

  // Aries constellation coordinates (simplified version)
  const ariesStars = [
    { x: 20, y: 25, brightness: 1 },
    { x: 35, y: 30, brightness: 0.8 },
    { x: 45, y: 20, brightness: 0.9 },
    { x: 60, y: 35, brightness: 0.7 },
    { x: 75, y: 25, brightness: 0.8 },
    { x: 80, y: 45, brightness: 0.6 },
    { x: 85, y: 60, brightness: 0.9 }
  ];

  const ariesConnections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white dark:bg-iconic-dark overflow-hidden pt-16">
      {/* Aries Constellation Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-iconic-dark dark:via-iconic-slate/20 dark:to-iconic-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.15),transparent_50%)]"></div>
          
          {/* Aries Constellation */}
          <div className="absolute inset-0">
            {/* Aries Stars */}
            {ariesStars.map((star, i) => (
              <div
                key={`aries-star-${i}`}
                className="absolute w-2 h-2 bg-iconic-gold rounded-full animate-pulse"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: star.brightness,
                  filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))'
                }}
              />
            ))}
            
            {/* Aries Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
              {ariesConnections.map((connection, i) => {
                const [startIdx, endIdx] = connection;
                const start = ariesStars[startIdx];
                const end = ariesStars[endIdx];
                return (
                  <line
                    key={`aries-line-${i}`}
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${end.x}%`}
                    y2={`${end.y}%`}
                    stroke="rgba(255, 215, 0, 0.6)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Additional Random Stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={`random-star-${i}`}
                className="absolute w-1 h-1 bg-iconic-gold rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: 0.2 + Math.random() * 0.5
                }}
              />
            ))}
          </div>
          
          {/* Enhanced Sparkles with motion */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              >
                <Sparkles 
                  className="w-2 h-2 text-iconic-gold opacity-40 animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.6))',
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Heading - Single Line */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="opacity-0 animate-on-load text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                <span className="bg-gradient-to-r from-iconic-blue via-iconic-gold to-iconic-blue bg-clip-text text-transparent">
                  ICONIC Infinity Group
                </span>
              </h1>
              
              {/* Enhanced Content with better hierarchy */}
              <div className="opacity-0 animate-on-load space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                  Face of the Future
                </h2>
                
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Excellence, quality and innovation across multiple verticals
                </p>
                
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                  A multi-domain enterprise delivering cutting-edge solutions in technology, design, sustainability, and construction.
                </p>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="opacity-0 animate-on-load flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg" 
                className="group bg-gradient-to-r from-iconic-blue to-iconic-blue/90 hover:from-iconic-blue/90 hover:to-iconic-blue text-white font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-iconic-blue/30 hover:scale-105"
              >
                <Link to="/services" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explore Our Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="group border-2 border-iconic-gold/50 text-gray-900 dark:text-white hover:bg-iconic-gold/10 hover:border-iconic-gold font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-iconic-gold/20 hover:scale-105"
              >
                <Link to="/about" className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced Rubik's Cube */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-[600px] opacity-0 animate-on-load">
              <RubiksCube />
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section at Bottom */}
      <div className="relative z-10 py-16 border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className="opacity-0 animate-on-load text-center group cursor-pointer"
                style={{ animationDelay: `${index * 100 + 800}ms` }}
              >
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-iconic-gold/20 to-iconic-blue/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-iconic-gold/30"></div>
                  <div className="relative flex items-center justify-center w-full h-full">
                    <value.icon className="w-8 h-8 text-iconic-gold transition-all duration-300 group-hover:text-iconic-blue group-hover:scale-110" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-iconic-blue">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
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
