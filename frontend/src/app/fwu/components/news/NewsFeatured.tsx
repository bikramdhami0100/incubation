"use client"
import { useState, useEffect } from 'react';
// Define NewsItemData type if not imported from elsewhere
export interface NewsItemData {
  id: string | number;
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
  imageUrl?: string;
}
// import { NewsItemData } from '@/app/news/page';
import Image from 'next/image';
import Link from 'next/link';
import {Calendar, ArrowRight } from "lucide-react"

interface NewsFeaturedProps {
  featuredNews: NewsItemData[];
}

const NewsFeatured: React.FC<NewsFeaturedProps> = ({ featuredNews }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!featuredNews || featuredNews.length === 0) {
    return null;
  }

  // Take the first item as the main featured news
  const mainFeatured = featuredNews[0];
  // Take the next 2 items (if available) as secondary featured news
  const secondaryFeatured = featuredNews.slice(1, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'News': 'bg-blue-500/10 text-blue-700 border-blue-300',
      'Notice': 'bg-yellow-500/10 text-yellow-700 border-yellow-400',
      'Event Recap': 'bg-green-500/10 text-green-700 border-green-400',
      'Announcement': 'bg-purple-500/10 text-purple-700 border-purple-400',
    };

    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 border-gray-400';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Updates</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements from the Far Western University Incubation Center
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main featured news */}
          <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 md:h-80 overflow-hidden">
                {mainFeatured.imageUrl ? (
                  <Image
                    src={mainFeatured.imageUrl}
                    alt={mainFeatured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(mainFeatured.category)}`}>
                    {mainFeatured.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mt-2 group-hover:text-indigo-200 transition-colors">
                    {mainFeatured.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm mt-2">
                    <Calendar className="mr-2" />
                    <span>{formatDate(mainFeatured.date)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {mainFeatured.summary}
                </p>
                <Link
                  href={`/news/${mainFeatured.slug}`}
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group"
                >
                  Read Full Story <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary featured news */}
          <div className="space-y-6">
            {secondaryFeatured.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {item.imageUrl && (
                    <div className="md:w-1/3 h-48 relative flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className={`p-6 flex flex-col ${item.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block w-fit mb-3 ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      <Link href={`/news/${item.slug}`} className="hover:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="mr-2 text-indigo-500" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.summary}
                    </p>
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group mt-auto"
                    >
                      Read More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeatured;
