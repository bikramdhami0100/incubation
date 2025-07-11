"use client";
import React, { useState } from "react";
import {
  X,
  Trash2,
  AlertTriangle,
  Calendar,
  User,
  Paperclip,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { NoticeItem } from "../notice_type/notice";

interface DeleteNoticeProps {
  item: NoticeItem;
  isDeleteModelOpen: { select: string; item: NoticeItem | null };
  setIsDeleteModelOpen: React.Dispatch<
    React.SetStateAction<{ select: string; item: NoticeItem | null }>
  >;
}

const DeleteNotice: React.FC<DeleteNoticeProps> = ({
  item,
  isDeleteModelOpen,
  setIsDeleteModelOpen,
}: DeleteNoticeProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const queryClient = useQueryClient();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        // Example: send a DELETE request
        const response = (
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/notice/${item.id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
              params: {
                file: item?.file,
                id: item?.id,
              },
              method: "DELETE",
            }
          )
        ).data;
        console.log(response, "this is response");

        // ✅ Refetch the query after successful delete
        toast.success("Notice deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["notices"] });
      } catch (err) {
        toast.error("Delete failed " + err);
      } finally {
        setIsDeleting(false);
        setIsDeleteModelOpen({ select: "", item: null });
        setConfirmText("");
      }
    }
  };

  const handleClose = () => {
    setIsDeleteModelOpen({ select: "", item: null });
    setConfirmText("");
  };

  const isConfirmValid = confirmText.toLowerCase() === "delete";

  //   const fileUrl = item.file ? `${process.env.NEXT_PUBLIC_FILE_NOTICE_BASE_URL}/${item.file}` : null;

  return (
    <div className="p-8">
      {isDeleteModelOpen.select && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Delete Notice
                  </h2>
                  <p className="text-sm text-red-600 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                disabled={isDeleting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Warning Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">
                      Warning
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      You are about to permanently delete this notice. This
                      action cannot be undone and will remove all associated
                      data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Notice Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notice to be deleted:
                </h3>

                <div className="space-y-4">
                  {/* Title and File */}
                  <div className="flex space-x-4">
                    {item?.file ? (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Paperclip className="w-8 h-8 text-gray-600" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Trash2 className="w-8 h-8 text-gray-600" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 truncate">
                        {item?.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          ID: #{item?.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description Preview */}
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item?.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Added by</p>
                        <p className="text-sm font-medium text-gray-900">
                          {item?.admin?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(item?.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Input */}
              <div className="space-y-3">
                <label
                  htmlFor="confirmDelete"
                  className="block text-sm font-semibold text-gray-700"
                >
                  To confirm deletion, type{" "}
                  <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">
                    DELETE
                  </span>{" "}
                  below:
                </label>
                <input
                  type="text"
                  id="confirmDelete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Type DELETE to confirm"
                  disabled={isDeleting}
                />
              </div>

              {/* Impact Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800">
                      What will be deleted:
                    </h4>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Notice content and metadata</li>
                      <li>• Associated file</li>
                      <li>• All related data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                Notice ID: #{item?.id}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="px-6 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!isConfirmValid || isDeleting}
                  className="px-6 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Notice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteNotice;
