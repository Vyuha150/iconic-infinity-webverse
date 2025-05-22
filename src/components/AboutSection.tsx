
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
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

  const stats = [
    { value: "12+", label: "Business Verticals" },
    { value: "10+", label: "Years of Excellence" },
    { value: "1000+", label: "Satisfied Customers" },
    { value: "150+", label: "Expert Professionals" },
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-iconic-dark">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building Customer-Friendly Brands with{" "}
              <span className="text-iconic-blue">Excellence</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              ICONIC Infinity Group is driven by a passion for excellence,
              quality, and innovation. We build brands that put customers first,
              prioritizing quality over profits to deliver exceptional
              experiences across multiple verticals.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Our dedicated Innovation Committee and R&D team consistently bring
              world-class methodologies and technologies into our organization,
              ensuring we stay at the forefront of industry advancements and
              deliver unmatched value to our customers.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-iconic-blue mt-1"></div>
                <div className="ml-4">
                  <h3 className="font-semibold">Customer-First Approach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We design all our products and services with the customer's
                    needs at the center.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-iconic-gold mt-1"></div>
                <div className="ml-4">
                  <h3 className="font-semibold">Quality Above All</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We never compromise on quality, ensuring every product and
                    service meets the highest standards.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-iconic-blue mt-1"></div>
                <div className="ml-4">
                  <h3 className="font-semibold">Continuous Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our R&D team constantly explores new technologies to enhance
                    customer experiences.
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="animate-on-scroll">
            <div className="relative">
              {/* Background pattern */}
              <div className="absolute -right-6 -bottom-6 w-64 h-64 bg-iconic-blue/10 rounded-lg"></div>
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="ICONIC Infinity Group Headquarters"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-3">
                    Our Impact in Numbers
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-iconic-gold text-2xl font-bold">
                          {stat.value}
                        </div>
                        <div className="text-white text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
