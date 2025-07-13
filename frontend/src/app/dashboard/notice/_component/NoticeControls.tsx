import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoticeItem } from "../notice_type/notice";
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  isEditModelOpen: { select: string; item: NoticeItem | null };
  setIsEditModelOpen: (open: { select: string; item: NoticeItem | null }) => void;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const NoticeControls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  setIsEditModelOpen,
  categories,
}) =>{
  const [Data,setData]=useState("");
  const handlerShowData = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(Data);
    // console.log(Data);
  }
   return(
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
    <div  className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <form onClick={handlerShowData} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notices..."
            // value={searchTerm}
            defaultValue={searchTerm}
            onChange={(e) => setData(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* <input type="button" value="Search" onClick={handlerShowData} className="hidden " /> */}
        </form>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="text-gray-400 w-5 h-5" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
         <Button onClick={() => setIsEditModelOpen({ select:"create", item: null })} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all">
          <Plus/> Add Notice
         </Button>
      </div>
    </div>
  </div>
);
}
export default NoticeControls;
