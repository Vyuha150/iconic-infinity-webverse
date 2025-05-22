
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

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
  }, [filter]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "staymore", name: "Stay More" },
    { id: "ojas", name: "OJAS" },
    { id: "avani", name: "Avani" },
    { id: "yatra", name: "Yatra" },
    { id: "ohoofoods", name: "Ohoo Foods" },
    { id: "righthomes", name: "Right Homes" },
    { id: "hotels", name: "Hotels (Sare)" },
    { id: "wow", name: "WOW" },
    { id: "allinone", name: "All in One" },
    { id: "empire", name: "The Empire" },
    { id: "vertex", name: "ICONIC Vertex" },
  ];

  const projects = [
    {
      id: 1,
      title: "Luxury Villa Interior Design",
      category: "staymore",
      categoryName: "Stay More",
      description:
        "Complete interior design and furnishing for a luxury villa in Hyderabad, featuring custom furniture and premium decor elements.",
      image:
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80",
      client: "Private Residence",
      year: "2023",
    },
    {
      id: 2,
      title: "Corporate Office Complex",
      category: "righthomes",
      categoryName: "Right Homes",
      description:
        "Design and construction of a modern 10-floor corporate office complex with sustainable features and smart building technology.",
      image:
        "https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      client: "AeroTech Industries",
      year: "2022",
    },
    {
      id: 3,
      title: "High-Rise Apartment Building",
      category: "ojas",
      categoryName: "OJAS",
      description:
        "Supply of premium ready-mix concrete for a 25-story residential apartment building, ensuring durability and structural integrity.",
      image:
        "https://images.unsplash.com/photo-1628944682084-831f35256afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1624&q=80",
      client: "Urban Heights Development",
      year: "2022",
    },
    {
      id: 4,
      title: "Premium Shopping Mall",
      category: "avani",
      categoryName: "Avani",
      description:
        "Complete flooring solution with premium tiles for a 150,000 sq ft shopping mall, featuring custom designs for different zones.",
      image:
        "https://images.unsplash.com/photo-1567449303078-57ad995a65a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      client: "Grandeur Mall",
      year: "2021",
    },
    {
      id: 5,
      title: "Hotel Elevator Modernization",
      category: "yatra",
      categoryName: "Yatra",
      description:
        "Upgrade and modernization of elevator systems for a 5-star hotel, improving efficiency, safety, and aesthetic appeal.",
      image:
        "https://images.unsplash.com/photo-1557441558-6f427b31afa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      client: "Grand Meridian Hotel",
      year: "2023",
    },
    {
      id: 6,
      title: "Artisanal Pickle Collection",
      category: "ohoofoods",
      categoryName: "Ohoo Foods",
      description:
        "Development and launch of an exclusive artisanal pickle collection featuring regional flavors and preservative-free recipes.",
      image:
        "https://images.unsplash.com/photo-1589632871394-638008b3baf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      client: "Retail Market",
      year: "2023",
    },
    {
      id: 7,
      title: "Luxury Boutique Resort",
      category: "hotels",
      categoryName: "Hotels (Sare)",
      description:
        "Development and operation of a 30-room luxury boutique resort featuring premium amenities and personalized service.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      client: "Sare Hotels",
      year: "2022",
    },
    {
      id: 8,
      title: "Multi-purpose Recreation Center",
      category: "allinone",
      categoryName: "All in One",
      description:
        "Design and development of a 50,000 sq ft recreation center featuring sports facilities, entertainment areas, and event spaces.",
      image:
        "https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      client: "City Community Services",
      year: "2021",
    },
    {
      id: 9,
      title: "Modern School Campus",
      category: "empire",
      categoryName: "The Empire",
      description:
        "Design and construction of a state-of-the-art school campus with advanced learning facilities and sports infrastructure.",
      image:
        "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
      client: "The Empire Education Trust",
      year: "2023",
    },
    {
      id: 10,
      title: "Enterprise Management System",
      category: "vertex",
      categoryName: "ICONIC Vertex",
      description:
        "Development of a custom enterprise resource planning system for a manufacturing company, streamlining operations and enhancing productivity.",
      image:
        "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      client: "PrecisionTech Industries",
      year: "2023",
    },
    {
      id: 11,
      title: "Premium Water Bottling Plant",
      category: "wow",
      categoryName: "WOW",
      description:
        "Setup of a state-of-the-art water bottling facility with advanced purification systems and automated bottling lines.",
      image:
        "https://images.unsplash.com/photo-1576702438167-5341af8f0c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      client: "WOW Beverages",
      year: "2022",
    },
    {
      id: 12,
      title: "Residential Apartment Complex",
      category: "righthomes",
      categoryName: "Right Homes",
      description:
        "Design and construction of a premium residential apartment complex with 120 units, featuring modern amenities and sustainable design.",
      image:
        "https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      client: "Green Valley Developments",
      year: "2021",
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-iconic-blue/10 to-white dark:from-iconic-blue/20 dark:to-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-iconic-blue">Portfolio</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Explore our showcase of successful projects across multiple
                verticals, demonstrating our commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Filter Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="overflow-x-auto mb-12">
              <div className="flex flex-wrap items-center justify-center gap-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === category.id
                        ? "bg-iconic-blue text-white"
                        : "bg-gray-100 dark:bg-iconic-slate/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-iconic-slate"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-iconic-blue/80 text-white px-3 py-1 rounded-full text-xs">
                        {project.categoryName}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      Client: {project.client} | Year: {project.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="border-iconic-blue text-iconic-blue hover:bg-iconic-blue/10"
                    >
                      <Link to={`/portfolio/${project.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* No projects found message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  No projects found for this category.
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Please try selecting a different category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Featured Case Studies</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Dive deeper into some of our most impactful projects and learn how
                we've helped our clients achieve their goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-on-scroll">
              <div className="bg-white dark:bg-iconic-slate/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green Valley Township"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white/80">Right Homes | 2022</span>
                    <h3 className="text-2xl font-bold text-white">Green Valley Township</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    A comprehensive township development featuring 500+ residential units,
                    commercial spaces, and community amenities, all built with sustainable
                    practices and smart city features.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Sustainable Design
                    </span>
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Smart Infrastructure
                    </span>
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Community Planning
                    </span>
                  </div>
                  <Button
                    asChild
                    className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
                  >
                    <Link to="/case-studies/green-valley">Read Case Study</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-iconic-slate/50 rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="NextGen Learning Campus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white/80">The Empire | 2023</span>
                    <h3 className="text-2xl font-bold text-white">NextGen Learning Campus</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    A revolutionary educational campus featuring innovative learning spaces,
                    cutting-edge technology integration, and specialized facilities for
                    STEM education, arts, and sports.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Educational Innovation
                    </span>
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Technology Integration
                    </span>
                    <span className="bg-iconic-blue/10 text-iconic-blue px-3 py-1 rounded-full text-xs">
                      Modern Learning Spaces
                    </span>
                  </div>
                  <Button
                    asChild
                    className="bg-iconic-blue hover:bg-iconic-blue/90 text-white"
                  >
                    <Link to="/case-studies/nextgen-campus">Read Case Study</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-white/90 mb-8">
                Let's discuss how ICONIC Infinity Group can help bring your vision
                to life with our expertise across multiple verticals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate"
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/services">Explore Our Services</Link>
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

export default Portfolio;
