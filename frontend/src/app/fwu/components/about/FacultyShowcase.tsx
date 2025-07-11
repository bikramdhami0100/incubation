"use client"
import SectionTitle from '../shared/SectionTitle';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { FiArrowRight } from 'react-icons/fi';
import { FlaskRound, Globe, UserCheck, Scale, Code, Leaf, Heart, TreePine, Users, ArrowRight } from 'lucide-react';

const faculties = [
  {
    id: 'science',
    name: 'Faculty of Science & Technology',
    description: 'Offering programs in Physics, Chemistry, Mathematics, Computer Science, and Information Technology.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'indigo',
    icon: <FlaskRound className="w-5 h-5" />
  },
  {
    id: 'humanities',
    name: 'Faculty of Humanities & Social Sciences',
    description: 'Exploring human culture and society through programs in Literature, Sociology, Economics, and Philosophy.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'purple',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    description: 'Training the next generation of educators with innovative teaching methodologies and practices.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'green',
    icon: <UserCheck className="w-5 h-5" />
  },
  {
    id: 'management',
    name: 'Faculty of Management',
    description: 'Preparing future business leaders with programs in Business Administration, Finance, and Marketing.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'blue',
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    description: 'Providing comprehensive legal education to develop skilled legal professionals.',
    image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'red',
    icon: <Scale className="w-5 h-5" />
  },
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    description: 'Developing technical expertise through programs in Civil, Electrical, and Computer Engineering.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'orange',
    icon: <Code className="w-5 h-5" />
  },
  {
    id: 'agriculture',
    name: 'Faculty of Agriculture',
    description: 'Advancing agricultural knowledge and practices through research and education.',
    image: 'https://images.unsplash.com/photo-1592982573971-2c0d8be9bcbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'lime',
    icon: <Leaf className="w-5 h-5" />
  },
  {
    id: 'health',
    name: 'Faculty of Health Sciences',
    description: 'Preparing healthcare professionals through programs in Nursing, Public Health, and more.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'teal',
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 'nrm',
    name: 'Faculty of Natural Resource Management',
    description: 'Focusing on sustainable management of natural resources and environmental conservation.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    color: 'emerald',
    icon: <TreePine className="w-5 h-5" />
  }
];

const FacultyShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate faculties
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % faculties.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'hover-bg' | 'hover-text') => {
    const colorMap: Record<string, Record<string, string>> = {
      indigo: {
        'bg': 'bg-indigo-600',
        'text': 'text-indigo-600',
        'border': 'border-indigo-600',
        'hover-bg': 'hover:bg-indigo-700',
        'hover-text': 'hover:text-indigo-700'
      },
      blue: {
        'bg': 'bg-blue-600',
        'text': 'text-blue-600',
        'border': 'border-blue-600',
        'hover-bg': 'hover:bg-blue-700',
        'hover-text': 'hover:text-blue-700'
      },
      purple: {
        'bg': 'bg-purple-600',
        'text': 'text-purple-600',
        'border': 'border-purple-600',
        'hover-bg': 'hover:bg-purple-700',
        'hover-text': 'hover:text-purple-700'
      },
      green: {
        'bg': 'bg-green-600',
        'text': 'text-green-600',
        'border': 'border-green-600',
        'hover-bg': 'hover:bg-green-700',
        'hover-text': 'hover:text-green-700'
      },
      red: {
        'bg': 'bg-red-600',
        'text': 'text-red-600',
        'border': 'border-red-600',
        'hover-bg': 'hover:bg-red-700',
        'hover-text': 'hover:text-red-700'
      },
      orange: {
        'bg': 'bg-orange-600',
        'text': 'text-orange-600',
        'border': 'border-orange-600',
        'hover-bg': 'hover:bg-orange-700',
        'hover-text': 'hover:text-orange-700'
      },
      lime: {
        'bg': 'bg-lime-600',
        'text': 'text-lime-600',
        'border': 'border-lime-600',
        'hover-bg': 'hover:bg-lime-700',
        'hover-text': 'hover:text-lime-700'
      },
      teal: {
        'bg': 'bg-teal-600',
        'text': 'text-teal-600',
        'border': 'border-teal-600',
        'hover-bg': 'hover:bg-teal-700',
        'hover-text': 'hover:text-teal-700'
      },
      emerald: {
        'bg': 'bg-emerald-600',
        'text': 'text-emerald-600',
        'border': 'border-emerald-600',
        'hover-bg': 'hover:bg-emerald-700',
        'hover-text': 'hover:text-emerald-700'
      }
    };

    return colorMap[color][type] || colorMap['indigo'][type];
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full opacity-20 blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-20 blur-3xl translate-x-1/4 translate-y-1/4"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle
            title="Our Academic Faculties"
            subtitle="Excellence in Diversity"
            accentColor="indigo"
          />
          <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            Far Western University offers a diverse range of academic programs through nine specialized faculties,
            providing comprehensive educational opportunities to students from all backgrounds.
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty, index) => (
            <div
              key={faculty.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-${faculty.color}-200 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${activeIndex === index ? `scale-105 shadow-xl z-10 border-${faculty.color}-300` : 'scale-100'} hover:-translate-y-1 group`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Faculty Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={faculty.image}
                  alt={faculty.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${faculty.color}-900/80 to-transparent`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${getColorClass(faculty.color, 'bg')} flex items-center justify-center mr-3 shadow-lg`}>
                      {faculty.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg drop-shadow-md">
                      {faculty.name.split(' ').slice(-1)[0]}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Faculty Description */}
              <div className="p-5">
                <h3 className={`text-lg font-semibold ${getColorClass(faculty.color, 'text')} mb-2 line-clamp-1`}>
                  {faculty.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {faculty.description}
                </p>
                <Link
                  href="/faculty"
                  className={`inline-flex items-center ${getColorClass(faculty.color, 'text')} font-medium text-sm ${getColorClass(faculty.color, 'hover-text')} transition-colors group/btn`}
                >
                  Learn More <ArrowRight className="ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute transform rotate-45 ${getColorClass(faculty.color, 'bg')} w-16 h-3 -top-2 -right-8 opacity-80`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            href="/faculty"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Explore All Faculties <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacultyShowcase;
