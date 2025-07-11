"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Book, Users, Award, MapPin, GraduationCap, UserCheck,FlaskConical, Code, Scale, Leaf, Heart, TreePine, Globe, Check } from 'lucide-react';

// Faculty type definition
interface Faculty {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  programs: {
    bachelor: string[];
    master: string[];
    mphil: string[];
    phd: string[];
  };
  stats: {
    teachers: number;
    students: number;
    staff: number;
  };
  website: string;
  email: string;
  color: string;
}

export default function FacultyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const heroRef = useRef(null);

  // Faculty data based on FWU website
  const faculties: Faculty[] = [
    {
      id: 'science',
      name: 'Faculty of Science and Technology',
      shortName: 'Science & Tech',
      description: 'The Faculty of Science and Technology at Far Western University offers programs in various scientific disciplines. It focuses on providing quality education in fields like Physics, Chemistry, Mathematics, Computer Science, and Information Technology. The faculty is committed to developing skilled professionals through theoretical knowledge and practical applications.',
      icon: <FlaskConical className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.Sc.', 'B.Sc. CSIT'],
        master: ['M.Sc. Physics', 'M.Sc. Chemistry', 'M.Sc. Mathematics'],
        mphil: ['MPhil in Science'],
        phd: ['PhD in Science']
      },
      stats: {
        teachers: 43,
        students: 592,
        staff: 13
      },
      website: 'http://facultyscience.fwu.edu.np',
      email: 'faculty.science@fwu.edu.np',
      color: 'indigo'
    },
    {
      id: 'management',
      name: 'Faculty of Management',
      shortName: 'Management',
      description: 'The Faculty of Management at Far Western University is dedicated to developing skilled professionals in business and management. It offers programs that blend theoretical knowledge with practical skills to prepare students for the challenges of the business world. The faculty emphasizes research, innovation, and entrepreneurship.',
      icon: <Globe className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['BBA', 'BHM', 'BIM'],
        master: ['MBA', 'MBM'],
        mphil: ['MPhil in Management'],
        phd: ['PhD in Management']
      },
      stats: {
        teachers: 38,
        students: 745,
        staff: 15
      },
      website: 'http://facultymanagement.fwu.edu.np',
      email: 'faculty.management@fwu.edu.np',
      color: 'blue'
    },
    {
      id: 'humanities',
      name: 'Faculty of Humanities and Social Sciences',
      shortName: 'Humanities',
      description: 'The Faculty of Humanities and Social Sciences focuses on the study of human society, culture, and relationships. It offers programs in various disciplines including sociology, political science, economics, and languages. The faculty aims to develop critical thinking, analytical skills, and a deep understanding of social issues.',
      icon: <Globe className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['BA', 'BSW'],
        master: ['MA English', 'MA Economics', 'MA Sociology'],
        mphil: ['MPhil in Humanities'],
        phd: ['PhD in Humanities']
      },
      stats: {
        teachers: 35,
        students: 520,
        staff: 12
      },
      website: 'http://facultyhumanities.fwu.edu.np',
      email: 'faculty.humanities@fwu.edu.np',
      color: 'purple'
    },
    {
      id: 'education',
      name: 'Faculty of Education',
      shortName: 'Education',
      description: 'The Faculty of Education is dedicated to preparing skilled and knowledgeable educators. It offers programs that combine educational theory with practical teaching experience. The faculty focuses on developing teaching methodologies, curriculum design, and educational leadership to prepare students for careers in education.',
      icon: <UserCheck className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.Ed.'],
        master: ['M.Ed.'],
        mphil: ['MPhil in Education'],
        phd: ['PhD in Education']
      },
      stats: {
        teachers: 40,
        students: 680,
        staff: 14
      },
      website: 'http://facultyeducation.fwu.edu.np',
      email: 'faculty.education@fwu.edu.np',
      color: 'green'
    },
    {
      id: 'law',
      name: 'Faculty of Law',
      shortName: 'Law',
      description: 'The Faculty of Law provides comprehensive legal education to prepare students for careers in law. It offers programs that cover various aspects of legal studies including constitutional law, criminal law, civil law, and international law. The faculty emphasizes legal research, critical analysis, and practical legal skills.',
      icon: <Scale className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['LLB'],
        master: ['LLM'],
        mphil: [],
        phd: []
      },
      stats: {
        teachers: 25,
        students: 320,
        staff: 10
      },
      website: 'http://facultylaw.fwu.edu.np',
      email: 'faculty.law@fwu.edu.np',
      color: 'red'
    },
    {
      id: 'engineering',
      name: 'Faculty of Engineering',
      shortName: 'Engineering',
      description: 'The Faculty of Engineering is dedicated to developing skilled engineers through comprehensive education in various engineering disciplines. It offers programs that combine theoretical knowledge with practical applications to prepare students for careers in engineering. The faculty emphasizes innovation, problem-solving, and sustainable development.',
      icon: <Code className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.E. Civil', 'B.E. Computer'],
        master: ['M.E.'],
        mphil: [],
        phd: []
      },
      stats: {
        teachers: 30,
        students: 450,
        staff: 15
      },
      website: 'http://facultyengineering.fwu.edu.np',
      email: 'faculty.engineering@fwu.edu.np',
      color: 'orange'
    },
    {
      id: 'agriculture',
      name: 'Faculty of Agriculture',
      shortName: 'Agriculture',
      description: 'The Faculty of Agriculture focuses on agricultural education and research to address challenges in food production and sustainable farming. It offers programs that cover various aspects of agriculture including crop science, animal husbandry, and agricultural economics. The faculty emphasizes practical skills and innovative approaches to agriculture.',
      icon: <Leaf className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1592982573971-2c0d8be9bcbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.Sc. Agriculture'],
        master: ['M.Sc. Agriculture'],
        mphil: [],
        phd: []
      },
      stats: {
        teachers: 28,
        students: 380,
        staff: 12
      },
      website: 'http://facultyagriculture.fwu.edu.np',
      email: 'faculty.agriculture@fwu.edu.np',
      color: 'lime'
    },
    {
      id: 'health',
      name: 'Faculty of Health Sciences',
      shortName: 'Health Sciences',
      description: 'The Faculty of Health Sciences is dedicated to developing healthcare professionals through comprehensive education in various health-related disciplines. It offers programs that combine theoretical knowledge with practical clinical experience to prepare students for careers in healthcare. The faculty emphasizes patient care, research, and community health.',
      icon: <Heart className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.Sc. Nursing', 'BMLT', 'BPH'],
        master: ['MPH'],
        mphil: [],
        phd: []
      },
      stats: {
        teachers: 32,
        students: 420,
        staff: 14
      },
      website: '#',
      email: 'faculty.health@fwu.edu.np',
      color: 'teal'
    },
    {
      id: 'nrm',
      name: 'Faculty of Natural Resource Management',
      shortName: 'Natural Resources',
      description: 'The Faculty of Natural Resource Management focuses on sustainable management of natural resources. It offers programs that cover various aspects of resource management including forestry, wildlife conservation, and environmental science. The faculty emphasizes ecological balance, conservation strategies, and sustainable development.',
      icon: <TreePine className="w-6 h-6" />,
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
      programs: {
        bachelor: ['B.Sc. Forestry', 'B.Sc. Environmental Science'],
        master: ['M.Sc. Natural Resource Management'],
        mphil: [],
        phd: []
      },
      stats: {
        teachers: 26,
        students: 310,
        staff: 11
      },
      website: 'http://facultynrm.fwu.edu.np',
      email: 'faculty.nrm@fwu.edu.np',
      color: 'emerald'
    }
  ];

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
    const currentRef = heroRef.current;

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

  const handleFacultyClick = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setActiveTab('overview');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' | 'hover-bg' | 'hover-border' | 'hover-text') => {
    const colorMap: Record<string, Record<string, string>> = {
      indigo: {
        'bg': 'bg-indigo-600',
        'text': 'text-indigo-600',
        'border': 'border-indigo-600',
        'hover-bg': 'hover:bg-indigo-700',
        'hover-border': 'hover:border-indigo-700',
        'hover-text': 'hover:text-indigo-700'
      },
      blue: {
        'bg': 'bg-blue-600',
        'text': 'text-blue-600',
        'border': 'border-blue-600',
        'hover-bg': 'hover:bg-blue-700',
        'hover-border': 'hover:border-blue-700',
        'hover-text': 'hover:text-blue-700'
      },
      purple: {
        'bg': 'bg-purple-600',
        'text': 'text-purple-600',
        'border': 'border-purple-600',
        'hover-bg': 'hover:bg-purple-700',
        'hover-border': 'hover:border-purple-700',
        'hover-text': 'hover:text-purple-700'
      },
      green: {
        'bg': 'bg-green-600',
        'text': 'text-green-600',
        'border': 'border-green-600',
        'hover-bg': 'hover:bg-green-700',
        'hover-border': 'hover:border-green-700',
        'hover-text': 'hover:text-green-700'
      },
      red: {
        'bg': 'bg-red-600',
        'text': 'text-red-600',
        'border': 'border-red-600',
        'hover-bg': 'hover:bg-red-700',
        'hover-border': 'hover:border-red-700',
        'hover-text': 'hover:text-red-700'
      },
      orange: {
        'bg': 'bg-orange-600',
        'text': 'text-orange-600',
        'border': 'border-orange-600',
        'hover-bg': 'hover:bg-orange-700',
        'hover-border': 'hover:border-orange-700',
        'hover-text': 'hover:text-orange-700'
      },
      lime: {
        'bg': 'bg-lime-600',
        'text': 'text-lime-600',
        'border': 'border-lime-600',
        'hover-bg': 'hover:bg-lime-700',
        'hover-border': 'hover:border-lime-700',
        'hover-text': 'hover:text-lime-700'
      },
      teal: {
        'bg': 'bg-teal-600',
        'text': 'text-teal-600',
        'border': 'border-teal-600',
        'hover-bg': 'hover:bg-teal-700',
        'hover-border': 'hover:border-teal-700',
        'hover-text': 'hover:text-teal-700'
      },
      emerald: {
        'bg': 'bg-emerald-600',
        'text': 'text-emerald-600',
        'border': 'border-emerald-600',
        'hover-bg': 'hover:bg-emerald-700',
        'hover-border': 'hover:border-emerald-700',
        'hover-text': 'hover:text-emerald-700'
      }
    };

    return colorMap[color][type] || colorMap['indigo'][type];
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative py-20 md:py-28 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-500 opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 opacity-10 animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-5 animate-pulse"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-6 p-2 bg-indigo-800/30 rounded-full">
              <div className="px-4 py-1 bg-indigo-700/50 rounded-full">
                <span className="text-indigo-100 font-medium">Far Western University</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Faculties</span>
            </h1>

            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore the diverse academic faculties at Far Western University, each dedicated to excellence in education, research, and innovation.
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Selected Faculty Detail Section */}
      {selectedFaculty && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Faculty Header */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <div className="h-64 md:h-80 relative">
                  <Image
                    src={selectedFaculty.imageUrl}
                    alt={selectedFaculty.name}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r from-${selectedFaculty.color}-900/80 to-${selectedFaculty.color}-800/70`}></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedFaculty.name}</h2>
                      <div className="flex items-center text-white/80 text-sm">
                        <MapPin className="mr-2" />
                        <span>Far Western University, Mahendranagar, Nepal</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <a
                        href={selectedFaculty.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 rounded-lg bg-white text-${selectedFaculty.color}-600 font-medium hover:bg-${selectedFaculty.color}-50 transition-colors`}
                      >
                        Visit Faculty Website
                        <ArrowRight className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8 border-b border-gray-200">
                <div className="flex overflow-x-auto scrollbar-hide space-x-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'overview'
                        ? `border-${selectedFaculty.color}-600 text-${selectedFaculty.color}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('programs')}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'programs'
                        ? `border-${selectedFaculty.color}-600 text-${selectedFaculty.color}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Programs
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'stats'
                        ? `border-${selectedFaculty.color}-600 text-${selectedFaculty.color}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Statistics
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'contact'
                        ? `border-${selectedFaculty.color}-600 text-${selectedFaculty.color}-600`
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">About the Faculty</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedFaculty.description}</p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      <div className={`p-6 rounded-lg bg-${selectedFaculty.color}-50 border border-${selectedFaculty.color}-100`}>
                        <div className={`w-12 h-12 rounded-full bg-${selectedFaculty.color}-100 flex items-center justify-center mb-4`}>
                          <GraduationCap className={`text-${selectedFaculty.color}-600 text-xl`} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Academic Excellence</h4>
                        <p className="text-gray-600 text-sm">Committed to providing high-quality education through innovative teaching methods and comprehensive curricula.</p>
                      </div>

                      <div className={`p-6 rounded-lg bg-${selectedFaculty.color}-50 border border-${selectedFaculty.color}-100`}>
                        <div className={`w-12 h-12 rounded-full bg-${selectedFaculty.color}-100 flex items-center justify-center mb-4`}>
                          <Book className={`text-${selectedFaculty.color}-600 text-xl`} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Research Focus</h4>
                        <p className="text-gray-600 text-sm">Dedicated to advancing knowledge through research and scholarly activities in various disciplines.</p>
                      </div>

                      <div className={`p-6 rounded-lg bg-${selectedFaculty.color}-50 border border-${selectedFaculty.color}-100`}>
                        <div className={`w-12 h-12 rounded-full bg-${selectedFaculty.color}-100 flex items-center justify-center mb-4`}>
                          <Users className={`text-${selectedFaculty.color}-600 text-xl`} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Engagement</h4>
                        <p className="text-gray-600 text-sm">Actively involved in community service and outreach programs to address local and regional challenges.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Programs Tab */}
                {activeTab === 'programs' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Academic Programs</h3>

                    {/* Bachelor Programs */}
                    {selectedFaculty.programs.bachelor.length > 0 && (
                      <div>
                        <h4 className={`text-lg font-semibold ${getColorClass(selectedFaculty.color, 'text')} mb-4 flex items-center`}>
                          <GraduationCap className="mr-2" />
                          Bachelor Programs
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedFaculty.programs.bachelor.map((program, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                              <h5 className="font-medium text-gray-900">{program}</h5>
                              <p className="text-sm text-gray-500 mt-1">4-Year Program</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Master Programs */}
                    {selectedFaculty.programs.master.length > 0 && (
                      <div>
                        <h4 className={`text-lg font-semibold ${getColorClass(selectedFaculty.color, 'text')} mb-4 flex items-center`}>
                          <GraduationCap className="mr-2" />
                          Master Programs
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedFaculty.programs.master.map((program, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                              <h5 className="font-medium text-gray-900">{program}</h5>
                              <p className="text-sm text-gray-500 mt-1">2-Year Program</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MPhil Programs */}
                    {selectedFaculty.programs.mphil.length > 0 && (
                      <div>
                        <h4 className={`text-lg font-semibold ${getColorClass(selectedFaculty.color, 'text')} mb-4 flex items-center`}>
                          <GraduationCap className="mr-2" />
                          MPhil Programs
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedFaculty.programs.mphil.map((program, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                              <h5 className="font-medium text-gray-900">{program}</h5>
                              <p className="text-sm text-gray-500 mt-1">1.5-Year Program</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PhD Programs */}
                    {selectedFaculty.programs.phd.length > 0 && (
                      <div>
                        <h4 className={`text-lg font-semibold ${getColorClass(selectedFaculty.color, 'text')} mb-4 flex items-center`}>
                          <GraduationCap className="mr-2" />
                          PhD Programs
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedFaculty.programs.phd.map((program, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                              <h5 className="font-medium text-gray-900">{program}</h5>
                              <p className="text-sm text-gray-500 mt-1">3-Year Program</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Faculty Statistics</h3>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      <div className={`p-6 rounded-lg bg-white border border-gray-200 shadow-sm text-center`}>
                        <div className={`w-16 h-16 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mx-auto mb-4`}>
                          <Check className="text-white text-2xl" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{selectedFaculty.stats.teachers}</div>
                        <p className="text-gray-500">Faculty Members</p>
                      </div>

                      <div className={`p-6 rounded-lg bg-white border border-gray-200 shadow-sm text-center`}>
                        <div className={`w-16 h-16 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mx-auto mb-4`}>
                          <GraduationCap className="text-white text-2xl" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{selectedFaculty.stats.students}</div>
                        <p className="text-gray-500">Students</p>
                      </div>

                      <div className={`p-6 rounded-lg bg-white border border-gray-200 shadow-sm text-center`}>
                        <div className={`w-16 h-16 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mx-auto mb-4`}>
                          <Users className="text-white text-2xl" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">{selectedFaculty.stats.staff}</div>
                        <p className="text-gray-500">Administrative Staff</p>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mt-0.5 mr-3`}>
                            <Award className="text-white text-xs" />
                          </div>
                          <p className="text-gray-700">Recognized for excellence in academic programs and research initiatives.</p>
                        </li>
                        <li className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mt-0.5 mr-3`}>
                            <Award className="text-white text-xs" />
                          </div>
                          <p className="text-gray-700">Established partnerships with national and international institutions for collaborative research.</p>
                        </li>
                        <li className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mt-0.5 mr-3`}>
                            <Award className="text-white text-xs" />
                          </div>
                          <p className="text-gray-700">Contributed to community development through various outreach programs and initiatives.</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">Email</h4>
                              <a href={`mailto:${selectedFaculty.email}`} className={`text-${selectedFaculty.color}-600 hover:underline`}>
                                {selectedFaculty.email}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                              <p className="text-gray-700">+977-099-520729</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">Address</h4>
                              <p className="text-gray-700">Bheemdatta Municipality-18, Mahendranagar, Kanchanpur, Nepal</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getColorClass(selectedFaculty.color, 'bg')} flex items-center justify-center mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">Website</h4>
                              <a href={selectedFaculty.website} target="_blank" rel="noopener noreferrer" className={`text-${selectedFaculty.color}-600 hover:underline`}>
                                {selectedFaculty.website.replace('http://', '')}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-gray-100 p-6 rounded-lg h-full">
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Office Hours</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sunday - Friday</span>
                              <span className="text-gray-900 font-medium">10:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Saturday</span>
                              <span className="text-gray-900 font-medium">Closed</span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h4>
                            <p className="text-gray-600 mb-4">
                              For more information about programs, admissions, or any other inquiries, please feel free to contact us.
                            </p>
                            <Link
                              href="/contact"
                              className={`inline-flex items-center px-4 py-2 rounded-lg ${getColorClass(selectedFaculty.color, 'bg')} text-white font-medium hover:${getColorClass(selectedFaculty.color, 'hover-bg')} transition-colors`}
                            >
                              Contact Us
                              <ArrowRight className="ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Faculty Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Faculties</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Far Western University offers a diverse range of academic faculties, each dedicated to excellence in education, research, and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculties.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 group cursor-pointer"
                onClick={() => handleFacultyClick(faculty)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={faculty.imageUrl}
                    alt={faculty.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${faculty.color}-900/80 to-transparent`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-lg">{faculty.shortName}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${getColorClass(faculty.color, 'bg')} flex items-center justify-center mr-3`}>
                      {faculty.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{faculty.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{faculty.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <GraduationCap className="mr-1" />
                      <span>{faculty.programs.bachelor.length + faculty.programs.master.length} Programs</span>
                    </div>
                    <button
                      className={`inline-flex items-center text-${faculty.color}-600 font-medium group-hover:text-${faculty.color}-700 transition-colors`}
                    >
                      Learn More
                      <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500 opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Academic Journey?</h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Join Far Western University and become part of our vibrant academic community. Explore our programs and take the first step towards a successful future.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/fwu/notice"
                className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
              >
                Explore Notice
              </Link>
              <Link
                href="/fwu/apply"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
