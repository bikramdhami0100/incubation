// components/home/StartupCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Award } from 'lucide-react';

export interface Startup {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
  industry: string;
  founded?: string;
  stage?: string;
}

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 h-full flex flex-col group">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

      <div className="p-6 flex flex-col items-center text-center h-full">
        {/* Logo with glow effect on hover */}
        <div className="relative w-20 h-20 mb-5">
          <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300 scale-[1.15] group-hover:scale-[1.3] blur-md"></div>
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md group-hover:shadow-indigo-200 transition-all duration-300 z-10">
            <Image
              src={startup.logoUrl}
              alt={`${startup.name} logo`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        </div>

        {/* Startup name with gradient text on hover */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300">
          {startup.name}
        </h3>

        {/* Category tag */}
        <div className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mb-4 inline-flex items-center">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5"></span>
          {startup.industry}
        </div>

        {/* Additional info if available */}
        {(startup.founded || startup.stage) && (
          <div className="flex items-center justify-center gap-3 mb-4 text-xs text-gray-500">
            {startup.founded && (
              <div className="flex items-center">
                <span className="mr-1">Founded:</span>
                <span className="font-medium text-gray-700">{startup.founded}</span>
              </div>
            )}
            {startup.stage && (
              <div className="flex items-center">
                <Award className="mr-1 text-indigo-500" />
                <span className="font-medium text-gray-700">{startup.stage}</span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 flex-grow">{startup.description}</p>

        {/* Link with hover effect */}
        <Link
          href={startup.website}
          className="mt-auto inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors group"
        >
          <span>View Details</span>
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Bottom accent with external link */}
      <div className="mt-auto border-t border-gray-100 py-3 px-6 flex justify-between items-center bg-gray-50 group-hover:bg-indigo-50 transition-colors duration-300">
        <span className="text-xs text-gray-500">FWU Incubated</span>
        <Link
          href={startup.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700"
          aria-label={`Visit ${startup.name} website`}
        >
          <ExternalLink />
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;