
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface VerticalCardProps {
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  link: string;
  index: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({
  title,
  tagline,
  description,
  imageUrl,
  link,
  index,
}) => {
  // Alternate the layout for even and odd indexes
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
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
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } bg-iconic-dark/50 dark:bg-iconic-slate/30 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-on-scroll transform ${
        isEven ? "md:translate-x-[-100px]" : "md:translate-x-[100px]"
      } opacity-0`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transitionProperty: 'transform, opacity',
        transitionDuration: '1s'
      }}
    >
      <div className="md:w-1/2 relative overflow-hidden group h-64 md:h-auto">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 dark:brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white z-10">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-iconic-gold italic">{tagline}</p>
        </div>
      </div>
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-iconic-gold">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
        </div>
        <Button
          asChild
          variant="outline"
          className="border-iconic-gold text-iconic-gold hover:bg-iconic-gold/10 self-start transition-colors duration-300"
        >
          <Link to={link}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default VerticalCard;
