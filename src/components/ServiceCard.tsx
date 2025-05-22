
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  description,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="service-card flex flex-col relative overflow-hidden group animate-on-scroll rounded-lg border border-iconic-slate dark:border-iconic-slate/50 p-6 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-iconic-blue to-iconic-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
          isHovered ? "animate-pulse" : ""
        }`}
      ></div>
      
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          boxShadow: "0 0 15px rgba(0, 71, 171, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)",
        }}
      ></div>

      <div className="z-10 flex-1 flex flex-col">
        <div className="mb-4 text-iconic-gold transform transition-transform duration-300 group-hover:scale-110 text-4xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-iconic-gold transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link
          to={link}
          className="mt-auto inline-flex items-center text-iconic-gold font-medium hover:underline"
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`ml-1 transition-transform duration-300 ${
              isHovered ? "translate-x-2" : ""
            }`}
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
