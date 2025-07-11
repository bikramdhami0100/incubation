// components/contact/MapSection.tsx
import { MapPin } from 'lucide-react';

interface MapSectionProps {
  embedUrl: string;
  address: string;
}

const MapSection: React.FC<MapSectionProps> = ({ embedUrl, address }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <MapPin className="text-indigo-600 text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>
      </div>

      {/* Google Map Iframe with styled container */}
      <div className="rounded-xl overflow-hidden border-4 border-indigo-50 shadow-inner relative">
        <div className="aspect-w-16 aspect-h-9"> {/* Requires @tailwindcss/aspect-ratio */}
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${address}`}
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>

        {/* Map overlay with address */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/80 to-transparent p-4 text-white">
          <div className="flex items-start">
            <MapPin className="mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm">{address}</p>
          </div>
        </div>
      </div>

      {/* Get directions button */}
      <div className="mt-6 text-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          Get Directions
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MapSection;