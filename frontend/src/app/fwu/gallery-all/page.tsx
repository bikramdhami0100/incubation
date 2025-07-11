"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

function GalleryAllImages() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [imageData, setImageData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data: allImages, isError, isLoading } = useQuery({
        queryKey: ["all-images", currentPage],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery?search=allSearch&page=${currentPage}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (allImages && allImages.length > 0) {
            setImageData(prev => [...prev, ...allImages]);
        } else {
            setHasMore(false); // No more data
        }
    }, [allImages]);

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            setCurrentPage(prev => prev + 1);
        }
    }, [inView, hasMore, isLoading]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage("");
    };


    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="bg-gray-800 aspect-square animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <div className="bg-gray-800 aspect-square">Error loading images</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {imageData?.map((image: string, index: number) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-gray-800 aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                            onClick={() => handleImageClick(image)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-20"></div>
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${image}`}
                                    width={100}
                                    height={100}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Loader or end-message */}
            {hasMore ? (
                <div ref={ref} className="text-center mt-8">
                    <p className="text-white">Loading more images...</p>
                </div>
            ) : (
                <div className="text-center mt-8 text-white">
                    <p>You&apos;ve reached the end of the gallery 🎉</p>
                </div>
            )}

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-gray-300 bg-opacity-90 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${selectedImage}`}
                            alt="Selected image"
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryAllImages;
