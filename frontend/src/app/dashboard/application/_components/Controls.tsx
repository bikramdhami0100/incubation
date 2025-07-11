import React from "react";
import { Search } from "lucide-react";

import ApplicationForm from "./ApplicationForm";
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetch: () => void;
}


const ApplicationController = ({
  searchTerm,
  refetch,
  setSearchTerm,
}:ControlsProps) => {
    const handleUploadSuccess = () => {
    console.log("Upload was successful! Refreshing data...");
    refetch();
  };

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
  
   
        {/* Add Image Button */}
        <div>
              <ApplicationForm refetch={refetch}  onSuccess={handleUploadSuccess}  />
        </div>
      </div>
    </div>
  );
} 

export default ApplicationController;
