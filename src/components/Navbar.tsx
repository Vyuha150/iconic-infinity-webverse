
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Innovation", path: "/innovation" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/95 dark:bg-iconic-dark/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-iconic-gold/20 to-iconic-blue/20 p-2">
              <img 
                src="/lovable-uploads/4fa324e0-d92d-45ae-92ab-42b0e8a621a1.png" 
                alt="ICONIC Infinity Group Logo" 
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-iconic-blue to-iconic-gold bg-clip-text text-transparent">
              ICONIC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === link.path
                    ? "text-iconic-blue after:scale-x-100"
                    : "text-gray-700 dark:text-gray-300 hover:text-iconic-blue"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-iconic-blue hover:bg-iconic-blue/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-iconic-blue hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <div
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                  }`}
                />
                <div
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                    isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 dark:bg-iconic-slate/95 shadow-xl backdrop-blur-md rounded-b-2xl mx-4">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === link.path
                    ? "bg-iconic-blue/10 text-iconic-blue shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-iconic-blue"
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                }}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-2">
              <Button
                asChild
                className="w-full bg-iconic-blue hover:bg-iconic-blue/90 text-white transition-all duration-300 hover:scale-105"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .nav-link {
            position: relative;
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -4px;
            left: 0;
            background: linear-gradient(90deg, #4F46E5, #FFD700);
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.3s ease-out;
          }
          
          .nav-link:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
