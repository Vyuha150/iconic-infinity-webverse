
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Innovation = () => {
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

    // Add animation for innovation approach blocks
    const approachBlocks = document.querySelectorAll(".approach-block");
    approachBlocks.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.transitionDelay = `${index * 150}ms`;
      
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + (index * 150));
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const innovationAreas = [
    {
      title: "Customer Experience Innovation",
      description:
        "We redesign customer journeys to create seamless, enjoyable experiences across all touchpoints, leveraging digital tools and personalization strategies to exceed expectations.",
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
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Technology Integration",
      description:
        "We incorporate cutting-edge technologies like IoT, AI, and smart automation across our verticals to enhance functionality, efficiency, and user experience.",
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
        >
          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
      ),
    },
    {
      title: "Sustainable Practices",
      description:
        "We pioneer eco-friendly methodologies and materials across our operations, reducing environmental impact while maintaining the highest quality standards.",
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
        >
          <path d="M2 22a8 8 0 0 1 11.33-7.27"></path>
          <path d="M9 10a7.66 7.66 0 0 0-2.51-5.27C4.13 2.4 2 3.25 2 5.5a7.49 7.49 0 0 0 10 7.13"></path>
          <path d="M22 22a8 8 0 0 0-11.33-7.27"></path>
          <path d="M15 10a7.66 7.66 0 0 1 2.51-5.27C19.87 2.4 22 3.25 22 5.5a7.49 7.49 0 0 1-10 7.13"></path>
        </svg>
      ),
    },
    {
      title: "Process Optimization",
      description:
        "We continuously refine our workflows and operational processes using Lean Six Sigma principles to maximize efficiency, reduce waste, and deliver consistent quality.",
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
        >
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: "How does ICONIC's Innovation Committee work?",
      answer:
        "Our Innovation Committee consists of experts from various fields who meet regularly to identify emerging trends, technologies, and methodologies. They evaluate potential innovations, develop implementation strategies, and oversee pilot projects before full-scale adoption across relevant verticals.",
    },
    {
      question: "How do you measure innovation success?",
      answer:
        "We measure innovation success through multiple metrics including customer satisfaction improvements, operational efficiency gains, resource utilization improvements, and market differentiation. Each innovation initiative has specific KPIs that align with our overall business objectives and customer-centric values.",
    },
    {
      question: "Can clients participate in your innovation process?",
      answer:
        "Absolutely! We believe in collaborative innovation and regularly involve clients in our innovation workshops, feedback sessions, and pilot projects. Client insights are invaluable in ensuring our innovations truly address market needs and deliver meaningful improvements to the customer experience.",
    },
    {
      question: "How do you ensure innovations are practical and implementable?",
      answer:
        "All innovation initiatives go through a rigorous evaluation process that includes feasibility studies, cost-benefit analyses, and small-scale pilot implementations. This approach allows us to test concepts in real-world conditions, gather data on performance, and refine solutions before full deployment.",
    },
    {
      question: "How do you stay ahead of industry trends?",
      answer:
        "Our R&D team continuously monitors global trends, participates in industry conferences, collaborates with research institutions, and maintains partnerships with technology providers. This multi-faceted approach ensures we're not just keeping pace with trends but anticipating future developments in our industries.",
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
                Innovation at <span className="text-iconic-blue">ICONIC</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Discover how our Innovation Committee and R&D team bring
                world-class methodologies and technologies to all our verticals.
              </p>
            </div>
          </div>
        </section>

        {/* Innovation Approach Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-6">Our Approach to Innovation</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Innovation at ICONIC Infinity Group is not just a department but a
                  mindset that permeates our entire organization. Our dedicated
                  Innovation Committee and R&D team work collaboratively to identify,
                  develop, and implement cutting-edge solutions across all our
                  verticals.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  We follow a systematic approach to innovation, starting with
                  identifying customer pain points and market opportunities, then
                  exploring creative solutions through design thinking and rapid
                  prototyping, and finally implementing and scaling successful
                  innovations across relevant business units.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-iconic-slate/50 p-4 rounded-lg approach-block hover:shadow-md transition-all duration-300 hover:bg-iconic-blue/5">
                    <h3 className="font-semibold mb-2 text-iconic-blue">Customer-Centric</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      All innovations focus on enhancing customer experience and value.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-iconic-slate/50 p-4 rounded-lg approach-block hover:shadow-md transition-all duration-300 hover:bg-iconic-blue/5">
                    <h3 className="font-semibold mb-2 text-iconic-blue">Data-Driven</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      We use analytics and market insights to guide innovation decisions.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-iconic-slate/50 p-4 rounded-lg approach-block hover:shadow-md transition-all duration-300 hover:bg-iconic-blue/5">
                    <h3 className="font-semibold mb-2 text-iconic-blue">Collaborative</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Cross-functional teams work together to develop holistic solutions.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-iconic-slate/50 p-4 rounded-lg approach-block hover:shadow-md transition-all duration-300 hover:bg-iconic-blue/5">
                    <h3 className="font-semibold mb-2 text-iconic-blue">Agile</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Rapid prototyping and iteration allows for quick refinement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll">
                <div className="relative">
                  {/* Decorative element */}
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-iconic-blue/10 rounded-full"></div>
                  
                  {/* Main image */}
                  <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Innovation Team Meeting"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-6 right-6 bg-white dark:bg-iconic-slate p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between gap-6">
                      <div className="text-center">
                        <div className="text-iconic-blue text-2xl font-bold">25+</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Innovation Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-iconic-blue text-2xl font-bold">15+</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Patents Filed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Areas Section */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Key Innovation Areas</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our innovation initiatives focus on several strategic areas that
                drive value across all our verticals and enhance customer experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
              {innovationAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-iconic-slate/50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-iconic-blue"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-iconic-blue mr-4">{area.icon}</div>
                    <h3 className="text-xl font-bold">{area.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Process Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our Innovation Process</h2>
              <p className="text-gray-700 dark:text-gray-300">
                A systematic approach to turning ideas into impactful solutions
                across our business verticals.
              </p>
            </div>

            <div className="relative animate-on-scroll">
              {/* Process Step Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-iconic-blue/20 transform -translate-x-1/2 hidden md:block"></div>
              
              <div className="space-y-16">
                {/* Process Step 1 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right">
                    <div className="inline-block mb-2 px-3 py-1 bg-iconic-blue/10 text-iconic-blue rounded-full text-sm font-medium">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Discovery & Research</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We identify opportunities through market research, customer
                      feedback, and trend analysis, establishing a solid foundation for
                      innovation grounded in real needs and opportunities.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                  
                  {/* Step circle */}
                  <div className="absolute left-1/2 top-8 w-8 h-8 bg-iconic-blue rounded-full transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Process Step 2 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="hidden md:block"></div>
                  <div>
                    <div className="inline-block mb-2 px-3 py-1 bg-iconic-blue/10 text-iconic-blue rounded-full text-sm font-medium">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Ideation & Concept Development</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our multidisciplinary teams collaborate in design thinking
                      workshops to generate and refine innovative concepts, evaluating
                      their potential impact and feasibility.
                    </p>
                  </div>
                  
                  {/* Step circle */}
                  <div className="absolute left-1/2 top-8 w-8 h-8 bg-iconic-blue rounded-full transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Process Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right">
                    <div className="inline-block mb-2 px-3 py-1 bg-iconic-blue/10 text-iconic-blue rounded-full text-sm font-medium">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Prototyping & Testing</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Selected concepts are rapidly prototyped and tested with real users
                      to validate assumptions, gather feedback, and refine the solution
                      before larger investments.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                  
                  {/* Step circle */}
                  <div className="absolute left-1/2 top-8 w-8 h-8 bg-iconic-blue rounded-full transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Process Step 4 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="hidden md:block"></div>
                  <div>
                    <div className="inline-block mb-2 px-3 py-1 bg-iconic-blue/10 text-iconic-blue rounded-full text-sm font-medium">
                      Step 4
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Implementation & Scaling</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Successful innovations are implemented across relevant business
                      units with comprehensive training, documentation, and support to
                      ensure successful adoption and scaling.
                    </p>
                  </div>
                  
                  {/* Step circle */}
                  <div className="absolute left-1/2 top-8 w-8 h-8 bg-iconic-blue rounded-full transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Process Step 5 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right">
                    <div className="inline-block mb-2 px-3 py-1 bg-iconic-blue/10 text-iconic-blue rounded-full text-sm font-medium">
                      Step 5
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Measurement & Iteration</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We continuously monitor the performance of implemented innovations,
                      gathering data and insights to guide ongoing refinements and
                      identify new opportunities.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                  
                  {/* Step circle */}
                  <div className="absolute left-1/2 top-8 w-8 h-8 bg-iconic-blue rounded-full transform -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-iconic-slate/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto animate-on-scroll">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Innovation Partners Section */}
        <section className="py-16 bg-white dark:bg-iconic-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-4">Our Innovation Partners</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We collaborate with leading organizations, research institutions, and
                technology providers to accelerate our innovation initiatives.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center animate-on-scroll">
              {/* Partner logos */}
              <div className="bg-gray-100 dark:bg-iconic-slate/50 w-full h-32 rounded-lg flex items-center justify-center p-6">
                <div className="text-iconic-blue text-2xl font-bold">Partner 1</div>
              </div>
              <div className="bg-gray-100 dark:bg-iconic-slate/50 w-full h-32 rounded-lg flex items-center justify-center p-6">
                <div className="text-iconic-blue text-2xl font-bold">Partner 2</div>
              </div>
              <div className="bg-gray-100 dark:bg-iconic-slate/50 w-full h-32 rounded-lg flex items-center justify-center p-6">
                <div className="text-iconic-blue text-2xl font-bold">Partner 3</div>
              </div>
              <div className="bg-gray-100 dark:bg-iconic-slate/50 w-full h-32 rounded-lg flex items-center justify-center p-6">
                <div className="text-iconic-blue text-2xl font-bold">Partner 4</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-iconic-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Partner With Us on Innovation</h2>
              <p className="text-white/90 mb-8">
                Are you interested in collaborating on innovative solutions or learning more
                about our innovation capabilities? Get in touch with our team today.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-iconic-blue hover:bg-iconic-gold hover:text-iconic-slate"
              >
                <Link to="/contact?topic=innovation">Connect With Our R&D Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Innovation;
