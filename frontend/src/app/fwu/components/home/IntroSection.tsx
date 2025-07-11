// components/home/IntroSection.tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Building2, Zap, Plus } from 'lucide-react';

// A simple array to hold the feature data. Easy to add or remove items.
const features = [
  'Mentorship & Guidance',
  'Workspace & Resources',
  'Funding Opportunities',
  'Networking Events',
  'Technical Support',
  'Business Development'
];

const IntroSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full">
              <Building2 className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FWU Incubation Center
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600">
            Transforming innovative ideas into successful ventures through mentorship, resources, and a collaborative ecosystem.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            {/* Our Mission Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full text-indigo-600 mr-4">
                  <Zap className="h-5 w-5" />
                </span>
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We aim to foster innovation and entrepreneurship by providing a supportive environment for startups to grow. Our goal is to bridge the gap between academic research and commercial success.
              </p>
            </div>

            {/* What We Offer Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-6">What We Offer</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center p-3 bg-gray-50 rounded-lg transition-transform hover:-translate-y-1"
                  >
                    <Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/fwu/notice" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group">
                  Explore Our Notices
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Image with Overlays */}
          {/* The `group` class allows child elements to be styled on parent hover (e.g., `group-hover:scale-105`) */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div className="relative h-[550px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="Students collaborating at the incubation center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Info Cards */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">20+ Startups</h4>
              </div>
              <p className="text-sm text-gray-700">Currently incubating innovative ventures.</p>
            </div>

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[240px]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Join Our Community</h3>
              <p className="text-sm text-gray-700 mb-3">
                Be part of a thriving ecosystem of innovators.
              </p>
              <Link href="/fwu/apply" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                Apply Now <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;