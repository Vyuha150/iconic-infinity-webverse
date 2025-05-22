
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");

  // Extract hash from URL to activate specific tab
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && verticals.some((vertical) => vertical.id === hash)) {
      setActiveTab(hash);
      // Scroll to the tab content
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setActiveTab("all");
    }
  }, [location.hash]);

  // Animation for on-scroll reveal
  useEffect(() => {
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
  }, [activeTab]);

  const verticals = [
    {
      id: "staymore",
      name: "Stay More",
      tagline: "Add Life",
      description:
        "Stay More transforms living spaces into luxurious, comfortable environments through premium interior design solutions and home furnishings. Our expert team creates personalized designs that reflect your unique style and preferences, enhancing your quality of life and adding value to your property.",
      services: [
        "Interior Design Consultations",
        "Custom Furniture Solutions",
        "Home Decor & Accessories",
        "Space Optimization",
        "Luxury Living Concepts",
      ],
      image:
        "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: "ojas",
      name: "OJAS",
      tagline: "Quality you can trust",
      description:
        "OJAS delivers premium ready-made concrete solutions with uncompromising quality for construction projects of all sizes. Our state-of-the-art manufacturing facilities and rigorous quality control ensure consistent, durable concrete mixes that meet the highest industry standards, providing the foundation for structures that stand the test of time.",
      services: [
        "Ready-Mix Concrete Supply",
        "Custom Concrete Formulations",
        "Quality Testing & Certification",
        "On-Site Concrete Solutions",
        "Sustainable Concrete Options",
      ],
      image:
        "https://images.unsplash.com/photo-1603251579711-3e2c1c2b42b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: "avani",
      name: "Avani",
      tagline: "Your first step",
      description:
        "Avani offers a premium collection of tiles for residential and commercial spaces, providing the perfect foundation for any design vision. Our extensive range features innovative designs, sustainable materials, and exceptional durability, ensuring your spaces not only look stunning but also stand up to the demands of everyday life.",
      services: [
        "Premium Tile Collections",
        "Design Consultation",
        "Custom Tile Solutions",
        "Professional Installation",
        "Maintenance Products & Services",
      ],
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    },
    {
      id: "yatra",
      name: "Yatra",
      tagline: "Journey begins here",
      description:
        "Yatra provides cutting-edge escalator and elevator solutions that combine safety, efficiency, and elegant design. Our advanced mobility systems are designed to enhance the flow of people in buildings while offering reliability and energy efficiency, making every vertical journey smooth and secure.",
      services: [
        "Custom Elevator Solutions",
        "Escalator Systems",
        "Maintenance & Servicing",
        "Modernization & Upgrades",
        "24/7 Emergency Support",
      ],
      image:
        "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: "ohoofoods",
      name: "Ohoo Foods",
      tagline: "Aha emi ruchi",
      description:
        "Ohoo Foods crafts authentic, flavorful pickles using traditional recipes and the finest ingredients. Our preservative-free pickling process ensures that every jar delivers an explosion of taste that enhances your dining experience, bringing the rich culinary heritage of India to your table.",
      services: [
        "Authentic Pickle Collections",
        "Preservative-Free Products",
        "Custom Gift Hampers",
        "Bulk Supply for Restaurants",
        "Subscription Services",
      ],
      image:
        "https://images.unsplash.com/photo-1564844536306-3bdb4a68a778?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: "righthomes",
      name: "Right Homes",
      tagline: "You name it, we make it",
      description:
        "Right Homes transforms your dream home into reality with customized construction solutions that prioritize quality craftsmanship, innovative design, and sustainable building practices. Our end-to-end approach ensures a seamless experience from concept to completion, delivering spaces that perfectly align with your vision and lifestyle needs.",
      services: [
        "Custom Home Construction",
        "Architectural Design",
        "Interior & Exterior Finishing",
        "Sustainable Building Solutions",
        "Project Management",
      ],
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    },
    {
      id: "hotels",
      name: "Hotels (Sare)",
      tagline: "Your comfort is our priority",
      description:
        "Sare Hotels delivers exceptional hospitality experiences where comfort and luxury meet attention to detail. Our properties offer a perfect blend of modern amenities, personalized service, and strategic locations, creating memorable stays for business and leisure travelers alike.",
      services: [
        "Luxury Accommodations",
        "Fine Dining Experiences",
        "Conference & Event Facilities",
        "Wellness & Recreation",
        "Personalized Concierge Services",
      ],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: "wow",
      name: "WOW",
      tagline: "Let's drink it",
      description:
        "WOW delivers premium mineral water and distilled beverages that prioritize purity, taste, and health. Our advanced filtration processes and quality controls ensure every drop meets the highest standards, providing refreshing hydration options for homes, offices, and events.",
      services: [
        "Purified Mineral Water",
        "Premium Distilled Beverages",
        "Home & Office Delivery",
        "Custom Branded Options",
        "Water Purification Systems",
      ],
      image:
        "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    },
    {
      id: "allinone",
      name: "All in One",
      tagline: "Let's enjoy",
      description:
        "All in One creates comprehensive activity and amenity centers where communities come together for recreation, wellness, and entertainment. Our multi-purpose facilities offer something for everyone, from fitness enthusiasts to families seeking quality time together, all under one convenient roof.",
      services: [
        "Sports & Recreation Facilities",
        "Family Entertainment Centers",
        "Wellness & Fitness Studios",
        "Event Spaces",
        "Community Programs",
      ],
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1693&q=80",
    },
    {
      id: "empire",
      name: "The Empire",
      tagline: "Where impossible is made possible",
      description:
        "The Empire schools redefine education by combining academic excellence with character development and real-world skills. Our holistic approach nurtures each student's unique potential through innovative teaching methods, state-of-the-art facilities, and a supportive environment that prepares them for future success.",
      services: [
        "K-12 Education",
        "STEM-Focused Programs",
        "Arts & Humanities",
        "Sports & Extracurricular Activities",
        "College & Career Counseling",
      ],
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: "vertex",
      name: "ICONIC Vertex",
      tagline: "Redefining technologies",
      description:
        "ICONIC Vertex delivers cutting-edge software and IT solutions that empower businesses to thrive in the digital age. Our team of expert developers and consultants create tailored applications, implement robust infrastructure, and provide strategic technology guidance that drives innovation and operational excellence.",
      services: [
        "Custom Software Development",
        "IT Consulting & Strategy",
        "Cloud Solutions",
        "Mobile Application Development",
        "Digital Transformation Services",
      ],
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-iconic-blue/10 to-white dark:from-iconic-blue/20 dark:to-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-iconic-blue">Verticals</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Explore ICONIC Infinity Group's diverse portfolio of businesses,
                each delivering excellence in their respective domains.
              </p>
            </div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="overflow-x-auto mb-10">
                <TabsList className="bg-gray-100 dark:bg-iconic-slate/50 p-1 inline-flex min-w-max">
                  <TabsTrigger value="all" className="rounded-md px-4 py-2 text-sm font-medium">
                    All Verticals
                  </TabsTrigger>
                  {verticals.map((vertical) => (
                    <TabsTrigger 
                      key={vertical.id} 
                      value={vertical.id}
                      className="rounded-md px-4 py-2 text-sm font-medium"
                    >
                      {vertical.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-16 animate-on-scroll">
                {verticals.map((vertical, index) => (
                  <div
                    key={vertical.id}
                    id={vertical.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                      index !== 0 ? "pt-16 border-t border-gray-200 dark:border-gray-800" : ""
                    }`}
                  >
                    <div className={`${index % 2 === 0 ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img
                          src={vertical.image}
                          alt={vertical.name}
                          className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className={`${index % 2 === 0 ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
                      <h2 className="text-3xl font-bold mb-2">{vertical.name}</h2>
                      <p className="text-iconic-blue font-medium italic mb-4">"{vertical.tagline}"</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {vertical.description}
                      </p>
                      
                      <h3 className="text-xl font-semibold mb-3">Our Offerings</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {vertical.services.map((service, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-iconic-blue mr-2"></div>
                            <span className="text-gray-700 dark:text-gray-300">{service}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        asChild
                        className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
                      >
                        <Link to={`/contact?service=${vertical.id}`}>Inquire Now</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {verticals.map((vertical) => (
                <TabsContent key={vertical.id} value={vertical.id} className="animate-on-scroll">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="overflow-hidden rounded-lg shadow-lg">
                        <img
                          src={vertical.image}
                          alt={vertical.name}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{vertical.name}</h2>
                      <p className="text-iconic-blue font-medium italic mb-4">"{vertical.tagline}"</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {vertical.description}
                      </p>
                      
                      <h3 className="text-xl font-semibold mb-3">Our Offerings</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {vertical.services.map((service, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-iconic-blue mr-2"></div>
                            <span className="text-gray-700 dark:text-gray-300">{service}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="space-x-4">
                        <Button
                          asChild
                          className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
                        >
                          <Link to={`/contact?service=${vertical.id}`}>Inquire Now</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-iconic-blue text-iconic-blue hover:bg-iconic-blue/10"
                        >
                          <Link to="/portfolio">View Projects</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Why Choose ICONIC</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Across all our verticals, we offer distinct advantages that set us apart
                and ensure an exceptional experience for our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-iconic-slate/50 p-8 rounded-lg shadow-md animate-on-scroll">
                <div className="w-14 h-14 bg-iconic-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-iconic-blue"
                  >
                    <path d="m9 12 2 2 4-4"></path>
                    <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path>
                    <path d="M22 19H2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">End-to-End Support</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We provide comprehensive support from initial consultation through
                  project completion and beyond, ensuring a seamless experience at every
                  step.
                </p>
              </div>

              <div className="bg-white dark:bg-iconic-slate/50 p-8 rounded-lg shadow-md animate-on-scroll">
                <div className="w-14 h-14 bg-iconic-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-iconic-blue"
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Innovative Approach</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our dedicated Innovation Committee and R&D team ensure that we stay
                  ahead of industry trends, bringing you the latest methodologies and
                  technologies.
                </p>
              </div>

              <div className="bg-white dark:bg-iconic-slate/50 p-8 rounded-lg shadow-md animate-on-scroll">
                <div className="w-14 h-14 bg-iconic-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-iconic-blue"
                  >
                    <path d="M6 18h8"></path>
                    <path d="M3 22h18"></path>
                    <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
                    <path d="M9 14h2"></path>
                    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
                    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We prioritize quality over profits, implementing rigorous quality
                  control measures to ensure every product and service meets the highest
                  standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="mb-6">
                  Connect with our team to discuss your specific needs and discover how
                  ICONIC Infinity Group can deliver exceptional solutions tailored to your
                  requirements.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate"
                >
                  <Link to="/contact">Contact Us Today</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-on-scroll">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Consultation</h3>
                  <p className="text-white/80">
                    Schedule a free consultation to discuss your project requirements.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Custom Solutions</h3>
                  <p className="text-white/80">
                    Get tailored solutions designed specifically for your unique needs.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Support</h3>
                  <p className="text-white/80">
                    Experience our industry-leading customer support and service.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Satisfaction</h3>
                  <p className="text-white/80">
                    Join our growing list of satisfied customers across all verticals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
