"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag, Newspaper } from 'lucide-react';

export interface NewsItemData {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  slug: string;
  imageUrl: string | undefined;
}

interface NewsListItemProps {
  item: NewsItemData;
}

const NewsListItem: React.FC<NewsListItemProps> = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // A simple function to get a color for the gradient based on category (optional, but adds variety)
  const getGradientColors = (category: string) => {
    const colorMap: { [key: string]: string } = {
      event: 'from-emerald-500 to-green-600',
      announcement: 'from-purple-500 to-indigo-600',
      research: 'from-blue-500 to-sky-600',
      startup: 'from-orange-500 to-amber-600',
      seminar: 'from-indigo-500 to-violet-600',
      funding: 'from-green-500 to-teal-600',
      training: 'from-cyan-500 to-blue-600',
      achievement: 'from-yellow-500 to-orange-600',
      workshop: 'from-pink-500 to-rose-600',
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
      {/* Card Header */}
      <div className={`bg-gradient-to-br ${getGradientColors(item.category)} p-6 sm:p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          {/* Top Row: Title and Category */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold leading-tight flex-1 pr-4">
              <Link href={`/fwu/news/${item.id}`} className="hover:underline">
                {item.title}
              </Link>
            </h2>
            <div className=" border bg-opacity-20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center shrink-0">
              <Tag className="w-3 h-3 mr-1.5" />
              {item.category}
            </div>
          </div>

          {/* Bottom Row: Image and Date */}
          <div className="flex justify-between items-end">
            {/* Image Avatar */}
            <div className="flex-shrink-0">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-4 border-white/50 shadow-lg"
                />
              ) : (
                <div className={`w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center bg-gradient-to-br ${getGradientColors(item.category)}`}>
                  {/* <Tag className="w-8 h-8 text-white" /> */}
                  <Newspaper/>
                </div>
              )}
            </div>
            
            <div className="text-sm opacity-90 text-right">
              <Calendar className="w-4 h-4 inline mr-1.5" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8">
        <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed">
          {item.summary}
        </p>

        <div className="flex justify-end items-center">
          <Link
            href={`/fwu/news/${item.id}`}
            className="group/button cursor-pointer inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Read Full Article
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsListItem;