"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Tag, ImageIcon, ChevronLeft, ChevronRight, Upload, Trash2, Save, Plus } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import { getCookie } from '@/app/fwucontext/CustomCookies';

// Define the GalleryItem type here instead of importing as a value
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

export interface EditFormData {
  title: string;
  description: string;
  imgcategory_id: number;
  images: string[];
  newImages: File[];
  imagesToDelete: string[];
}

const EditDetails = ({ 
  item, 
  categories = [],
  setSelectedAction,
  // onSave
  refetch
}: {
  item: GalleryItem; 
  categories?: Category[];
  selectedAction: {select: string, item: GalleryItem | null};
  setSelectedAction: React.Dispatch<React.SetStateAction<{select: string, item: GalleryItem | null}>>;
  refetch: () => void
  // onSave?: (formData: EditFormData) => Promise<void>;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setSaveLoading] = useState(false);
  const [formData, setFormData] = useState<EditFormData>({
    title: item?.title || '',
    description: item?.description || '',
    imgcategory_id: item?.imgcategory_id || 0,
    images: item?.images || [],
    newImages: [],
    imagesToDelete: []
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item?.title,
        description: item?.description,
        imgcategory_id: item?.imgcategory_id,
        images: item?.images || [],
        newImages: [],
        imagesToDelete: []
      });
      setCurrentImageIndex(0); // Reset index when item changes
    }
  }, [item]);

  // Create a memoized list of all image identifiers (filenames and blob URLs)
  const allImages = useMemo(() => {
    const existingImages = formData?.images?.filter(img => !formData.imagesToDelete.includes(img));
    const newImageUrls = formData?.newImages?.map(file => URL.createObjectURL(file));
    return [...existingImages, ...newImageUrls];
  }, [formData?.images, formData?.imagesToDelete, formData?.newImages]);



  // Effect to clean up blob URLs to prevent memory leaks
  useEffect(() => {
    // This effect's cleanup function will run when the component unmounts
    // or when the `allImages` array changes.
    return () => {
      allImages?.forEach(image => {
        if (image.startsWith('blob:')) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [allImages]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // *** THE FIX ***
  // This function correctly resolves the URL for both existing and new (blob) images.
  const getDisplayUrl = (imageIdentifier: string): string => {
    if (imageIdentifier && imageIdentifier.startsWith('blob:')) {
      return imageIdentifier; // It's a new image, return the blob URL directly.
    }
    // It's an existing image, construct the full server URL.
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${imageIdentifier}`;
  };

  const getCategoryImageUrl = (imageName: string): string => {
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/gallery/${imageName}`;
  };

  const getCurrentImageType = (index: number) => {
    const existingCount = formData.images.filter(img => !formData.imagesToDelete.includes(img)).length;
    return index < existingCount ? 'existing' : 'new';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        newImages: [...prev.newImages, ...files]
      }));
    }
  };

  const handleDeleteImage = (indexToDelete: number) => {
    const imageIdentifier = allImages[indexToDelete];
    const imageType = getCurrentImageType(indexToDelete);

    if (imageType === 'existing') {
      setFormData(prev => ({
        ...prev,
        imagesToDelete: [...prev.imagesToDelete, imageIdentifier]
      }));
    } else { // 'new'
      const newImageIndex = indexToDelete - (formData.images.length - formData.imagesToDelete.length);
      setFormData(prev => ({
        ...prev,
        newImages: prev.newImages.filter((_, i) => i !== newImageIndex)
      }));
    }

    // Adjust current image index to a valid position
    if (currentImageIndex >= allImages.length - 1) {
      setCurrentImageIndex(Math.max(0, allImages.length - 2));
    }
  };

const handleSave = async () => {
  setSaveLoading(true);

  // 1. Create a FormData object. This is essential for file uploads.
  const apiFormData = new FormData();

  // 2. Append all the data fields.
  apiFormData.append('title', formData.title);
  apiFormData.append('description', formData.description);
  apiFormData.append('imgcategory_id', formData.imgcategory_id.toString());
  
  // 3. IMPORTANT: Spoof the PUT method for Laravel.
  apiFormData.append('_method', 'PUT');

  // 4. Append the array of new image files.
  // The '[]' is important for PHP to receive it as an array.
  formData.newImages.forEach((file) => {
    apiFormData.append('newImages[]', file);
  });

  // 5. Append the array of image filenames to delete.
  formData.imagesToDelete.forEach((imageName) => {
    apiFormData.append('imagesToDelete[]', imageName);
  });
  
  try {
    // 6. Use axios.post to the update URL. Laravel will see the _method field
    //    and route it to your controller's update method.
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/gallery/${item.id}`, 
      apiFormData, // Send the FormData object
      {
        headers: {
          // 'Content-Type' is set automatically by the browser when using FormData
          Accept: "application/json",
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
    );

    // console.log("Success response:", data);
    toast.success(data.message || "Image updated successfully!");
     refetch();
    // You'll likely want to either close the modal and refresh the data
    // or update the local state with the new data from the response.
    // For now, let's close it.
    setSelectedAction({ select: "", item: null });

  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      // @ts-expect-error: error.response is likely from Axios
      console.error('Error saving:', error.response?.data || error);
      // @ts-expect-error: error.response is likely from Axios
      toast.error(error.response?.data?.message || "An error occurred while saving.");
    } else {
      console.error('Error saving:', error);
      toast.error("An error occurred while saving.");
    }
  } finally {
    setSelectedAction({ select: "", item: null });
    setSaveLoading(false);
  }
};

  const selectedCategory = categories.find(cat => cat.id === formData.imgcategory_id);

  return (
    <div key={item.id} className="p-8">
      <div className="fixed backdrop-blur-3xl bg-white overflow-x-hidden inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          style={{ scrollbarWidth: "none" }} 
          className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Edit Image Gallery</h2>
            <button
              onClick={() => setSelectedAction({select: "", item: null})}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Images</h3>
                <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Images
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {allImages.length > 0 ? (
                <div className="relative">
                  <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Image
                      // Use the new getDisplayUrl function
                      src={getDisplayUrl(allImages[currentImageIndex])}
                      alt={`${item.title} - Image ${currentImageIndex + 1}`}
                      width={800}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                    
                    <button onClick={() => handleDeleteImage(currentImageIndex)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    {allImages.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {allImages.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {allImages.map((image, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <button
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Image
                              // Use the new getDisplayUrl function here too
                              src={getDisplayUrl(image)}
                              alt={`Thumbnail ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </button>
                          {getCurrentImageType(index) === 'new' && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                              New
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                 <div className="h-80 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                   <div className="text-center text-gray-400">
                     <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                     <p>No images available</p>
                     <label className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                       <Upload className="w-4 h-4 mr-2" />
                       Upload Images
                       <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                     </label>
                   </div>
                 </div>
              )}
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Enter title..."/>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select value={formData.imgcategory_id} onChange={(e) => setFormData(prev => ({...prev, imgcategory_id: parseInt(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option value={0}>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              {selectedCategory && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      {selectedCategory.image ? (
                        <Image src={getCategoryImageUrl(selectedCategory.image)} alt={selectedCategory.name} width={48} height={48} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Tag className="w-5 h-5" /></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedCategory.name}</p>
                      <p className="text-sm text-gray-600">{selectedCategory.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Enter description..."/>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2" />Created At</h4>
                <p className="text-sm text-gray-700">{formatDate(item.created_at)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center"><Calendar className="w-4 h-4 mr-2" />Updated At</h4>
                <p className="text-sm text-gray-700">{formatDate(item.updated_at)}</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Item ID: <span className="font-semibold">#{item.id}</span></span>
                <span>Images: <span className="font-semibold">{allImages.length}</span></span>
                <span>To Delete: <span className="font-semibold">{formData.imagesToDelete.length}</span></span>
                <span>Uploaded By: <span className="ml-1 font-semibold">{item.uploaded_by ? `#${item.uploaded_by}` : 'System'}</span></span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-between p-6 border-t border-gray-200">
            <button onClick={() => setSelectedAction({select: "", item: null})} className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Saving...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;