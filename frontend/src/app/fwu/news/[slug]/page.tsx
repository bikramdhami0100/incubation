"use client"
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import { Calendar, Tag, Clock, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface Admin {
  id: number;
  email: string;
  email_verified: boolean;
  name?: string;
}

interface News {
  id: number;
  title: string;
  description: string;
  category: string;
  news_photo?: string;
  created_at: string;
  updated_at: string;
  admin: Admin;
}

interface NewsResponse {
  news: News;
}

interface ErrorResponse {
  message?: string;
  error?: string;
}

const NewsArticlePage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data, isError, isLoading, error } = useQuery<NewsResponse, AxiosError<ErrorResponse>>({
    queryKey: ['news', slug],
    queryFn: async (): Promise<NewsResponse> => {
      const res = await axios.get<NewsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`, {
        withCredentials: true,
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!slug, // Only run query if slug exists
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGoBack = (): void => {
    if (typeof window !== 'undefined') {
      window?.history?.back();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentElement;
    
    if (parent) {
      target.style.display = 'none';
      parent.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-purple-600">
          <div class="text-white text-center">
            <div class="text-6xl mb-4">📰</div>
            <p class="text-xl font-semibold">News Image</p>
          </div>
        </div>
      `;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading news article...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch news details';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{errorMessage}</p>
          <button 
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No News Found</h2>
          <p className="text-gray-600">The requested article could not be found.</p>
          <button 
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { news } = data;
console.log(`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}news/${news.news_photo}`);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button 
            onClick={handleGoBack}
            className="flex cursor-pointer items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-4"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* News Image */}
          {news.news_photo && (
            <div className="relative h-96 bg-gradient-to-r from-indigo-500 to-purple-600 overflow-hidden">
              <Image
                width={800}
                height={400}
                onClick={() => typeof window !== 'undefined' && window.open(`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/news/${news.news_photo}`, '_blank')}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/news/${news.news_photo}`}
                alt={news.title || 'News article image'}
                className="object-cover w-full h-full"
                onError={handleImageError}
                priority
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Category Badge */}
            <div className="flex items-center mb-6">
              <div className="flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Tag className="w-4 h-4 mr-2" />
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title.charAt(0).toUpperCase() + news.title.slice(1)}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                <span className="text-sm">
                  Published: {formatDate(news.created_at)}
                </span>
              </div>
              
              {news.updated_at !== news.created_at && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-500" />
                  <span className="text-sm">
                    Updated: {formatDate(news.updated_at)}
                  </span>
                </div>
              )}
            </div>

            {/* News Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Article Content</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {news.description}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Article ID:</strong> #{news.id}
                </div>
                <div>
                  <strong>Author Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    news.admin.email_verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {news.admin.email_verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsArticlePage;