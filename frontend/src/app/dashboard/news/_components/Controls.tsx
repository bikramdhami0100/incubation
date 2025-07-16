"use client";
import React, { useState } from "react";
import { Search, Filter, Plus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewsModal from "./CreateNewsModal";
function Controls({
  // searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  categories: string[] | undefined;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchData,setSearchData]=useState("");
  const handlerSubmitData=(e: React.FormEvent)=>{
   e.preventDefault();
   setSearchTerm(searchData);
  }
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            {/* Search */}
            <form onSubmit={handlerSubmitData} className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                defaultValue={searchData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchData(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </form>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCategory(e.target.value)
                }
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-40"
              >
                {categories?.map((category: string) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="flex cursor-pointer items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl">
                <Plus className="w-5 h-5" />
                  <span>Add News</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create News</DialogTitle>
                  <DialogDescription>
                    <CreateNewsModal open={open} setOpen={setOpen} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
