// pages/apply.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
// import ApplicationForm from "../components/apply/ApplicationForm";
import { ArrowRight, Users, Layers, TrendingUp, AlertTriangle, Loader } from "lucide-react";
import ApplicationCards from "./_components/ApplicationCard";
import Pagination from "./_components/Pagination";
import {  useState } from "react";


export interface Application {
  id: number;
  title: string;
  description: string;
  end_date: string; // Assuming this is a date string
  status: string; // Assuming status is a string, adjust if it's an enum or specific type
  created_at: string;
  updated_at: string;
}
export default function ApplyPage() {
    const [currentPage, setCurrentPage] = useState(1);
  const { data: mockApplicantsData, isError, isLoading } = useQuery({
    queryKey: ["application", currentPage],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application?page=${currentPage}`);
      return res.json();
    },
  });



  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center gap-3 p-6 ">
          <Loader className="animate-spin w-10 h-10 text-blue-600" />
          <span className="text-lg font-medium text-blue-700">
            Loading, please wait...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We&#39;re sorry, but an unexpected error has occurred. Please try
            again.
          </p>
        </div>
      </div>
    );
  }

  if (!mockApplicantsData) {
    // Handle the case where data might be null or undefined after loading
    return <div>No data available.</div>;
  }


  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500 opacity-10 animate-float-reverse"></div>
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

        {/* Hero content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 p-2 bg-blue-800/30 rounded-full">
              <div className="px-4 py-1 bg-blue-700/50 rounded-full">
                <span className="text-blue-100 font-medium">
                  FWU Incubation Center
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                Launch
              </span>{" "}
              Your Venture?
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Join the FWU Incubation Center and transform your innovative idea
              into a successful business reality.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-white text-sm">
                  Mentorship & Guidance
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-white text-sm">
                  Funding Opportunities
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-white text-sm">Networking Events</span>
              </div>
            </div>

            <a
              href="#application-form"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
            >
              Apply Now <ArrowRight className="ml-2" />
            </a>
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

      {/* Benefits Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Our Incubation Center?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FWU Incubation Center provides the resources, mentorship, and
              environment you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-blue-50 rounded-xl p-8 shadow-sm border border-blue-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Mentorship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get guidance from industry experts, successful entrepreneurs,
                and academic professionals who will help navigate your startup
                journey.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-8 shadow-sm border border-indigo-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Layers className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Resources & Infrastructure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access workspace, technology resources, meeting rooms, and other
                facilities needed to develop and grow your startup.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 shadow-sm border border-purple-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Funding Opportunities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with potential investors, learn about grants, and
                explore various funding avenues to fuel your startup&apos;s
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form"  className="py-20 bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Apply?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the application form to join the FWU Incubation Center
              and take the first step towards launching your startup.
            </p>
          </div>


          {/* Application Form Component */}
          {/* <ApplicationForm /> */}
        </div>
      </section>
      <section id="application-form" >
        <div className="w-full">
          <ApplicationCards applications={mockApplicantsData?.data} />
        </div>
         {/* Pagination */}
        <Pagination
          applicantsData={mockApplicantsData}
          currentPage={currentPage}
          totalPages={mockApplicantsData.last_page}
          onPageChange={setCurrentPage}
        />
      </section>
     
    </>
  );
}
