"use client";
import { getCookie } from "@/app/fwucontext/CustomCookies";
import axios, { AxiosError } from "axios";
import {
  Loader,
  User,
  Mail,
  Shield,
  Calendar,
  Edit3,
  Key,
  UserPlus,
  Camera,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAdminContext } from "@/contexts/AdminContext";

// --- Type Definitions for robust type-safety ---

// Describes the structure of a single admin user
interface Admin {
  id: number;
  name: string;
  email: string;
  role: "superadmin" | "admin"|undefined|null|string;
  created_at: string; // ISO date string
  profile_image: string | null;
  email_verified: 0 | 1;
}

// Defines the shape of the API response that the context provides.
// interface AdminApiResponse {
//   admin: Admin[];
// }

// A generic success response from our API
interface SuccessResponse {
  message: string;
}


function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // CHANGE 1: Use `adminData` directly from the context. It holds the full API response.
  const {
    adminData,
    refetch,
    isLoading,
    isError,
  } = useAdminContext();

  const handleEditToggle = () => {
    // CHANGE 2: The guard now checks the nested property.
    const currentAdmin = adminData?.admin?.[0];
    if (currentAdmin) {
      setEditForm({ name: currentAdmin.name, email: currentAdmin.email });
      setIsEditing(!isEditing);
    }
  };

  const handleSaveProfile = async () => {
    const currentAdmin = adminData?.admin?.[0];
    if (!currentAdmin) return;
    try {
      const { data } = await axios.post<SuccessResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/profileData/${currentAdmin.id}`, // Use currentAdmin
        editForm,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      toast.success(data.message);
      refetch();
      setIsEditing(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update profile."
      );
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    const currentAdmin = adminData?.admin?.[0];
    if (!currentAdmin) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post<SuccessResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/changePassword/${currentAdmin.id}`, // Use currentAdmin
        passwordForm,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      toast.success(data.message);

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error)
    {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ?? "Failed to update password."
      );
      console.error("Error updating password:", error);
    }
  };

  const handlerChangeProfile = () => {
    const currentAdmin = adminData?.admin?.[0];
    if (!currentAdmin) return;
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("profile_image", file);
        try {
          const { data } = await axios.post<SuccessResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/profileImage/${currentAdmin.id}`, // Use currentAdmin
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("token")}`,
              },
            }
          );
          toast.success(data.message);
          refetch();
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(
            axiosError.response?.data?.message ?? "Failed to upload image."
          );
        }
      }
    };
    input.click();
  };

  const togglePasswordVisibility = (field: keyof typeof passwordForm) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword((prev) => !prev);
        break;
      case "newPassword":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
    }
  };

  // --- Helper Functions for Rendering ---

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleColor = (role: Admin['role'] | undefined): string => {
    switch (role) {
      case "superadmin": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "admin": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getProfileImage = (profileImage: string | null | undefined): string | null => {
    if (profileImage) {
      return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/admin/${profileImage}`;
    }
    return null;
  };
  
  const passwordFields: {
    label: string;
    field: keyof typeof passwordForm;
    show: boolean;
  }[] = [
    { label: "Current Password", field: "currentPassword", show: showCurrentPassword },
    { label: "New Password", field: "newPassword", show: showNewPassword },
    { label: "Confirm New Password", field: "confirmPassword", show: showConfirmPassword },
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h1 className="text-gray-700 text-2xl font-medium">Loading your profile...</h1>
        </div>
      </div>
    );
  }

  // CHANGE 3: Update the main error guard to check the nested property.
  if (isError || !adminData?.admin?.[0]) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center">
          <X className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h1 className="text-red-600 text-2xl font-medium">Error Loading Profile</h1>
          <p className="text-red-500 mt-2">Could not find admin data. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  // CHANGE 4: Create a clean constant for use in the JSX. This is safe because the check above passed.
  const currentAdmin = adminData.admin[0];
  const profileImageUrl = getProfileImage(currentAdmin.profile_image);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>

          <div className="relative px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                {profileImageUrl ? (
                  <Image
                    width={128}
                    height={128}
                    quality={100}
                    priority
                    src={profileImageUrl}
                    alt={currentAdmin.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
                <button
                  onClick={handlerChangeProfile}
                  className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
                  aria-label="Change profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-600 outline-none"
                    />
                  ) : (
                    <h2 className="text-3xl font-bold text-gray-900">{currentAdmin.name}</h2>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-4 py-2 rounded-full text-white text-sm font-medium ${getRoleColor(currentAdmin?.role)}`}>
                      <Shield className="w-4 h-4 inline mr-1" />
                      {currentAdmin.role.toUpperCase()}
                    </span>
                    {currentAdmin.email_verified === 0 && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Unverified</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveProfile} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button onClick={() => setIsEditing(false)} className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={handleEditToggle} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">Email Address</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="text-gray-900 font-medium bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none w-full"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium truncate">{currentAdmin.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-900 font-medium">{formatDate(currentAdmin.created_at)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex cursor-pointer items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors w-full text-left">
                        <Key className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Password</p>
                          <p className="text-gray-900 font-medium">Change Password</p>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and a new one to update your credentials.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="pt-4 space-y-4">
                        {passwordFields.map(({ label, field, show }) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <div className="relative">
                              <input
                                type={show ? "text" : "password"}
                                value={passwordForm[field]}
                                onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder={`Enter ${label.toLowerCase()}`}
                              />
                              <button type="button" onClick={() => togglePasswordVisibility(field)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-3 justify-end pt-4">
                          <DialogClose asChild>
                            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors">
                              <X className="w-4 h-4" /> Cancel
                            </button>
                          </DialogClose>
                          <button onClick={handlePasswordUpdate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                            <Check className="w-4 h-4" /> Update Password
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <button className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors w-full text-left">
                    <UserPlus className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Add New Admin</p>
                      <p className="text-gray-900 font-medium">Invite Administrator</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;