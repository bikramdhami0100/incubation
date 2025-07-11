"use client";
import { useState } from "react";
import NewsListItem from "../components/news/NewsListItem";
import NewsHero from "../components/news/NewsHero";
import NewsCategoryFilter from "../components/news/NewsCategoryFilter";
import SectionTitle from "../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { AllDataContext, FetchAllContext } from '@/app/fwucontext/FetchAll';

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

export default function NewsPage() {
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

  console.log(searchTerm, "searchTerm");

  // Extract unique categories for filtering
  const uniqueCategories = Array.from(
    new Set(apiResponse?.data?.map((n) => n.category) || [])
  ).sort();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of news section
    document
      .getElementById("news-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const generatePageNumbers = () => {
    const totalPages = apiResponse?.last_page || 1;
    const currentPageNum = currentPage;
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page and surrounding pages
      if (currentPageNum <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPageNum >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPageNum - 1; i <= currentPageNum + 1; i++)
          pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

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

  console.log(searchTerm, "searchTerm");
  return (
    <main className="bg-gray-100">
      {/* Hero Section with Search */}
      <NewsHero
        // searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
     
      {/* Category Filter */}
      <NewsCategoryFilter
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* News List Section */}
      <section id="news-section" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {searchTerm || selectedCategory
                ? "Search Results"
                : "All News & Updates"}
            </h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {searchTerm || selectedCategory
                ? `Showing ${apiResponse?.data?.length || 0} result${
                    (apiResponse?.data?.length || 0) !== 1 ? "s" : ""
                  } of ${apiResponse?.total || 0} total`
                : "Browse all news, announcements, and updates from the FWU Incubation Center"}
            </p>
            {apiResponse?.total && (
              <p className="text-sm text-gray-500 mt-2">
                Page {currentPage} of {apiResponse.last_page} • Total articles:{" "}
                {apiResponse.total}
              </p>
            )}
          </div>

          {apiResponse ?(
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

          {/* Pagination */}
          {apiResponse && apiResponse.last_page > 1 && (
            <div className="mt-12 flex justify-center">
              <nav
                className="flex items-center space-x-2"
                aria-label="Pagination"
              >
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page as number)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </div>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === apiResponse.last_page}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === apiResponse.last_page
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}

          {/* Pagination Info */}
          {apiResponse && apiResponse.last_page > 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * apiResponse.per_page + 1} to{" "}
                {Math.min(
                  currentPage * apiResponse.per_page,
                  apiResponse.total
                )}{" "}
                of {apiResponse.total} results
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
