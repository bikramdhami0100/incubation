"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsItemData {
  id: string;
  title: string;
  slug: string;
  date: string;
  imageUrl?: string;
  summary: string;
}

interface NewsRelatedProps {
  currentArticleId: string;
  allNews: NewsItemData[];
}

const NewsRelated: React.FC<NewsRelatedProps> = ({ currentArticleId, allNews }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter out the current article and get up to 3 related articles
  const relatedArticles = allNews
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className={`mb-10 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Articles</h2>
          <div className="w-20 h-1 bg-indigo-600 mb-4 rounded-full"></div>
          <p className="text-gray-600">
            Explore more news and updates from the FWU Incubation Center
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedArticles.map((article, index) => (
            <div 
              key={article.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center text-white/90 text-xs">
                    <Calendar className="mr-1.5" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/news/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.summary}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                >
                  Read Article <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsRelated;
