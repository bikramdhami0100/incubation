import React from "react";
import { Search, Filter } from "lucide-react";

import GalleryForm from "./GalleryForm";
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  refetch: () => void;
}


const GalleryController = ({
  searchTerm,
  refetch,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,

}:ControlsProps) => {
  //   const handleUploadSuccess = (formData: any) => {
  //   console.log("Upload was successful! Refreshing data...");
  //   // console.log()
  //   // Example: router.refresh() in Next.js App Router
  //   // or refetch() from a data fetching library like React Query.
  // };
 const incubationCenterCategories = [
  { id: 1, name: 'Demo Day & Pitch Events' },
  { id: 2, name: 'Startup Teams & Founders' },
  { id: 3, name: 'Workshops & Seminars' },
  { id: 4, name: 'Mentorship Sessions' },
  { id: 5, name: 'Prototypes & Products' },
  { id: 6, name: 'Networking Events' },
  { id: 7, name: 'Our Workspace & Facilities' },
  { id: 8, name: 'Success Stories & Alumni' },
  { id: 9, name: 'Community & Culture' },
];
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search images by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
  
        {/* Category Filter */}
        <div className="lg:w-48">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {incubationCenterCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Add Image Button */}
        <div>
          
              <GalleryForm refetch={refetch} categories={incubationCenterCategories}   />
        </div>
      </div>
    </div>
  );
} 

export default GalleryController;
