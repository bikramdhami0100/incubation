"use client";
import { Filter, Search } from "lucide-react";
import React from "react";
// Controls Component
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  applicantTypes: string[];
}
const Controls = ({ searchTerm, setSearchTerm, selectedType, setSelectedType, applicantTypes }:ControlsProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search applicants by name, email, or project title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {applicantTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="h-4 w-4" />
          Export
        </button> */}
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
            +Add
        </button> */}
      </div>
    </div>
  </div>
);


export default Controls;