
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InnovationSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const innovations = [
    {
      title: "R&D Excellence",
      description:
        "Our dedicated Research & Development team spearheads innovation across all verticals, bringing cutting-edge technologies and methodologies to the market.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % innovations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [innovations.length]);

  useEffect(() => {
    // Animation for on-scroll reveal
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
          <p className="text-gray-700 dark:text-gray-300">
            ICONIC Infinity Group has a dedicated Innovation Committee and R&D
            team that brings world-class methodologies, technologies, and
            procedures into our organization, delivering exceptional customer
            experiences through our products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Animated Innovation Display */}
          <div className="order-2 lg:order-1 animate-on-scroll">
            <div className="bg-white dark:bg-iconic-slate/50 rounded-2xl shadow-xl overflow-hidden">
              {/* Innovation Cards (Mobile Carousel) */}
              {isMobile ? (
                <div className="p-8">
                  <div className="flex items-center mb-4 text-iconic-blue">
                    {innovations[activeIndex].icon}
                    <h3 className="text-xl font-bold ml-3">
                      {innovations[activeIndex].title}
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {innovations[activeIndex].description}
                  </p>

                  {/* Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {innovations.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === activeIndex
                            ? "bg-iconic-blue"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        onClick={() => setActiveIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 p-8">
                  {innovations.map((innovation, index) => (
                    <div
                      key={index}
                      className={`p-5 rounded-lg transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-iconic-blue/10 border-l-4 border-iconic-blue scale-105"
                          : "bg-gray-50 dark:bg-iconic-slate/80 hover:bg-iconic-blue/5 dark:hover:bg-iconic-slate cursor-pointer"
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className={`flex items-center mb-3 ${
                          activeIndex === index
                            ? "text-iconic-blue"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {innovation.icon}
                        <h3 className="text-lg font-semibold ml-3">
                          {innovation.title}
                        </h3>
                      </div>
                      <p
                        className={`text-sm ${
                          activeIndex === index
                            ? "text-gray-700 dark:text-gray-200"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {innovation.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Button
                asChild
                className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
              >
                <Link to="/innovation">Explore More Innovations</Link>
              </Button>
            </div>
          </div>

          {/* Illustration/Graphic */}
          <div className="order-1 lg:order-2 animate-on-scroll flex justify-center items-center">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-iconic-blue/20 rounded-full animate-pulse"></div>
              <div className="relative w-80 h-80 bg-gradient-to-br from-iconic-blue to-iconic-gold rounded-full flex items-center justify-center animate-spin-slow">
                <div className="absolute inset-4 bg-white dark:bg-iconic-slate rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-iconic-blue">I</span>
                </div>
                
                {/* Orbiting features */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-iconic-slate rounded-full shadow-lg flex items-center justify-center animate-float">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-blue">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white dark:bg-iconic-slate rounded-full shadow-lg flex items-center justify-center animate-float" style={{animationDelay: "1s"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                </div>
                
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-iconic-slate rounded-full shadow-lg flex items-center justify-center animate-float" style={{animationDelay: "1.5s"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-blue">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-iconic-slate rounded-full shadow-lg flex items-center justify-center animate-float" style={{animationDelay: "0.5s"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iconic-gold">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
