"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Tag,
  Grid,
  List,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import PaginationControls from "@/app/dashboard/gallery-images/_components/PaginationProps";

import Link from "next/link";

// TypeScript interfaces based on your actual API data structure
interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  description: string;
}

interface GalleryItem {
  id: number;
  created_at: string;
  updated_at: string;
  imgcategory_id: number;
  title: string;
  description: string;
  images: string[];
  uploaded_by: string | null;
  category: Category;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface GalleryData {
  current_page: number;
  data: GalleryItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

type ViewMode = "grid" | "list";

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchData, setSearchData] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log(currentGalleryIndex);
  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery`,
        { params: { search: searchTerm } }
      );
      setGalleryData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch gallery data");
      console.error("Error fetching gallery data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch gallery data from API
  useEffect(() => {
    fetchGalleryData();
    if (currentPage) {
      const fetchGalleryData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/gallery?page=${currentPage}`,
            { params: { search: searchTerm } }
          );
          setGalleryData(response.data);
          setError(null);
        } catch (err) {
          setError("Failed to fetch gallery data");
          console.error("Error fetching gallery data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchGalleryData();
    }
  }, [searchTerm, currentPage]);

  // Get unique categories from data
  const categories = useMemo(() => {
    if (!galleryData) return [];

    const uniqueCategories = galleryData.data.reduce(
      (acc: Category[], item) => {
        if (!acc.find((cat) => cat.id === item.category.id)) {
          acc.push(item.category);
        }
        return acc;
      },
      []
    );
    return [
      {
        id: 0,
        name: "All Categories",
        description: "",
        created_at: "",
        updated_at: "",
        image: "",
      },
      ...uniqueCategories,
    ];
  }, [galleryData]);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    if (!galleryData) return [];

    return galleryData.data.filter((item) => {
      // const matchesCategory =
      //   selectedCategory === "all" || item.category.id === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, galleryData]);

  // Create flattened image array for lightbox
  const allImages = useMemo(() => {
    const images: Array<{
      src: string;
      title: string;
      description: string;
      category: string;
      galleryIndex: number;
      imageIndex: number;
    }> = [];
    filteredGallery.forEach((item, galleryIndex) => {
      item.images.forEach((image, imageIndex) => {
        images.push({
          src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${image}`, // Assuming images are stored in Laravel storage
          title: item.title,
          description: item.description,
          category: item.category.name,
          galleryIndex,
          imageIndex,
        });
      });
    });
    return images;
  }, [filteredGallery]);

  const openLightbox = (galleryIndex: number, imageIndex: number) => {
    const flatIndex = allImages.findIndex(
      (img) =>
        img.galleryIndex === galleryIndex && img.imageIndex === imageIndex
    );
    setCurrentImageIndex(flatIndex);
    setCurrentGalleryIndex(galleryIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Gallery
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Photo Gallery
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover beautiful moments captured through our lens
            </p>
            <div className="flex justify-center items-center space-x-6 text-blue-200">
              <div className="flex items-center space-x-2">
                <Tag size={20} />
                <span>{categories.length - 1} Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Grid size={20} />
                <span>{galleryData?.total} Collections</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
         
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // setSearchTerm(searchData);
                }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                  className="block w-64 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  onClick={() => setSearchTerm(searchData)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Search className="text-gray-400" size={20} />
                </button>
              </form>

              <Link className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" href={`/fwu/gallery-all`}>View All Collections</Link>
            </div>
          </div>
        </div>

        {!galleryData ||
          (galleryData?.data?.length === 0 && (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-6">📷</div>
                <h2 className="text-3xl font-bold text-gray-700 mb-4">
                  No Gallery Items
                </h2>
                <p className="text-gray-600">No gallery collections found.</p>
              </div>
            </div>
          ))}

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredGallery.length}
            </span>{" "}
            of <span className="font-semibold">{galleryData?.total}</span>{" "}
            collections
          </p>
        </div>

        {/* Gallery Grid/List */}
        {filteredGallery.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredGallery.map((item, galleryIndex) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.6s ease-out ${
                    galleryIndex * 150
                  }ms forwards`,
                }}
              >
                {/* Image Grid */}
                <div
                  className={`relative ${
                    viewMode === "list" ? "md:w-1/3" : ""
                  }`}
                >
                  {item.images.length === 1 ? (
                    <div
                      className="relative h-64 cursor-pointer overflow-hidden"
                      onClick={() => openLightbox(galleryIndex, 0)}
                    >
                      <Image
                        quality={100}
                        height={300}
                        width={400}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/storage/gallery/${
                          item.images[item.images.length - 1]
                        }`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1 h-64">
                      {item.images.slice(0, 4).map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative cursor-pointer overflow-hidden"
                          onClick={() => openLightbox(galleryIndex, imageIndex)}
                        >
                          <Image
                            quality={100}
                            height={150}
                            width={200}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${image}`}
                            alt={`${item.title} - Image ${imageIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {imageIndex === 3 && item.images.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                +{item.images.length - 4}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {item.category.name}
                    </span>
                  </div>

                  <h3 className="text-xl  font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(item.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Grid size={16} />
                        <span>{item.images.length} photos</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        openLightbox(galleryIndex, 0);
                      }}
                      className="text-blue-600 cup hover:text-blue-800 font-medium transition-colors"
                    >
                      View Gallery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="text-6xl text-gray-300 mb-6">
              <Search className="mx-auto" size={64} />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No Collections Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              We couldn&#39;t find any collections matching your search
              criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div className="fixed inset-0 z-50  backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl max-h-[95vh]">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 text-black bg-white cursor-pointer hover:bg-white/70 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative h-[75vh] bg-black/60 rounded-xl overflow-hidden backdrop-blur-sm">
              <Image
                height={600}
                width={800}
                quality={100}
                onClick={() => {
                  // goToNext();
                  //  show Image in window full screen
                  window.open(allImages[currentImageIndex]?.src, "_blank");
                }}
                src={allImages[currentImageIndex]?.src}
                alt={allImages[currentImageIndex]?.title}
                className="w-full h-full  aspect-video object-cover"
              />
            </div>

            {/* Image info */}
            <div className="text-white text-center mt-6 bg-black/60 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-2">
                {allImages[currentImageIndex]?.title}
              </h3>
              <p className="text-gray-200 mb-2 line-clamp-1">
                {allImages[currentImageIndex]?.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                <span className="bg-blue-600/50 px-3 py-1 rounded-full">
                  {allImages[currentImageIndex]?.category}
                </span>
                <span>
                  {currentImageIndex + 1} of {allImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {galleryData && galleryData?.last_page > 1 && (
        <PaginationControls
          currentPage={currentPage}
          lastPage={galleryData?.last_page}
          onPageChange={setCurrentPage}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
