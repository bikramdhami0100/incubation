// components/home/ProgramCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

export interface Program {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  imageUrl?: string;
  link: string;
  location?: string;
}

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 h-full flex flex-col group">
      {/* Image container */}
      {program.imageUrl && (
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <div className="relative h-full w-full">
            <Image
              src={program.imageUrl}
              alt={program.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {program.category}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center text-sm text-indigo-600 font-medium mb-3">
          <Calendar className="mr-2" />
          <span>{program.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {program.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-5 flex-grow leading-relaxed">
          {program.description}
        </p>

        {/* Location (if available) */}
        {program.location && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="mr-2 text-indigo-500" />
            <span>{program.location}</span>
          </div>
        )}

        {/* CTA Link */}
        <Link
          href={program.link}
          className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group"
        >
          Learn More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default ProgramCard;