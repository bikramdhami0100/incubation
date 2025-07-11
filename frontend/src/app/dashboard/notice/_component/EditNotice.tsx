import React, { useState, useEffect } from "react";
import { X, Save, Upload, FileText, Link, Calendar, User } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { NoticeItem } from "../notice_type/notice";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface EditNoticeProps {
  notice: NoticeItem;
  setIsEditModelOpen: React.Dispatch<
    React.SetStateAction<{ select: string; item: NoticeItem | null }>
  >;
}

const EditNotice: React.FC<EditNoticeProps> = ({
  notice,
  setIsEditModelOpen,
}: EditNoticeProps) => {
  // console.log(notice, "this is notice");
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: notice?.title,
    description: notice?.description,
    file:
      notice?.file instanceof File
        ? notice.file
        : (notice?.file as File | null | string),
    ended_at: notice?.ended_at,
    description_link: notice?.description_link,
  });
  const [filePreview, setFilePreview] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (notice) {
      setFormData({
        title: notice.title || "",
        description: notice.description || "",
        file: notice.file instanceof File ? notice.file : null,
        ended_at: notice.ended_at
          ? new Date(notice.ended_at).toISOString().split("T")[0]
          : "",
        description_link: notice.description_link || "",
      });
      setFilePreview(
        notice.file
          ? `${process.env.NEXT_PUBLIC_FILE_NOTICE_BASE_URL}/${notice.file}`
          : ""
      );
      setProfileImage(
        notice?.admin?.profile_image
          ? `${process.env.NEXT_PUBLIC_IMAGE_NEWS_BASE_URL}/${notice?.admin?.profile_image}`
          : ""
      );
    }
  }, [notice]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilePreview(file.name); // Display file name for preview
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleSave = async () => {
  setIsLoading(true);

  try {
    const token = localStorage.getItem("token");
    const noticeData = new FormData();

    if (formData.file instanceof File) {
      noticeData.append("file", formData.file);
    }
    noticeData.append("title", formData.title);
    noticeData.append("description", formData.description);
    noticeData.append("ended_at", formData.ended_at);
    noticeData.append("description_link", formData.description_link);
    noticeData.append("_method", "PUT"); // Laravel needs this for PUT with multipart

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/notice/${notice.id}`,
      noticeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await queryClient.invalidateQueries({ queryKey: ["notices"] });
    // coresponse.data;
    console.log(response)
    toast.success("Notice updated successfully");
  } catch (err) {
    console.error("Error updating notice:", err);
    toast.error("Failed to update notice");
  } finally {
    setIsLoading(false);
    setIsEditModelOpen({ select: "", item: null });
  }
};

  const handleClose = () => {
    setIsEditModelOpen({ select: "", item: null });
  };

  return (
    <div key={notice?.id} className="p-8">
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex notices-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex notices-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex notices-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Edit Notice</h2>
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
            {/* File Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Notice File (PDF)
              </label>
              <div className="flex flex-col space-y-4">
                {filePreview ? (
                  <div className="relative h-24 w-full bg-gray-100 rounded-lg border-2 border-gray-300 flex notices-center justify-center ">
                    {/* <p className="text-gray-700 text-sm truncate px-4">{filePreview.split('/').pop()}</p> */}
                    {/* <iframe
                      src={`${process.env.NEXT_PUBLIC_FILE_NOTICE_BASE_URL}/${notice?.file}`}
                      title="Preview"
                      className="w-full h-full backdrop-blur-4xl bg-black/75"
                    /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex notices-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <label className="bg-white h-10 items-center self-center px-4 py-2 rounded-lg cursor-pointer  transition-colors">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Change File
                        <input
                          type="file"
                          accept=".pdf" // Adjust accepted file types as needed
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex notices-center justify-center hover:border-blue-400 transition-colors">
                    <label className="cursor-pointer text-center">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload file
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
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
                Notice Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter notice title..."
                required
              />
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
                defaultValue={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                placeholder="Enter notice description..."
                required
              />
              <div className="text-right text-sm text-gray-500">
                {formData.description.length} characters
              </div>
            </div>

            {/* Ended At Date Input */}
            <div className="space-y-2">
              <label
                htmlFor="ended_at"
                className="block text-sm font-semibold text-gray-700"
              >
                End Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  id="ended_at"
                  name="ended_at"
                  defaultValue={formData.ended_at}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                />
              </div>
            </div>

            {/* Description Link Input */}
            <div className="space-y-2">
              <label
                htmlFor="description_link"
                className="block text-sm font-semibold text-gray-700"
              >
                Description Link (Optional)
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  id="description_link"
                  name="description_link"
                  defaultValue={formData.description_link}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., https://example.com/more-info"
                />
              </div>
            </div>

            {/* Author Info Display */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex notices-center">
                <User className="w-4 h-4 mr-2" />
                Author Information
              </h3>
              <div className="flex notices-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_NOTICE_BASE_URL}/${notice?.admin?.profile_image}`}
                      alt={notice?.admin?.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex notices-center justify-center text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notice?.admin?.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {notice?.admin?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex notices-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(notice?.updated_at).toLocaleDateString()}
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
                disabled={isLoading || !formData.title || !formData.description}
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex notices-center space-x-2"
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

export default EditNotice;
