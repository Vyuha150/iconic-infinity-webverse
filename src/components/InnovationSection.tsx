
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InnovationSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const innovations = [
    {
      title: "R&D Excellence",
      description:
        "Our dedicated Research & Development team spearheads innovation across all verticals, bringing cutting-edge technologies and methodologies to the market.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-iconic-blue"
        >
          <path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 0 1-20 0 12 12 0 0 1 24 0"></path>
        </svg>
      ),
    },
    {
      title: "Innovative Committee",
      description:
        "Our Innovation Committee consists of industry experts who consistently identify and implement cutting-edge solutions to anticipate future market trends.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-iconic-blue"
        >
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m9 10 2 2 4-4"></path>
        </svg>
      ),
    },
    {
      title: "Customer-Centric Technologies",
      description:
        "We deploy state-of-the-art technologies that enhance customer experience, focusing on seamless interactions and value delivery across all touchpoints.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-iconic-blue"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "End-to-End Support",
      description:
        "Our streamlined workflow provides comprehensive support throughout the customer journey, ensuring excellence from initial contact through delivery and beyond.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-iconic-blue"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" x2="19" y1="8" y2="14"></line>
          <line x1="22" x2="16" y1="11" y2="11"></line>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // Animation for on-scroll reveal with sliding effect
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-iconic-dark dark:to-iconic-slate section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Innovation is in Our <span className="text-iconic-blue">DNA</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            ICONIC Infinity Group has a dedicated Innovation Committee and R&D
            team that brings world-class methodologies, technologies, and
            procedures into our organization, delivering exceptional customer
            experiences through our products and services.
          </p>
        </div>

        {/* Cards Grid with sliding animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {innovations.map((innovation, index) => (
            <div
              key={index}
              className={`framer-s1zh1p-container animate-on-scroll opacity-0 transition-all duration-700 ease-out ${
                index % 2 === 0 ? 'translate-x-[-32px]' : 'translate-x-[32px]'
              }`}
              style={{ 
                animationDelay: `${index * 150}ms`
              }}
            >
              <Card
                className={`group relative overflow-hidden border-0 bg-white/50 dark:bg-iconic-slate/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-iconic-blue/20 h-full ${
                  hoveredCard === index
                    ? "bg-gradient-to-br from-iconic-blue/5 to-iconic-gold/5 dark:from-iconic-blue/10 dark:to-iconic-gold/10"
                    : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Subtle gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-iconic-blue/20 via-transparent to-iconic-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      hoveredCard === index
                        ? "bg-iconic-blue/10 scale-110"
                        : "bg-gray-100 dark:bg-iconic-slate/70"
                    }`}>
                      {innovation.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-iconic-blue transition-colors duration-300">
                      {innovation.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                    {innovation.description}
                  </CardDescription>
                </CardContent>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-iconic-blue to-iconic-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center animate-on-scroll">
          <Button
            asChild
            className="bg-iconic-blue hover:bg-iconic-blue/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-iconic-blue/30"
          >
            <Link to="/innovation">Explore More Innovations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
