"use client"
import { ContactItem } from "../page";
import {
  User,
  MessageSquare,
  Clock,
  Calendar,
  Eye,
  X,
  Trash,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import React, { useState } from "react";
import { getCookie } from "@/app/fwucontext/CustomCookies";
import { toast } from "sonner";
interface ContactTableProps {
  contacts: ContactItem[];
  refetch: () => void
}

const ContactTable: React.FC<ContactTableProps> = ({ contacts ,refetch}) => {
 const [confirmDelete, setConfirmDelete] = useState(false);

  const formatDate = (dateString: string) => {
    
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateMessage = (message: string, maxLength: number = 80) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };
  const handlerDeleteItem = async(id: number) => {
    try {
          const response=(await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })).data;
    console.log(response);
    if(response){
      toast.success(response.message);
      refetch();
    }
    
    } catch (error) {
    //   console.log(error);
      toast.error(error instanceof Error ? error.message : String(error));
    }

  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          Contact Messages
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Manage and respond to user inquiries
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Contact Info
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No contacts found</p>
                  <p className="text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {truncateMessage(contact.message)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {formatDate(contact.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {}}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                Contact Details
                                <div className="ml-auto">
                                  <AlertDialogAction className="px-4 py-2 bg-blue-600 hover:bg-blue-700">
                                    <X className="w-4 h-4" />
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-left space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                      Name
                                    </label>
                                    <div className="p-3 bg-gray-50 rounded-lg border">
                                      <span className="text-gray-900 font-medium">
                                        {contact.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700">
                                    Message
                                  </label>
                                  <textarea
                                    value={contact.message}
                                    readOnly
                                    className="w-full p-4 bg-gray-50 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                    rows={6}
                                    style={{ minHeight: "120px" }}
                                  />
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex gap-2">
                              {/* <AlertDialogCancel className="px-4 py-2">Close</AlertDialogCancel> */}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        {/* </AlertDialog> */}
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                              <Trash className="w-4 h-4" />
                            </button>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="max-w-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-3 text-xl">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                Contact Details
                               
                              </AlertDialogTitle>

                              <AlertDialogDescription className="text-left space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                      Name
                                    </label>
                                    <div className="p-3 bg-gray-50 rounded-lg border">
                                      <span className="text-gray-900 font-medium">
                                        {contact.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700">
                                    Message
                                  </label>
                                  <textarea
                                    value={contact.message}
                                    readOnly
                                    className="w-full p-4 bg-gray-50 rounded-lg border resize-none focus:outline-none text-gray-900"
                                    rows={6}
                                    style={{ minHeight: "120px" }}
                                  />
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex gap-2">
                                 <div className="ml-auto flex gap-2">
                                  <AlertDialogAction
                                    onClick={() => setConfirmDelete(true)}
                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1"
                                  >
                                    <Trash className="w-4 h-4" />
                                    Delete
                                  </AlertDialogAction>
                                  <AlertDialogAction className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
                                    <X className="w-4 h-4" />
                                  </AlertDialogAction>
                                </div>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Confirmation Dialog for Deletion */}
                        <AlertDialog
                          open={confirmDelete}
                          onOpenChange={setConfirmDelete}
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the contact from your
                                database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => setConfirmDelete(false)}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => {
                                  handlerDeleteItem(contact.id); // you handle deletion logic here
                                  setConfirmDelete(false);
                                }}
                              >
                                Confirm Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
