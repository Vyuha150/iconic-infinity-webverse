
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Career = () => {
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

  const openPositions = [
    {
      title: "Senior Software Developer",
      department: "ICONIC Vertex",
      location: "Amaravati, India",
      type: "Full-time",
      description: "We are seeking an experienced software developer proficient in React, Node.js, and cloud services to join our growing technology team. The ideal candidate will help build innovative solutions for our clients and internal projects."
    },
    {
      title: "Architectural Designer",
      department: "Right Homes",
      location: "Hyderabad, India",
      type: "Full-time",
      description: "Join our architectural design team to create innovative and sustainable building designs for our residential and commercial projects. The role requires proficiency in AutoCAD, 3D modeling, and a keen eye for design."
    },
    {
      title: "Marketing Manager",
      department: "ICONIC Infinity Group",
      location: "Amaravati, India",
      type: "Full-time",
      description: "Lead our marketing initiatives across all verticals, developing comprehensive strategies to enhance brand awareness, generate leads, and drive customer engagement through multiple channels."
    },
    {
      title: "Quality Assurance Engineer",
      department: "OJAS",
      location: "Amaravati, India",
      type: "Full-time",
      description: "Oversee quality control processes for our ready-mix concrete production, ensuring all products meet the highest standards of quality and consistency while complying with industry regulations."
    },
    {
      title: "Interior Design Consultant",
      department: "Stay More",
      location: "Hyderabad, India",
      type: "Full-time",
      description: "Create beautiful, functional interior designs for residential and commercial spaces. Collaborate with clients to understand their needs and translate their vision into stunning reality."
    },
    {
      title: "Customer Experience Associate",
      department: "Hotels (Sare)",
      location: "Amaravati, India",
      type: "Full-time",
      description: "Join our hospitality team to deliver exceptional customer service to our hotel guests. Ensure all guest experiences meet or exceed expectations while maintaining ICONIC's standards of excellence."
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from the quality of our products to the service we provide to our customers and the work environment we create for our employees.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We embrace innovative thinking and continuously seek new ways to improve our products, services, and processes, encouraging creative solutions to challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
          <path d="M12 12 7 4.76"></path>
          <path d="M12 12 18.01 9"></path>
          <path d="M12 12l-5.45 5.37"></path>
        </svg>
      )
    },
    {
      title: "Customer Focus",
      description: "We put our customers at the center of everything we do, listening carefully to their needs and working tirelessly to exceed their expectations at every touchpoint.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "We conduct our business with the highest level of integrity and ethical standards, building trust with our customers, partners, employees, and communities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-iconic-blue/10 to-white dark:from-iconic-blue/20 dark:to-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the <span className="text-iconic-blue">ICONIC</span> Team</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Be part of a dynamic organization that values excellence, innovation, and growth.
                Discover opportunities across our diverse portfolio of businesses.
              </p>
              <Button className="bg-iconic-blue hover:bg-iconic-blue/90">View Open Positions</Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our <span className="text-iconic-blue">Values</span></h2>
              <p className="text-gray-700 dark:text-gray-300">
                At ICONIC Infinity Group, we are guided by a set of core values that shape our culture
                and drive our success. These values are the foundation of everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 dark:bg-iconic-slate/20 p-6 rounded-lg shadow-md hover-lift">
                  <div className="text-iconic-blue mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Open <span className="text-iconic-blue">Positions</span></h2>
              <p className="text-gray-700 dark:text-gray-300">
                We're always looking for talented individuals to join our team. Check out our current openings and find your next opportunity with ICONIC Infinity Group.
              </p>
            </div>
            
            <div className="space-y-6 max-w-4xl mx-auto animate-on-scroll">
              {openPositions.map((position, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-iconic-slate/20 p-6 rounded-lg shadow-md hover-glow border border-transparent hover:border-iconic-blue/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-iconic-blue">{position.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-sm font-medium">
                        {position.department}
                      </span>
                      <span className="bg-gray-100 dark:bg-iconic-slate/50 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{position.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{position.type}</span>
                    <Button variant="outline" className="border-iconic-blue text-iconic-blue hover:bg-iconic-blue hover:text-white">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Why Work With <span className="text-iconic-blue">Us</span></h2>
              <p className="text-gray-700 dark:text-gray-300">
                At ICONIC Infinity Group, we believe in taking care of our most valuable asset—our people. 
                We offer competitive benefits and a supportive work environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
              <div className="bg-gray-50 dark:bg-iconic-slate/20 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-iconic-blue">Comprehensive Benefits</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitive salary packages
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Health and wellness programs
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Retirement plans
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Paid time off
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-iconic-slate/20 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-iconic-blue">Growth Opportunities</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Continuous learning programs
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cross-functional exposure
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Career advancement paths
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mentorship opportunities
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-iconic-slate/20 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-iconic-blue">Work Environment</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Collaborative culture
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Work-life balance
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Modern workspaces
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Inclusive team environment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow with Us?</h2>
              <p className="text-white/90 mb-8">
                Take the next step in your career journey with ICONIC Infinity Group. Explore our open positions 
                and join a team that values innovation, excellence, and personal growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate">
                  <a href="#open-positions">Browse Open Positions</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <a href="/contact">Contact Recruitment Team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Career;
