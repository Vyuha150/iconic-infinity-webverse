
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreHorizontal, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for transparent to solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Innovation", path: "/innovation" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 dark:bg-iconic-dark/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 z-60 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-iconic-gold/30 to-iconic-blue/30 p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-iconic-gold/40">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-iconic-gold/20 to-iconic-blue/20 blur-sm"></div>
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-iconic-gold/10 to-iconic-blue/10 p-1">
                  <img 
                    src="/lovable-uploads/4fa324e0-d92d-45ae-92ab-42b0e8a621a1.png" 
                    alt="ICONIC Infinity Group Logo" 
                    className="w-full h-full object-contain filter brightness-125 contrast-110 drop-shadow-lg transition-all duration-300 group-hover:brightness-150"
                    style={{
                      filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 8px rgba(255, 215, 0, 0.3))'
                    }}
                  />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-iconic-blue to-iconic-gold bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                ICONIC Infinity Group
              </span>
            </Link>

            {/* Enhanced Three Dots Menu Button with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-3 rounded-full bg-iconic-blue/10 hover:bg-iconic-blue/20 backdrop-blur-sm border border-iconic-blue/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-iconic-gold/30 z-60 group"
                >
                  {isOpen ? (
                    <X className="w-6 h-6 text-iconic-gold transition-transform duration-300 group-hover:rotate-90" style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
                    }} />
                  ) : (
                    <MoreHorizontal className="w-6 h-6 text-iconic-gold transition-transform duration-300 group-hover:scale-110" style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
                    }} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-iconic-dark text-white border-iconic-gold/20">
                <p>Menu</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Horizontal Expanding Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-all duration-700 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Horizontal Menu Container */}
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out pointer-events-auto ${
            isOpen 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 -translate-y-4"
          }`}
        >
          <div className="bg-white/95 dark:bg-iconic-dark/95 backdrop-blur-md rounded-2xl shadow-2xl border border-iconic-gold/20 overflow-hidden">
            {/* Navigation Links */}
            <div className="flex items-center px-6 py-4">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className={`transition-all duration-500 ease-out ${
                    isOpen 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-3 mx-1 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      location.pathname === link.path
                        ? "bg-iconic-blue/20 text-iconic-blue shadow-md border border-iconic-blue/30"
                        : "text-gray-700 dark:text-gray-300 hover:bg-iconic-gold/10 hover:text-iconic-blue"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              
              {/* CTA Button */}
              <div
                className={`ml-4 transition-all duration-500 ease-out ${
                  isOpen 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-8"
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${navLinks.length * 100}ms` : '0ms'
                }}
              >
                <Button
                  asChild
                  className="bg-iconic-blue hover:bg-iconic-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
