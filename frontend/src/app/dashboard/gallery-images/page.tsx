"use client";

import React, { useState, useEffect } from "react";
import {
  Images,
  Tag,
  Eye,
  Pencil,
  Trash2,
  AlertTriangleIcon, // Now used in the ErrorDisplay component
  Package,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import UniversityDashboardHeader from "../_components/UniversityDashboardHeader";
import GalleryController from "./_components/Controls";
import PaginationControls from "./_components/PaginationProps";
import ViewDetails from "./_components/ViewDetails";
import EditDetails from "./_components/EditDetails ";
import { getCookie } from "@/app/fwucontext/CustomCookies";

// --- PLACEHOLDER: Mock Environment Variables ---
// In a real Next.js app, these would be in a .env.local file
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://127.0.0.1:8000/storage";

// --- Type Definitions ---
export interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  created_at: string;
  updated_at: string;
  imgcategory_id: number;
  title: string;
  description: string;
  images: string[];
  uploaded_by: null | number;
  category: Category;
}

interface GalleryDataType {
  current_page: number;
  data: GalleryItem[];
  total: number;
  per_page: number;
  last_page: number;
  path: string;
}

// --- Reusable Components ---
interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div
        className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

/**
 * A component to display when there is a data fetching error.
 */
const ErrorDisplay: React.FC<{ message?: string }> = ({
  message = "Something went wrong.",
}) => (
  <div className="text-center py-16 px-6 bg-red-50 rounded-lg">
    <AlertTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
    <h3 className="mt-2 text-lg font-semibold text-red-900">
      Failed to Load Data
    </h3>
    <p className="mt-1 text-sm text-red-700">
      {message} Please try again later.
    </p>
  </div>
);

// --- Main Gallery Component ---
const GalleryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAction, setSelectedAction] = useState<{
    select: string;
    item: GalleryItem | null;
  }>({ select: "", item: null });
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const {
    data: queryGallery,
    isLoading,
    isError,
    refetch,
  } = useQuery<GalleryDataType>({
    queryKey: ["galleryData", currentPage],
    queryFn: async () => {
      // Use the placeholder API_URL
      const res = await axios.get(`${API_URL}/gallery?page=${currentPage}`);
      return res.data;
    },
    // select: (data) => {
    // console.log(data)
    // },
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // keepPreviousData: true,
  });

  let totalcountImages = 0;
  queryGallery?.data.map((item) => {
    totalcountImages = totalcountImages + item.images.length;
  });

  console.log(selectedAction);

  const filteredImages = queryGallery?.data?.filter((item: GalleryItem) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(lowerCaseSearch) ||
      item.description.toLowerCase().includes(lowerCaseSearch) ||
      item.category.name.toLowerCase().includes(lowerCaseSearch);

    const matchesCategory =
      selectedCategory === "all" || item.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCategories = new Set(
    queryGallery?.data?.map((item) => item.category.id) || []
  ).size;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-600 font-medium">Loading...</p>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-64 text-red-600">
  //       <svg
  //         className="w-12 h-12 mb-2"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         viewBox="0 0 24 24"
  //       >
  //         <path
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.87L21 4.87C20.918 3.816 20.054 3 19 3H5c-1.054 0-1.918.816-1.994 1.87L3 20.13c.082 1.054.946 1.87 2 1.87z"
  //         />
  //       </svg>
  //       <p className="font-medium">Something went wrong. Please try again.</p>
  //     </div>
  //   );
  // }
 const handleDelete = async (item: GalleryItem) => {

  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${item.id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    refetch();
    setSelectedAction({ select: "", item: null });
  } catch (error) {
    console.error(error);
  }
 }
  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityDashboardHeader
        pageTitle="Image Gallery"
        pageSubtitle="Explore and manage images from events, achievements, and campus life."
        breadcrumb={["Home", "University", "Gallery"]}
        showStats={true}
      />
      {selectedAction.select == "view" && selectedAction.item && (
        <ViewDetails
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          item={selectedAction?.item}
        />
      )}
      {selectedAction.select == "edit" && selectedAction.item && (
        <EditDetails
          refetch={refetch}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          item={selectedAction?.item}
        />
      )}
     {selectedAction.select === "delete" && selectedAction.item && (
  <Dialog open={true}>
    <DialogContent className="max-w-md bg-white rounded-2xl p-6 shadow-xl border border-red-200">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-full">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M5.93 5.93a10.003 10.003 0 0112.14 0M3 12h.01M21 12h.01M5.93 18.07a10.003 10.003 0 0112.14 0"
              />
            </svg>
          </div>
          <DialogTitle className="text-xl text-red-600 font-semibold">
            Are you absolutely sure?
          </DialogTitle>
        </div>
        <DialogDescription className="text-sm text-gray-600 mt-2">
          This action <span className="font-semibold text-red-600">cannot be undone</span>.
          This will permanently delete <strong>{selectedAction.item?.title}</strong> and remove
          its data from our servers.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setSelectedAction({ select: "", item: null })}
          className="px-4 cursor-pointer py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (selectedAction.item) {
              handleDelete(selectedAction.item);
            }
          }}
          className="px-4 cursor-pointer py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white font-medium"
        >
          Delete
        </button>
      </div>
    </DialogContent>
  </Dialog>
)}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Images}
            title="Total Images"
            value={totalcountImages ?? 0}
            subtitle="In gallery"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Package}
            title="Total Categories"
            value={totalCategories}
            subtitle="Unique categories"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={Tag}
            title="Items Per Page"
            value={queryGallery?.per_page ?? 0}
            subtitle="Display limit"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={Eye}
            title="Current Page"
            value={`${queryGallery?.current_page ?? "..."} of ${
              queryGallery?.last_page ?? "..."
            }`}
            subtitle="Pagination"
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        <GalleryController
          refetch={refetch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {isLoading ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-5 animate-pulse border-b border-gray-200"
                >
                  {" "}
                  <div className="w-20 h-16 bg-gray-200 rounded-md"></div>{" "}
                  <div className="flex-1 space-y-3 py-1">
                    {" "}
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>{" "}
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>{" "}
                  </div>{" "}
                  <div className="h-6 w-28 bg-gray-200 rounded-full"></div>{" "}
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>{" "}
                  <div className="flex space-x-2">
                    {" "}
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
                  </div>{" "}
                </div>
              ))}
            </div>
          ) : isError ? (
            <ErrorDisplay message="Could not fetch gallery images from the server." />
          ) : filteredImages && filteredImages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Title & Description
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Date Added
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImages.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="p-4">
                        {item.images?.[0] && ( // Only render Image if there is an image source
                          <Image
                            height={100}
                            width={100}
                            src={`${IMAGE_BASE_URL}/gallery/${item.images[0]}`}
                            alt={item.title}
                            className="w-24 h-16 object-cover rounded-lg shadow-sm"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-sm">
                        <div className="font-bold">{item.title}</div>
                        <p className="font-normal text-gray-500 truncate">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded-full">
                          {item.category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedAction({ select: "view", item: item });
                            }}
                            className="p-2 rounded-full cursor-pointer text-blue-500 hover:bg-gray-100 hover:text-blue-600  transition-all"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAction({ select: "edit", item: item });
                            }}
                            className="p-2 rounded-full cursor-pointer text-green-500 hover:bg-gray-100 hover:text-green-600 transition-all"
                            title="Edit Item"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAction({
                                select: "delete",
                                item: item,
                              });
                            }}
                            className="p-2 rounded-full cursor-pointer text-red-500 hover:bg-gray-100 hover:text-red-600 transition-all"
                            title="Delete Item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                No Images Found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "The gallery is currently empty. Start by uploading a new image."}
              </p>
            </div>
          )}

          {queryGallery && queryGallery.last_page > 1 && (
            <PaginationControls
              currentPage={currentPage}
              lastPage={queryGallery.last_page}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default GalleryPage;
