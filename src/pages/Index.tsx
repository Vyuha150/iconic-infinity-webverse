
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import InnovationSection from "@/components/InnovationSection";
import VerticalCard from "@/components/VerticalCard";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Animation for on-scroll reveal
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => {
      observer.current?.observe(el);
    });

    return () => {
      elementsToAnimate.forEach((el) => {
        observer.current?.unobserve(el);
      });
    };
  }, []);

  // Featured verticals data
  const featuredVerticals = [
    {
      title: "Stay More",
      tagline: "Add Life",
      description:
        "Stay More enhances your living experience with premium interior design solutions and home furnishings that transform your space into a sanctuary of comfort and style.",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      link: "/services#staymore",
    },
    {
      title: "OJAS",
      tagline: "Quality you can trust",
      description:
        "OJAS delivers premium ready-made concrete solutions with uncompromising quality for construction projects of all scales, ensuring durability and reliability in every pour.",
      imageUrl:
        "https://images.unsplash.com/photo-1603251579711-3e2c1c2b42b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      link: "/services#ojas",
    },
    {
      title: "Right Homes",
      tagline: "You name it, we make it",
      description:
        "Right Homes turns your dream home into reality with customized construction solutions that prioritize quality craftsmanship, innovative design, and sustainable building practices.",
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
      link: "/services#righthomes",
    },
  ];

  // Services data
  const services = [
    {
      title: "Comprehensive Portfolio",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 14v1"></path>
          <path d="M9 19v2"></path>
          <path d="M9 3V1"></path>
          <path d="M9 9V5"></path>
          <path d="M15 14v1"></path>
          <path d="M15 19v2"></path>
          <path d="M15 3V1"></path>
          <path d="M15 9V5"></path>
        </svg>
      ),
      description:
        "Access our extensive portfolio showcasing our diverse verticals, completed projects, and success stories across multiple industries.",
      link: "/portfolio",
    },
    {
      title: "Innovative Solutions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22v-5"></path>
          <path d="M9 7V2"></path>
          <path d="M15 7V2"></path>
          <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0v-2a3 3 0 0 0-6 0v7"></path>
        </svg>
      ),
      description:
        "Experience our world-class innovative methodologies, technologies, and procedures that deliver exceptional customer experiences.",
      link: "/innovation",
    },
    {
      title: "End-to-End Support",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
          <path d="M16 16h5v5"></path>
        </svg>
      ),
      description:
        "Benefit from our streamlined workflow providing comprehensive support throughout your customer journey, from initial contact to post-delivery.",
      link: "/services",
    },
    {
      title: "Quality Assurance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      description:
        "Experience our unwavering commitment to quality in every aspect of our business, ensuring excellence in products, services, and customer interactions.",
      link: "/about",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <AboutSection />

        {/* Verticals Section */}
        <section className="section-padding bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto container-padding">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Featured <span className="text-iconic-blue">Verticals</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Discover our diverse portfolio of businesses, each delivering
                excellence in their respective domains while maintaining our core
                values of quality, innovation, and customer-centricity.
              </p>
            </div>

            <div className="space-y-10">
              {featuredVerticals.map((vertical, index) => (
                <VerticalCard key={index} {...vertical} index={index} />
              ))}
            </div>

            <div className="text-center mt-12 animate-on-scroll">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-iconic-blue text-iconic-blue hover:bg-iconic-blue/10"
              >
                <Link to="/services">View All Verticals</Link>
              </Button>
            </div>
          </div>
        </section>

        <InnovationSection />

        {/* Services Section */}
        <section className="section-padding bg-white dark:bg-iconic-dark">
          <div className="container mx-auto container-padding">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-iconic-blue">ICONIC</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                ICONIC Infinity Group offers a range of services designed to
                deliver exceptional value and experiences to our customers across
                all verticals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto container-padding">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="text-white/90 mb-8">
                Connect with us today to learn how ICONIC Infinity Group can
                deliver exceptional products and services tailored to your needs.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate"
              >
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
