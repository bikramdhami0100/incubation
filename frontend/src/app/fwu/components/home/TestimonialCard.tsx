// components/home/TestimonialCard.tsx
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl relative h-full flex flex-col border border-gray-100 hover:shadow-indigo-100/30 transition-all duration-300 hover:border-indigo-200 group">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 rounded-t-2xl"></div>

      {/* Quote icon with gradient background */}
      <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
        <Quote className="text-white text-sm" />
      </div>

      {/* Rating stars */}
      <div className="flex mb-6 text-yellow-400">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="mr-1" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow">
        <span className="italic text-indigo-900 font-medium">&ldquo;{testimonial.quote}&rdquo;</span>
      </p>

      {/* Author info */}
      <div className="flex items-center mt-auto pt-6 border-t border-gray-100">
        {testimonial.avatarUrl && (
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300 scale-[1.15] group-hover:scale-[1.3] blur-md"></div>
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-indigo-100 shadow-md group-hover:shadow-indigo-200 transition-all duration-300 z-10">
              <Image
                src={testimonial.avatarUrl}
                alt={testimonial.author}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900">{testimonial.author}</p>
          <p className="text-sm text-indigo-600">{testimonial.role}</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16L16 0L40 0L40 24L24 40L0 40L0 16Z" fill="#4f46e5" />
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#4f46e5" />
        </svg>
      </div>
    </div>
  );
};

export default TestimonialCard;