
import { useState } from "react";
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

  return (
    <div
      className="service-card flex flex-col relative overflow-hidden group animate-on-scroll"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-iconic-blue to-iconic-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
          isHovered ? "animate-pulse" : ""
        }`}
      ></div>

      <div className="z-10 flex-1 flex flex-col">
        <div className="mb-4 text-iconic-blue">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
        <Link
          to={link}
          className="mt-auto inline-flex items-center text-iconic-blue font-medium hover:underline"
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
              isHovered ? "translate-x-1" : ""
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
