// components/home/FeaturedStartups.tsx
"use client"
import StartupCard, { Startup } from './StartupCard';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';

const startupsData: Startup[] = [
  {
    id: 's1',
    name: 'EcoHarvest',
    logoUrl: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=200&auto=format&fit=crop',
    description: 'Sustainable agricultural technology solutions for small-scale farmers.',
    website: '/startups/ecoharvest',
    industry: 'AgriTech',
  },
  {
    id: 's2',
    name: 'MediConnect',
    logoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=200&auto=format&fit=crop',
    description: 'Telemedicine platform connecting rural patients with healthcare providers.',
    website: '/startups/mediconnect',
    industry: 'HealthTech',
  },
  {
    id: 's3',
    name: 'EduReach',
    logoUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=200&auto=format&fit=crop',
    description: 'Digital education solutions for underserved communities.',
    website: '/startups/edureach',
    industry: 'EdTech',
  },
  {
    id: 's4',
    name: 'SolarLife',
    logoUrl: 'https://images.unsplash.com/photo-1548614606-52b4451f994b?q=80&w=200&auto=format&fit=crop',
    description: 'Affordable solar energy solutions for homes and small businesses.',
    website: '/startups/solarlife',
    industry: 'CleanTech',
  },
];

const FeaturedStartups = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-rotate active card
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % startupsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
              <Briefcase className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Featured Startups</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Meet the innovative ventures that are transforming ideas into impactful solutions
          </p>
        </div>

        <div className="relative mt-12">
          {/* Animated highlight circle that moves between cards */}
          <div
            className="absolute w-full h-full transition-all duration-500 ease-in-out pointer-events-none"
            style={{
              clipPath: 'circle(15% at 0% 0%)',
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0) 70%)',
              transform: `translate(${25 * activeIndex}%, 0)`,
            }}
          ></div>

          {/* Startup Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {startupsData.map((startup, index) => (
              <div
                key={startup.id}
                className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: activeIndex === index ? 'scale(1.03)' : 'scale(1)',
                  zIndex: activeIndex === index ? 10 : 1,
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <StartupCard startup={startup} />
              </div>
            ))}
          </div>
        </div>

        {/* Success metrics */}
        <div className={`mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-10 transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">₹25M+</div>
              <p className="text-gray-600">Funding Raised</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
              <p className="text-gray-600">Startup Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">200+</div>
              <p className="text-gray-600">Jobs Created</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">12</div>
              <p className="text-gray-600">Industry Partners</p>
            </div>
          </div>
        </div>

        {/* View all startups button */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            href="/startups"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            View All Startups
            <ArrowRight className="ml-2" />
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Discover more success stories from our incubation center
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStartups;