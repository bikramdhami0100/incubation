// components/news/NewsItemCard.tsx
import { NewsItemData } from '@/app/news/page';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface NewsItemCardProps {
  item: NewsItemData;
}

const NewsItemCard: React.FC<NewsItemCardProps> = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Category specific styling (optional)
  const categoryColor = (category: NewsItemData['category']) => {
    switch (category) {
      case 'News': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Notice': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Event Recap': return 'bg-green-100 text-green-700 border-green-300';
      case 'Announcement': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      {item.imageUrl && (
        <div className="relative w-full h-48">
          <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" />
           <span
            className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full border ${categoryColor(item.category)}`}
          >
            <Tag className="inline mr-1.5 mb-0.5" /> {item.category}
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {!item.imageUrl && ( // Show category tag here if no image
             <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border inline-block mb-3 ${categoryColor(item.category)}`}
          >
            <Tag className="inline mr-1.5 mb-0.5" /> {item.category}
          </span>
        )}
        <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors leading-tight">
          {/* Link to a full news page would go here if `item.slug` is used */}
          <Link href={`/news/${item.slug}`} className="hover:underline">
            {item.title}
          </Link>
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="mr-2 text-brand-accent" />
          <span>{formattedDate}</span>
        </div>
        <p className="text-gray-600 text-sm mb-5 flex-grow line-clamp-3">
          {item.summary}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link
            href={`/news/${item.slug}`} // Link to the full news/notice page
            className="inline-flex items-center text-brand-primary hover:text-brand-accent font-semibold transition-colors"
          >
            Read More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsItemCard;