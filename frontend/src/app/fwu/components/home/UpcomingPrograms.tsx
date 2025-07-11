// components/home/UpcomingPrograms.tsx
"use client"
import { useState} from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import NewsListItem from '../news/NewsListItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from '../shared/SectionTitle';



// Updated News Item Data Interface to match API response
export interface NewsItemData {
  id: number;
  title: string;
  created_at: string; // API uses created_at instead of date
  category: string;
  description: string; // API uses description instead of summary
  slug?: string; // Generate from title since API doesn't provide slug
  imageUrl?: string; // Will be constructed from news_photo
  news_photo?: string;
  admin?: {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_image?: string;
  };
}

// API Response Interface
interface NewsApiResponse {
  current_page: number;
  data: NewsItemData[];
  total: number;
  per_page: number;
  last_page: number;
}

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toISOString().split("T")[0];
};


// --- SIMULATED API RESPONSE DATA ---

// IMPORTANT: Replace with your actual backend URL, ideally from .env file


const UpcomingPrograms = () => {

    const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: apiResponse,
    isError,
    isLoading,
  } = useQuery<NewsApiResponse>({
    queryKey: ["news", currentPage, searchTerm],

    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        page: currentPage.toString(),
      });
      return (
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news?${params}`)
      ).data;
    },
  });
  // const {newsData}=useContext(AllDataContext);
  // console.log(newsData,"newsData");


  // Extract unique categories for filtering


  if (isError) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading News
          </h2>
          <p className="text-gray-600">
            Unable to fetch news data. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </main>
    );
  }
  const filterData =
    apiResponse?.data.filter(
      (item) =>
        item?.category?.toLocaleLowerCase() ==
        selectedCategory?.toLocaleLowerCase()
    ) ||
    apiResponse?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
      {/* Background and pattern overlays */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-100/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events & Programs </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our exciting programs designed to accelerate your entrepreneurial journey.
          </p>
        </div>

        {/* Dynamically generated program cards from API data */}
        <div className="">
           {apiResponse ? (
            <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3   space-y-8">
              {filterData && filterData.length !== 0
                ? filterData.map((item) => (
                    <NewsListItem
                      key={item.id}
                      item={{
                        id: item.id.toString(),
                        title: item.title,
                        date: formatDate(item.created_at),
                        category: item.category,
                        summary: item.description,
                        slug: item.slug || generateSlug(item.title),
                        imageUrl: item.imageUrl,
                      }}
                      // index={index}
                    />
                  ))
                : apiResponse.data?.map((item) => (
                    <NewsListItem
                      key={item.id}
                      item={{
                        id: item.id.toString(),
                        title: item.title,
                        date: formatDate(item.created_at),
                        category: item.category,
                        summary: item.description,
                        slug: item.slug || generateSlug(item.title),
                        imageUrl: item.imageUrl,
                      }}
                      // index={index}
                    />
                  ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
              <SectionTitle
                title="No Results Found"
                subtitle="Try adjusting your search or filters"
              />
              <p className="text-gray-600 mt-4 px-6">
                We couldn&apos;t find any news or updates matching your
                criteria. Please try different keywords or browse all
                categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                View All News
              </button>
            </div>
          )}
        </div>

        {/* View all programs button */}
        <div className="mt-16 text-center flex justify-center items-center flex-col" >
          <Link
            href="/fwu/news"
            className=" flex gap-1 w-[200px] items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            View All News
            <ArrowRight className="ml-2" />
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Stay updated with our latest events and programs.
          </p>
        </div>
      </div>

      
    </section>
  );
};

export default UpcomingPrograms;