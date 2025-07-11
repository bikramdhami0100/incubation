import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Upload,
  Tag,
  FileText,
  Image as ImageIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { getCookie } from "@/app/fwucontext/CustomCookies";

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
  news_photo?: File | string | null;
  category: string;
  added_by: number;
  created_at: string;
  updated_at: string;
  admin: Admin;
}

interface EditNewsProps {
  item: NewsItem;
  path: string;
  setIsEditModelOpen: React.Dispatch<
    React.SetStateAction<{ select: boolean; item: NewsItem | null }>
  >;
}

const EditNews: React.FC<EditNewsProps> = ({
  item,
  setIsEditModelOpen,
}: EditNewsProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    news_photo: null as File | null|string,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState<boolean>(false);
  const [customCategory, setCustomCategory] = useState<string>("");
  const queryClient = useQueryClient(); // ✅ Use the existing instance

  // Categories list - you can modify this based on your needs
  const categories: string[] = [
    "event",
    "announcement",
    "research",
    "startup",
    "seminar",
    "funding",
    "achievement",
    "notice",
    "workshop",
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        news_photo: item.news_photo instanceof File ? item.news_photo : null,
      });

      // Check if the current category is a custom one (not in predefined list)
      const isCustom = item.category && !categories.includes(item.category);
      if (isCustom) {
        setShowCustomCategory(true);
        setCustomCategory(item.category);
      }

      setImagePreview(
        item.news_photo
          ? `${process.env.NEXT_PUBLIC_IMAGE_NEWS_BASE_URL}/${item.news_photo}`
          : ""
      );
      setProfileImage(
        item?.admin?.profile_image
          ? `${process.env.NEXT_PUBLIC_IMAGE_NEWS_BASE_URL}/${item?.admin?.profile_image}`
          : ""
      );
    }
  }, [item]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      if (value === "custom") {
        setShowCustomCategory(true);
        setFormData((prev) => ({
          ...prev,
          [name]: customCategory || "",
        }));
      } else {
        setShowCustomCategory(false);
        setCustomCategory("");
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCustomCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomCategory(value);
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          news_photo: file, // In real implementation, you'd upload the file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Validate custom category if selected
    if (showCustomCategory && !customCategory.trim()) {
      toast.error("Please enter a custom category");
      return;
    }

    setIsLoading(true);
   
      try {
        const token= getCookie('token');
        const imageData = new FormData();

        if (formData.news_photo instanceof File) {
          imageData.append("news_photo", formData.news_photo);
        }else {
          imageData.append("news_photo", item.news_photo ?? "");
        }

        imageData.append("title", formData.title);
        imageData.append("description", formData.description);
        imageData.append("category", formData.category);
        imageData.append("_method", "PUT");

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/news/${item.id}`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Create a new QueryClient instance and invalidate the cache
        await queryClient.invalidateQueries({ queryKey: ["news"] });
        toast.success("News updated successfully");
      } catch (err) {
        console.error("Error details:", err);
        toast.error("Failed to update news");
      } finally {
        setIsLoading(false);
        setIsEditModelOpen({ select: false, item: null });
      }
    
  };

  const handleClose = () => {
    setIsEditModelOpen({ select: false, item: null });
  };

  console.log(imagePreview, "this is image preview");
  console.log(item?.admin.profile_image);

  return (
    <div key={item?.id} className="p-8">
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div
          style={{ scrollbarWidth: "none" }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Edit News Article
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                News Image
              </label>
              <div className="flex flex-col space-y-4">
                {imagePreview ? (
                  <div className="relative h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt={imagePreview}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <label className="bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors">
                    <label className="cursor-pointer text-center">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                News Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter news title..."
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700"
              >
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="category"
                  name="category"
                  value={showCustomCategory ? "custom" : formData.category}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="custom">Custom Category</option>
                </select>
              </div>

              {showCustomCategory && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter custom category"
                  />
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                placeholder="Enter news description..."
                required
              />
              <div className="text-right text-sm text-gray-500">
                {formData.description.length} characters
              </div>
            </div>

            {/* Author Info Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Author Information
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={item?.admin?.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item?.admin?.name}
                  </p>
                  <p className="text-xs text-gray-600">{item?.admin?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(item?.updated_at).toLocaleDateString()}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={
                  isLoading ||
                  !formData.title ||
                  !formData.description ||
                  !formData.category
                }
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
