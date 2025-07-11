"use client";

import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { getCookie } from "@/app/fwucontext/CustomCookies";

export default function CreateNewsModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    added_by: getCookie("adminId")??"1", // Replace with dynamic admin ID if needed
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCustomCategory, setShowCustomCategory] = useState<boolean>(false);
  const [customCategory, setCustomCategory] = useState<string>("");
  const queryClient = useQueryClient(); // ✅ Use the existing instance

  const categories = [
    "event",
    "announcement",
    "research",
    "startup",
    "seminar",
    "funding",
    "training",
    "achievement",
    "workshop",
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

  const handleCustomCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomCategory(value);
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate custom category if selected
    if (showCustomCategory && !customCategory.trim()) {
      alert("Please enter a custom category");
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (photo) {
      data.append("news_photo", photo);
    }

  
      const token =  getCookie("token");
      if (!token) {
        return alert("You are not logged in");
      }
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/news`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log(res, "this is response");
      } catch (err) {
        console.log(err);
        alert("Error creating news.");
      } finally {
        setLoading(false);
        setOpen(!open);
        await queryClient.invalidateQueries({ queryKey: ["news"] });
      }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter news title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          name="category"
          value={showCustomCategory ? "custom" : formData.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="custom"> Custom Category</option>
        </select>

        {showCustomCategory && (
          <div className="mt-2">
            <input
              type="text"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom category"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          name="news_photo"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter news description..."
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {loading ? (
            <div className="flex items-center gap-1">
              <Loader className=" animate-spin" /> Creating...
            </div>
          ) : (
            "Create News"
          )}
        </button>
      </div>
    </form>
  );
}
