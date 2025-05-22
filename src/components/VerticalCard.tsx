
import React from "react";
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

  return (
    <div
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } bg-white dark:bg-iconic-slate/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-on-scroll`}
    >
      <div className="md:w-1/2 relative overflow-hidden group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-white/90 italic">{tagline}</p>
        </div>
      </div>
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-iconic-blue">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
        </div>
        <Button
          asChild
          variant="outline"
          className="border-iconic-blue text-iconic-blue hover:bg-iconic-blue/10 self-start"
        >
          <Link to={link}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default VerticalCard;
