"use client"
import SectionTitle from '../shared/SectionTitle';
import { useEffect, useState, useRef } from 'react';
import { Building2, GraduationCap, Handshake, Globe } from 'lucide-react';

const timelineEvents = [
  {
    year: '2010',
    title: 'Establishment',
    description: 'Far Western University was established by the Act of Parliament as a government-funded national university.',
    icon: <Building2 />,
    color: 'bg-blue-600'
  },
  {
    year: '2012',
    title: 'Academic Expansion',
    description: 'Expanded academic programs with the introduction of multiple faculties and departments.',
    icon: <GraduationCap />,
    color: 'bg-teal-500'
  },
  {
    year: '2015',
    title: 'Research Center',
    description: 'Established the Research, Innovation & Development Center to promote scholarly activities.',
    icon: <Globe />,
    color: 'bg-yellow-500'
  },
  {
    year: '2020',
    title: 'International Partnerships',
    description: 'Formed strategic partnerships with international universities for academic collaboration and exchange programs.',
    icon: <Handshake />,
    color: 'bg-indigo-600'
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Implemented comprehensive digital infrastructure to enhance teaching, learning, and administrative processes.',
    icon: <Globe />,
    color: 'bg-purple-600'
  }
];

const HistoryTimeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    // Store current ref value in a variable to use in cleanup
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Use the stored ref value in cleanup
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%234a90e2\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34h4v1h-4v-1zm0-2h1v4h-1v-4zm2-2h1v1h-1v-1zm-2 2h1v1h-1v-1zm-2-2h1v1h-1v-1zm2-2h1v1h-1v-1zm-2 2h1v1h-1v-1zm-2-2h1v1h-1v-1z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle title="Our Journey" subtitle="History & Milestones" />
        </div>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded-full"></div>

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`flex items-center mb-16 last:mb-0 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Left side (odd indices) */}
              {index % 2 === 0 ? (
                <>
                  <div className="w-1/2 pr-8 md:pr-16 text-right">
                    <div className="mb-2 text-3xl font-bold text-blue-700">{event.year}</div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>

                  {/* Center icon */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${event.color} text-white flex items-center justify-center z-10 shadow-lg border-4 border-white`}>
                    {event.icon}
                  </div>

                  {/* Right side (empty for odd indices) */}
                  <div className="w-1/2 pl-8 md:pl-16"></div>
                </>
              ) : (
                <>
                  {/* Left side (empty for even indices) */}
                  <div className="w-1/2 pr-8 md:pr-16"></div>

                  {/* Center icon */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${event.color} text-white flex items-center justify-center z-10 shadow-lg border-4 border-white`}>
                    {event.icon}
                  </div>

                  {/* Right side (even indices) */}
                  <div className="w-1/2 pl-8 md:pl-16">
                    <div className="mb-2 text-3xl font-bold text-blue-700">{event.year}</div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Future vision */}
        <div className={`mt-16 text-center transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Looking to the Future</h3>
            <p className="text-gray-700">
              Far Western University continues to grow and evolve, committed to providing quality education
              and enhancing research and innovation to meet the needs of society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
