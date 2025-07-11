// components/home/Testimonials.tsx
"use client"
import TestimonialCard, { Testimonial } from './TestimonialCard';
import { useEffect, useState, useRef } from 'react';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote: "The FWU Incubation Center provided me with exceptional mentorship and resources. Their guidance and practical approach helped me transform my idea into a successful startup.",
    author: 'Aisha Sharma',
    role: 'Founder, EcoHarvest',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 't2',
    quote: "The networking opportunities and funding connections at FWU Incubation Center are outstanding. I was able to secure seed funding within six months thanks to their support.",
    author: 'Rajesh Bhatta',
    role: 'CEO, MediConnect',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 't3',
    quote: "As a first-time entrepreneur, I found the FWU Incubation Center to be incredibly supportive. Their workshops and mentorship programs gave me the knowledge and confidence to launch my business.",
    author: 'Nirmala Joshi',
    role: 'Founder, EduReach',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Navigation functions
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full opacity-30 blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 blur-3xl translate-x-1/4 translate-y-1/4"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Large quote marks */}
      <div className="absolute top-20 left-20 text-indigo-200 opacity-20 text-9xl font-serif">&ldquo;</div>
      <div className="absolute bottom-20 right-20 text-indigo-200 opacity-20 text-9xl font-serif">&rdquo;</div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Startups Say</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Hear from the entrepreneurs who have experienced our incubation program
          </p>
        </div>

        {/* Testimonial Cards with Animation */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:text-indigo-800 hover:shadow-xl transition-all duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20">
            <button
              onClick={goToNext}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 hover:text-indigo-800 hover:shadow-xl transition-all duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Testimonial slider */}
          <div className="relative overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className={`transition-all duration-500 transform ${activeIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 focus:outline-none ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-indigo-600 rounded-full'
                    : 'w-2 h-2 bg-indigo-300 rounded-full hover:bg-indigo-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        {/* <div className={`mt-16 text-center transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xl font-medium text-gray-900 mb-6">
            Ready to join our community of successful entrepreneurs?
          </p>
          <a
            href="/apply"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            Apply Now
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;