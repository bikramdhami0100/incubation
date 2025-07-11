"use client"
import { useState } from 'react';
import NoticeHero from "@/app/fwu/components/notices/NoticeHero";

import NoticeListItem from '@/app/fwu/components/notices/NoticeListItem ';;
// import SectionTitle from '../components/shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Notice Item Data Interface to match API response
export interface NoticeItemData {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  description: string;
  file?: string; // PDF file attachment
  added_by: number;
  ended_at?: string | null;
  description_link?: string | null;
  admin?: {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_image?: string;
    created_at: string;
    updated_at: string;
    email_verified: number;
  };
}

// API Response Interface
export interface NoticesApiResponse {
  current_page: number;
  data: NoticeItemData[];
  total: number;
  per_page: number;
  last_page: number;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get relative time
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  
  return formatDate(dateString);
};

// Helper function to construct file URL
const getFileUrl = (fileName?: string): string => {
  if (!fileName) return '';
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/notices/${fileName}`;
};

// Helper function to get admin profile image URL
const getAdminImageUrl = (profileImage?: string): string => {
  if (!profileImage) {
    return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileImage}`;
};

// Helper function to check if notice is recent (within 7 days)
const isRecentNotice = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays <= 7;
};

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
console.log(searchTerm, "searchTerm");
  const { data: apiResponse, isError, isLoading } = useQuery<NoticesApiResponse>({
    queryKey: ["notices", currentPage, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        page: currentPage.toString(),
      });
      return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notice?${params}`)).data;
    }
  });
  // console.log(apiResponse)

  // Reset to page 1 when search changes
  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('notices-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const totalPages = apiResponse?.last_page || 1;
    const currentPageNum = currentPage;
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPageNum <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPageNum >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPageNum - 1; i <= currentPageNum + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (isError) {
    return (
      <main className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Notices</h2>
          <p className="text-gray-600">Unable to fetch notices data. Please try again later.</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="animate-ping absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full h-4 w-4 bg-blue-600"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading notices...</p>
        </div>
      </main>
    );
  }

  return (
  <main className="bg-slate-50 min-h-screen">
      <NoticeHero
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <section id="notices-section" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* UI/UX Enhancement: Add a clear section header to provide context. */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Latest Notices</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">Stay updated with the latest announcements and important information.</p>
          </div>

          {apiResponse?.data && apiResponse.data.length > 0 ? (
            // UI/UX Enhancement: Add a key and a subtle fade-in animation for when the list appears/changes.
            <div key={currentPage + searchTerm} className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {apiResponse.data.map((notice, index) => (
                <NoticeListItem 
                  key={notice.id} 
                  notice={{
                    id: notice.id,
                    title: notice.title,
                    description: notice.description,
                    createdAt: notice.created_at,
                    updatedAt: notice.updated_at,
                    file: notice.file,
                    fileUrl: getFileUrl(notice.file),
                    admin: notice.admin ? {
                      name: notice.admin.name,
                      role: notice.admin.role,
                      profileImage: getAdminImageUrl(notice.admin.profile_image)
                    } : undefined,
                    isRecent: isRecentNotice(notice.created_at),
                    relativeTime: getRelativeTime(notice.created_at),
                    formattedDate: formatDate(notice.created_at)
                  }}
                  index={index}
                />
              ))}
            </div>
          ) : (
             // UI/UX Enhancement: A more visually appealing "No Results" state.
            <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto animate-fade-in">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">No Notices Found</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Your search for {searchTerm} did not return any results. Try a different keyword.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Clear Search & View All
              </button>
            </div>
          )}

          {/* UI/UX Enhancement: Improved pagination controls for better usability and visual appeal. */}
          {apiResponse && apiResponse.last_page > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <nav className="flex items-center space-x-1 sm:space-x-2 bg-white p-2 rounded-full shadow-lg border border-gray-100" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  aria-label="Go to previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {generatePageNumbers().map((page, index) =>
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 py-3 text-gray-500">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`w-11 h-11 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === apiResponse.last_page}
                  className="p-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  aria-label="Go to next page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </nav>

              {/* UI/UX Enhancement: A cleaner, more subtle presentation for pagination info. */}
              <p className="text-sm text-gray-500">
                Page {currentPage} of {apiResponse.last_page}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}