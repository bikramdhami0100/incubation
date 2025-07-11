"use client"
import React from 'react';
import { X, User, Calendar, Tag, ImageIcon } from 'lucide-react';
import Image from 'next/image';
  interface Admin {
    id: number;
    name: string;
    email: string;
    profile_image: string;
    role: string;
    created_at: string;
    updated_at: string;
    email_verified: number;
  }

  interface NewsItem {
    id: number;
    title: string;
    description: string;
    news_photo?: string|File|null;
    category: string;
    added_by: number;
    created_at: string;
    updated_at: string;
    admin: Admin;
  }
const ViewDetails = ({  item, isModalOpen, setIsModalOpen }:{item: NewsItem; isModalOpen: { select: boolean; item: NewsItem | null }; setIsModalOpen: React.Dispatch<React.SetStateAction<{ select: boolean; item: NewsItem | null }>>}) => {

  const newsItem: NewsItem = {
    "id": item?.id,
    "title": item?.title,
    "description": item?.description,
    "news_photo": `${process.env.NEXT_PUBLIC_IMAGE_NEWS_BASE_URL}/${item?.news_photo}`,
    "category":item?.category,
    "added_by": item?.added_by,
    "created_at":item?.created_at,
    "updated_at": item?.updated_at,
    "admin": {
      "id": item?.admin?.id,
      "name": item?.admin?.name,
      "email": item?.admin?.email,
      "profile_image": item?.admin?.profile_image,
      "role": item?.admin?.role,
      "created_at": item?.admin?.created_at,
      "updated_at": item?.admin?.updated_at,
      "email_verified": item?.admin?.email_verified
    }
  };





  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

let imageUrl:string="";
if (typeof newsItem?.news_photo == 'string') {
  imageUrl = newsItem?.news_photo;
} else {
  imageUrl = '';
}

  return (
    <div key={newsItem.id} className="p-8">
      {isModalOpen && (
        <div className="fixed backdrop-blur-3xl bg-white overflow-x-hidden inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div style={{ scrollbarWidth:"none"}}  className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">News Details</h2>
              <button
                onClick={() => setIsModalOpen({select: false, item: null})}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* News Image */}
              <div className="mb-6">
                {newsItem?.news_photo ? (
                  <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        {/* <ImageIcon className="w-12 h-12 mx-auto mb-2" /> */}
                        {/* <p className="text-sm">{newsItem.news_photo}</p> */}
                        {
                         imageUrl!='' ? (
                          <Image
                             src={imageUrl}
                            alt={newsItem.title}
                            width={200}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-12 h-12" />
                          </div>
                        )

                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* News Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {newsItem.title}
              </h1>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Tag className="w-3 h-3 mr-1" />
                  {newsItem.category}
                </span>
              </div>

              {/* News Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {newsItem.description}
                </p>
              </div>

              {/* Admin Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Added By
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {newsItem.admin.profile_image ? (
                   <Image
  src={imageUrl}
  alt={newsItem.title}
  width={200}
  height={100}
  className="w-full h-full object-cover"
/>

                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{newsItem.admin.name}</p>
                    <p className="text-sm text-gray-600">{newsItem.admin.email}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                      {newsItem.admin.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created At
                  </h4>
                  <p className="text-sm text-gray-700">
                    {formatDate(newsItem.created_at)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Updated At
                  </h4>
                  <p className="text-sm text-gray-700">
                    {formatDate(newsItem.updated_at)}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>News ID: <span className="font-semibold">#{newsItem.id}</span></span>
                  <span>Admin ID: <span className="font-semibold">#{newsItem.admin.id}</span></span>
                  <span>Email Verified: 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      newsItem.admin.email_verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {newsItem.admin.email_verified ? 'Yes' : 'No'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

        
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
