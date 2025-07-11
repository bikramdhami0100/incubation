"use client";

import { useState } from "react";
import { FileText, Upload, X, Tag, AlignLeft, Calendar, Link } from "lucide-react";
import { NoticeItem } from "../notice_type/notice";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "@/app/fwucontext/CustomCookies";

interface NoticePropes {
  setIsEditModelOpen: React.Dispatch<
    React.SetStateAction<{ select: string; item: NoticeItem | null }>
  >;
}

export default function CreateNoticeModal({
  setIsEditModelOpen,
}: NoticePropes) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    description_link: "",
    ended_at: "",
    added_by: getCookie('adminId')??"1",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCustomCategory, setShowCustomCategory] = useState<boolean>(false);
  const [customCategory, setCustomCategory] = useState<string>("");
  
  const queryClient = useQueryClient(); // ✅ Use the existing instance
  
  const categories: string[] = [
    "proposal",
    "mentorship",
    "workshop",
    "funding",
    "facility",
    "program",
    "application",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    if (name === "category") {
      if (value === "custom") {
        setShowCustomCategory(true);
        setFormData((prev) => ({ ...prev, [name]: "" }));
      } else {
        setShowCustomCategory(false);
        setCustomCategory("");
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCategory(value);
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    console.log(file);
    //    console.log(formData, 'this is form data')
    // Simulate API call
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        const fileData = new FormData();
        if (file instanceof File) {
          fileData.append("file", file);
        }
        fileData.append("title", formData.title);
        fileData.append("description", formData.description);
        fileData.append("category", formData.category);
        fileData.append("ended_at", formData.ended_at);
        fileData.append("added_by", formData.added_by);
        
        // Only append description_link if it's not empty
        if (formData.description_link.trim()) {
          fileData.append("description_link", formData.description_link);
        }
        
        console.log(fileData, "filedata");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/notice`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        //   console.log('Notice created:', { ...formData, file })
        toast.success("Notice created successfully");
        setLoading(false);
        await queryClient.invalidateQueries({ queryKey: ["notices"] });
        console.log(response, "this is response");
        //   setIsEditModelOpen({ select: "", item: null })
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error("Failed to create notice");
        //   alert('Error creating notice.');
      } finally {
        setLoading(false);
        setIsEditModelOpen({ select: "", item: null });
      }
    }
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="w-full mx-auto">
        {/* form section */}
        <div className="bg-white w-full max-h-[80vh] overflow-y-scroll overflow-x-hidden">
          <div className="space-y-1">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter notice title"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                Category *
              </label>
              <select
                name="category"
                value={showCustomCategory ? "custom" : formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
                <option value="custom">Custom Category</option>
              </select>
              
              {showCustomCategory && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter custom category name"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                End Date *
              </label>
              <input
                type="date"
                name="ended_at"
                value={formData.ended_at}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Upload className="w-4 h-4 mr-2" />
                Attachment (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
              </div>
              {file && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-700">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-auto text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <AlignLeft className="w-4 h-4 mr-2" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Enter detailed notice description..."
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Link className="w-4 h-4 mr-2" />
                Description Link (Optional)
              </label>
              <input
                type="url"
                name="description_link"
                value={formData.description_link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter additional description link (optional)"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2  pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsEditModelOpen({ select: "", item: null })}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {/* <Loader className="w-4 h-4  animate-spin" /> */}
                     Creating...
                  </div>
                ) : (
                  "Create Notice"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}