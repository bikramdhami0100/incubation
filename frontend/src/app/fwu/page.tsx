
"use client";
// import FeaturedStartups from "./components/home/FeaturedStartups";
import Testimonials from "./components/home/Testimonials";
import UpcomingPrograms from "./components/home/UpcomingPrograms";
import IntroAbout from "./components/about/IntroAbout";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown } from "lucide-react";
import {
  GraduationCap,
  Users,
  Book,
  Award,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function FWUPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          heroObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentHeroRef = heroRef.current;
    const currentStatsRef = statsRef.current;

    if (currentHeroRef) {
      heroObserver.observe(currentHeroRef);
    }

    if (currentStatsRef) {
      statsObserver.observe(currentStatsRef);
    }

    return () => {
      if (currentHeroRef) {
        heroObserver.unobserve(currentHeroRef);
      }
      if (currentStatsRef) {
        statsObserver.unobserve(currentStatsRef);
      }
    };
  }, []);
  return (
    <>
      <main>
        
        {/* Hero Banner with Parallax and Animation Effects */}
 
          <div
          ref={heroRef}
          className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Far Western University Campus"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/85 to-blue-900/80"></div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${
                    5 + Math.random() * 10
                  }s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
           <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                backgroundColor: i % 3 === 0 ? '#93c5fd' : i % 3 === 1 ? '#c4b5fd' : '#bae6fd',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `moveUpRight ${Math.random() * 15 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            ></div>
          ))}
        </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          {/* Content with animations */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center py-16">
            <div
              className={`transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-block mb-4 ">
                <div className="flex items-center mb-2 justify-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Building2 className="text-indigo-300" />
                  <span className="text-white font-medium">
                    Established 2010
                  </span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
                {/* <span className="block mb-3 text-white/90 text-4xl sm:text-5xl md:text-6xl">Welcome to</span> */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 animate-gradient">
                  Far Western University
                </span>
              </h1>
              {/* Badge */}
            
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-10">
                A premier institution in Nepal dedicated to academic excellence,
                research-based education, and community engagement in the Far
                Western region.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="#university-intro"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center group"
                >
                  Learn More
                  <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/fwu/contact"
                  prefetch={true}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-all duration-300 border border-white/20 flex items-center group"
                >
                  Contact Us
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 120"
              className="w-full h-auto"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                style={{ animation: "wave 15s ease-in-out infinite" }}
              ></path>
            </svg>
          </div>
        </div>
        {/* Quick Stats Section */}
        <div
          ref={statsRef}
          className="py-16 bg-gradient-to-b from-white to-indigo-50 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    icon: (
                      <GraduationCap className="text-indigo-600" size={28} />
                    ),
                    count: 491,
                    label: "Teachers",
                    delay: 100,
                  },
                  {
                    icon: <Users className="text-indigo-600" size={28} />,
                    count: 17238,
                    label: "Students",
                    delay: 300,
                  },
                  {
                    icon: <Book className="text-indigo-600" size={28} />,
                    count: 180,
                    label: "Staff",
                    delay: 500,
                  },
                  {
                    icon: <Award className="text-indigo-600" size={28} />,
                    count: 17909,
                    label: "Users",
                    delay: 700,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 flex flex-col items-center justify-center transform transition-all duration-700 ${
                      statsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${stat.delay}ms` }}
                  >
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-1">
                      {statsVisible ? stat.count : 0}
                    </div>
                    <div className="text-indigo-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        
        {/* Main content sections */}
        <div id="university-intro">
          <IntroAbout />
        </div>
        {/* <IntroSection /> */}
        <UpcomingPrograms />
        {/* <FeaturedStartups /> */}
        <Testimonials />
      </main>
    </>
  );
}
