"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

interface NewsHeroProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const NewsHero: React.FC<NewsHeroProps> = ({ setSearchTerm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(data);
  };

  return (
    <section className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-500 opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 opacity-10 animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-5 animate-pulse"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div
              className={`md:w-1/2 text-center md:text-left transition-all duration-1000 transform ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="inline-block mb-6 p-2 bg-indigo-800/30 rounded-full">
                <div className="px-4 py-1 bg-indigo-700/50 rounded-full">
                  <span className="text-indigo-100 font-medium">
                    FWU Incubation Center
                  </span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                Latest{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  News & Updates
                </span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Stay informed about the latest developments, events, and opportunities
                at the Far Western University Incubation Center.
              </p>

              <form
                onSubmit={handleSubmit}
                className="relative max-w-md mx-auto md:mx-0"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search news & updates..."
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-lg transition-colors text-white placeholder-white/70"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70"
                  size={20}
                />
              </form>
            </div>

            <div
              className={`md:w-1/2 mt-10 md:mt-0 transition-all duration-1000 delay-300 transform ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative h-64 md:h-80 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl transform rotate-3 scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl transform -rotate-3 scale-105"></div>
                <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/gate.jpg"
                    alt="FWU Incubation Center News"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-indigo-600/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      Latest Updates
                    </span>
                    <h3 className="text-white text-xl font-bold mt-2">
                      Empowering Innovation at Far Western University
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default NewsHero;
