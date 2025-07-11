import React from "react";
import {

  Sparkles,
  Award,
  Users,
  Target,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  pageTitle: string;
  pageSubtitle: string;
  breadcrumb?: string[];
  showStats?: boolean;
  page?: string;
}

// Enhanced Header Component with responsive height and beautiful wave
const UniversityDashboardHeader: React.FC<HeaderProps> = ({
  pageTitle,
  pageSubtitle,
  breadcrumb = [],
  showStats = true,
  page,
}) => (
  <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden h-screen md:h-[50vh] min-h-[400px]">
    {/* Animated Background Elements */}
    <div className="absolute inset-0">
      {/* Floating Orbs */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-r from-yellow-400/25 to-orange-500/25 rounded-full blur-xl animate-bounce delay-500"></div>

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-1/4 transform rotate-45">
        <div className="w-8 h-8 bg-white/10 animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-40 right-1/4 transform rotate-12">
        <div className="w-6 h-6 bg-gradient-to-r from-cyan-300/20 to-blue-400/20 rounded-full animate-ping"></div>
      </div>

      {/* Sparkles */}
      <div className="absolute top-16 left-1/3 text-yellow-300 animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-28 right-1/3 text-cyan-300 animate-pulse delay-1000">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 h-full flex items-center">
      {page == "dashboard" ? (
        <div className="flex flex-col space-y-3 w-full lg:w-auto">
          <div className="flex flex-wrap gap-2">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to FWU Incubation Center
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Empowering innovation and entrepreneurship in Far Western
                    Nepal. We foster growth for aspiring startups and
                    researchers.
                  </p>
                  {/* Simulated mission/vision from a university context */}
                  <div className="text-sm text-gray-700 space-y-2 mb-4">
                    <p className="flex items-center">
                      <Target className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-semibold">Our Mission:</span> To
                      cultivate a vibrant ecosystem for groundbreaking ideas and
                      sustainable ventures.
                    </p>
                    <p className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="font-semibold">Our Vision:</span> To be
                      the leading hub for innovation, driving regional
                      development through technology and entrepreneurship.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right text-blue-200 text-xs md:text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div>🕒 Last updated: Just now</div>
            <div className="mt-1">
              📅{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0 w-full">
          {/* Left Side - University Info */}

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Logo Section */}
            <div className="relative group">
              <Image
                  src={"/circlelogo.png"}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-20 w-20 object-contain rounded-lg"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* University Details */}
            <div className="space-y-3">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Far Western University
                </h1>
                {showStats && (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/25 backdrop-blur-sm rounded-full border border-green-400/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-100 text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/25 backdrop-blur-sm rounded-full border border-blue-400/30">
                      <Users className="w-3 h-3 text-blue-200" />
                      <span className="text-blue-100 text-xs font-medium">
                        15K+ Students
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Breadcrumb */}
              {breadcrumb.length > 0 && (
                <div className="flex items-center space-x-2 text-blue-200 text-sm">
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      <span
                        className={
                          index === breadcrumb.length - 1
                            ? "text-white font-medium bg-white/10 px-2 py-1 rounded-md"
                            : "hover:text-white cursor-pointer transition-colors"
                        }
                      >
                        {item}
                      </span>
                      {index < breadcrumb.length - 1 && (
                        <span className="text-blue-300">›</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-100">
                  {pageTitle}
                </h2>
                <p className="text-blue-200 max-w-2xl leading-relaxed text-sm md:text-base">
                  {pageSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-blue-300 text-xs md:text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                  <span>📍 Mahendranagar, Kanchanpur</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                  <span>🏔️ Far West Province, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Quick Actions */}
          <div className="flex flex-col space-y-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/25 transition-all cursor-pointer">
                📊 Dashboard
              </div>
              <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/25 transition-all cursor-pointer">
                🔔 Notifications
              </div>
            </div>
            <div className="text-right text-blue-200 text-xs md:text-sm bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div>🕒 Last updated: Just now</div>
              <div className="mt-1">
                📅{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Beautiful Multi-Layer Wave */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      {/* Wave Layer 1 - Background */}
      <svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 w-full h-20 fill-white/20"
        style={{
          animation: "wave1 8s ease-in-out infinite",
          transform: "translateZ(0)",
        }}
      >
        <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V32Z" />
      </svg>

      {/* Wave Layer 2 - Middle */}
      <svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 w-full h-16 fill-white/40"
        style={{
          animation: "wave2 6s ease-in-out infinite reverse",
          transform: "translateZ(0)",
        }}
      >
        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V64Z" />
      </svg>

      {/* Wave Layer 3 - Foreground */}
      <svg
        viewBox="0 0 1440 120"
        className="relative w-full h-12 fill-gray-50"
        style={{
          animation: "wave3 10s ease-in-out infinite",
          transform: "translateZ(0)",
        }}
      >
        <path d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,69.3C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V96Z" />
      </svg>

      {/* Floating Particles on Wave */}
      <div className="absolute bottom-8 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-80"></div>
      <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-500 opacity-70"></div>
      <div className="absolute bottom-10 right-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
      <div className="absolute bottom-7 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-50"></div>
    </div>

    {/* Custom CSS for wave animations */}
    <style jsx>{`
      @keyframes wave1 {
        0%,
        100% {
          transform: translateX(0) translateY(0);
        }
        50% {
          transform: translateX(-25px) translateY(-10px);
        }
      }

      @keyframes wave2 {
        0%,
        100% {
          transform: translateX(0) translateY(0);
        }
        50% {
          transform: translateX(25px) translateY(-15px);
        }
      }

      @keyframes wave3 {
        0%,
        100% {
          transform: translateX(0) translateY(0);
        }
        50% {
          transform: translateX(-15px) translateY(-5px);
        }
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }
    `}</style>
  </div>
);

export default UniversityDashboardHeader;
