"use client"
import React, { useState } from 'react';
import { X, Calendar, Tag, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
// Define the GalleryItem type here instead of importing as a value
export interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  created_at: string;
  updated_at: string;
  imgcategory_id: number;
  title: string;
  description: string;
  images: string[];
  uploaded_by: null | number;
  category: Category;
}
export interface ImageItem {
  id: number;
  title: string;
  description: string;
  imgcategory_id: number;
  uploaded_by: number | null;
  created_at: string;
  updated_at: string;
  select: string;
  images: string[];
  category: Category;
}

const ViewDetails = ({ 
  item, 
  // selectedAction,
  setSelectedAction
}: {
  item:GalleryItem ; 
  selectedAction:{select:string,item:GalleryItem|null},
  setSelectedAction:React.Dispatch<React.SetStateAction<{select:string,item:GalleryItem|null}>>
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageItem: ImageItem = {
    id: item?.id,
    title: item?.title,
    description: item?.description,
    imgcategory_id: item?.imgcategory_id,
    uploaded_by: item?.uploaded_by,
    created_at: item?.created_at,
    updated_at: item?.updated_at,
    select: "", // Add a default value or use item.select if available
    images: item?.images || [],
    category: {
      id: item?.category?.id,
      name: item?.category?.name,
      image: item?.category?.image,
      created_at: item?.category?.created_at,
      updated_at: item?.category?.updated_at,
      description: item?.category?.description
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

  const getImageUrl = (imageName: string): string => {
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${imageName}`;
  };

  const getCategoryImageUrl = (imageName: string): string => {
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${imageName}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === imageItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageItem.images.length - 1 : prev - 1
    );
  };

  return (
    <div key={imageItem.id} className="p-8">
     
        <div className="fixed backdrop-blur-3xl bg-white overflow-x-hidden inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div 
            style={{ scrollbarWidth: "none" }} 
            className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Image Gallery Details</h2>
              <button
                onClick={() => setSelectedAction({select: "", item: null})}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Image Gallery */}
              <div className="mb-6">
                {imageItem.images && imageItem.images.length > 0 ? (
                  <div className="relative">
                    {/* Main Image Display */}
                    <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={getImageUrl(imageItem.images[currentImageIndex])}
                        alt={`${imageItem.title} - Image ${currentImageIndex + 1}`}
                        width={800}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      {imageItem.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {imageItem.images.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {imageItem.images.length > 1 && (
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {imageItem.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Image
                              src={getImageUrl(image)}
                              alt={`Thumbnail ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-80 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                      <p>No images available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {imageItem.title}
              </h1>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Tag className="w-3 h-3 mr-1" />
                  {imageItem.category.name}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {imageItem.description}
                </p>
              </div>

              {/* Category Info */}
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Category Details
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    {imageItem.category.image ? (
                      <Image
                        src={getCategoryImageUrl(imageItem.category.image)}
                        alt={imageItem.category.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Tag className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{imageItem.category.name}</p>
                    <p className="text-sm text-gray-600">Category ID: #{imageItem.category.id}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {formatDate(imageItem.category.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created At
                  </h4>
                  <p className="text-sm text-gray-700">
                    {formatDate(imageItem.created_at)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Updated At
                  </h4>
                  <p className="text-sm text-gray-700">
                    {formatDate(imageItem.updated_at)}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Item ID: <span className="font-semibold">#{imageItem.id}</span></span>
                  <span>Category ID: <span className="font-semibold">#{imageItem.imgcategory_id}</span></span>
                  <span>Total Images: <span className="font-semibold">{imageItem.images.length}</span></span>
                  <span>Uploaded By: 
                    <span className="ml-1 font-semibold">
                      {imageItem.uploaded_by ? `#${imageItem.uploaded_by}` : 'System'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              {/* <button
                onClick={() => setSelectedAction({select: "", item: null})}
                className="px-6 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default ViewDetails;