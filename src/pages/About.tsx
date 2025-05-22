
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
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

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "ICONIC Infinity Group was established with a vision to create customer-friendly brands focused on quality and innovation.",
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Launched multiple verticals, including Stay More and OJAS, to diversify our portfolio and reach more customers.",
    },
    {
      year: "2015",
      title: "Innovation Committee",
      description: "Established our dedicated Innovation Committee and R&D team to spearhead technological advancements.",
    },
    {
      year: "2018",
      title: "Regional Leader",
      description: "Became the first company in Andhra Pradesh to implement a streamlined end-to-end customer support workflow.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Integrated cutting-edge digital technologies across all verticals to enhance customer experience.",
    },
    {
      year: "2023",
      title: "Global Vision",
      description: "Expanded our market presence with a forward-looking strategy to become a globally recognized brand.",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from the smallest details to the grandest projects.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      title: "Quality",
      description: "Quality is never compromised. We prioritize delivering the highest standards in all our products and services.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 12 2 2 4-4"></path>
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z"></path>
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "We embrace innovation as a core driver of our growth, constantly seeking new ways to improve our offerings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8"></path>
          <path d="m4.93 10.93 1.41 1.41"></path>
          <path d="M2 18h2"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-1.41 1.41"></path>
          <path d="M22 22H2"></path>
          <path d="m16 6-4 4-4-4"></path>
          <path d="M16 18a4 4 0 0 0-8 0"></path>
        </svg>
      ),
    },
    {
      title: "Customer-Centric",
      description: "Our customers are at the heart of everything we do. Their satisfaction is our ultimate measure of success.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Integrity",
      description: "We conduct our business with the highest level of integrity, transparency, and ethical standards.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
      ),
    },
    {
      title: "Sustainability",
      description: "We are committed to sustainable practices that benefit our customers, communities, and the environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22a8 8 0 0 1 11.33-7.27"></path>
          <path d="M9 10a7.66 7.66 0 0 0-2.51-5.27C4.13 2.4 2 3.25 2 5.5a7.49 7.49 0 0 0 10 7.13"></path>
          <path d="M22 22a8 8 0 0 0-11.33-7.27"></path>
          <path d="M15 10a7.66 7.66 0 0 1 2.51-5.27C19.87 2.4 22 3.25 22 5.5a7.49 7.49 0 0 1-10 7.13"></path>
        </svg>
      ),
    },
  ];

  const leadership = [
    {
      name: "Aditya Rao",
      title: "CEO & Founder",
      bio: "Visionary leader with 20+ years of experience in building customer-centric organizations.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Priya Sharma",
      title: "Chief Innovation Officer",
      bio: "Innovation expert who leads our R&D team in developing cutting-edge solutions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    },
    {
      name: "Raj Kumar",
      title: "Chief Operations Officer",
      bio: "Operations specialist with extensive experience in streamlining business processes.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
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
                About <span className="text-iconic-blue">ICONIC Infinity</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                We are a customer-focused organization committed to excellence,
                quality, and innovation across multiple verticals.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  ICONIC Infinity Group was founded with a vision to create
                  customer-friendly brands that prioritize quality over profits.
                  Over the years, we have grown into a multi-vertical organization
                  with a strong presence in multiple industries.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our journey began with a simple belief: that businesses should
                  put customers first and deliver exceptional experiences through
                  quality products and services. This belief has guided our growth
                  and expansion into diverse verticals, each upholding our core
                  values.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, ICONIC Infinity Group stands as a testament to the power
                  of innovation, quality, and customer-centricity, setting new
                  standards in every industry we enter. Our dedicated Innovation
                  Committee and R&D team continue to push boundaries, bringing
                  world-class methodologies and technologies to our customers.
                </p>
              </div>
              <div className="relative animate-on-scroll">
                {/* Background element */}
                <div className="absolute -left-6 -bottom-6 w-3/4 h-3/4 bg-iconic-blue/10 rounded-lg"></div>
                
                {/* Main image */}
                <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="ICONIC Infinity Team"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These principles guide everything we do at ICONIC Infinity Group,
                from strategic decisions to day-to-day operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-iconic-slate/50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-iconic-blue mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 bg-white dark:bg-iconic-dark overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Decorative line for timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-32 bottom-28 w-1 bg-iconic-blue/20 hidden md:block"></div>
            
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Key milestones in ICONIC Infinity Group's evolution toward becoming the face of the future.
              </p>
            </div>
            
            <div className="space-y-12 relative">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center animate-on-scroll`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`md:w-1/2 p-4 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="inline-block px-4 py-2 bg-iconic-blue text-white rounded-full mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{milestone.description}</p>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-iconic-blue border-4 border-white dark:border-iconic-dark"></div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Meet the visionaries driving ICONIC Infinity Group's mission to deliver excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-iconic-slate/50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-iconic-blue">{leader.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{leader.title}</p>
                    <p className="text-gray-700 dark:text-gray-300">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="mb-6">
                  We're always looking for talented individuals who share our
                  passion for excellence, innovation, and customer-centricity.
                  Join us in our mission to be the face of the future.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate"
                >
                  <Link to="/career">View Open Positions</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 animate-on-scroll">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Innovation Culture</h3>
                  <p className="text-white/80">
                    Be part of a team that's constantly pushing boundaries and
                    exploring new possibilities.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                  <p className="text-white/80">
                    Develop your skills and advance your career with our
                    continuous learning programs.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Diverse Environment</h3>
                  <p className="text-white/80">
                    Work in a diverse and inclusive environment that values
                    different perspectives.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Meaningful Impact</h3>
                  <p className="text-white/80">
                    Make a real difference in people's lives through our
                    customer-focused initiatives.
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

export default About;
