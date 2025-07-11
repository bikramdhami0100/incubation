"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Pencil,
  Trash2,
  AlertTriangleIcon,
  Search,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UniversityDashboardHeader from "../_components/UniversityDashboardHeader";
import ApplicationController from "./_components/Controls";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import ApplicationEditDialog from "./_components/EditDetails ";
import ApplicationDeleteDialog from "./_components/ApplicationDeleteDialog";
import PaginationControls from "./_components/PaginationProps";
// import PaginationControls from './_components/PaginationProps'
// import EditDetails from './_components/EditDetails'

// --- PLACEHOLDER: Mock Environment Variables ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// --- Type Definitions ---
export interface ApplicationItem {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  status?: "pending" | "approved" | "rejected" | "under_review";
  applicant_name?: string;
  application_type?: string;
  end_date?: string;
}

interface ApplicationDataType {
  current_page: number;
  data: ApplicationItem[];
  total: number;
  per_page: number;
  last_page: number;
  path: string;
  first_page_url: string;
  from: number;
  to: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
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

// Status Badge Component


// --- Main Application Component ---
const ApplicationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedAction, setSelectedAction] = useState<{
    select: string;
    item: ApplicationItem | null;
  }>({ select: "", item: null });
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const {
    data: queryApplication,
    isLoading,
    isError,
    refetch,
  } = useQuery<ApplicationDataType>({
    queryKey: ["applicationData", currentPage],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/application?page=${currentPage}`);
      return res.data;
    },
  });

 
  const filteredApplications = queryApplication?.data?.filter(
    (item: ApplicationItem) => {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(lowerCaseSearch) ||
        item.description.toLowerCase().includes(lowerCaseSearch) ||
        (item.applicant_name &&
          item.applicant_name.toLowerCase().includes(lowerCaseSearch));

      return matchesSearch;
    }
  );  // Calculate statistics
  const totalApplications = queryApplication?.total || 0;
  const pendingApplications =
    queryApplication?.data?.filter(
      (item) => item.status === "pending" || !item.status
    ).length || 0;
  const approvedApplications =
    queryApplication?.data?.filter((item) => item.status === "approved")
      .length || 0;
  const rejectedApplications =
    queryApplication?.data?.filter((item) => item.status === "rejected")
      .length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-600 font-medium">
          Loading applications...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600">
        <svg
          className="w-12 h-12 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.87L21 4.87C20.918 3.816 20.054 3 19 3H5c-1.054 0-1.918.816-1.994 1.87L3 20.13c.082 1.054.946 1.87 2 1.87z"
          />
        </svg>
        <p className="font-medium">
          Failed to load applications. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityDashboardHeader
        pageTitle="Application Management"
        pageSubtitle="Manage and review student applications, submissions, and requests."
        breadcrumb={["Home", "University", "Applications"]}
        showStats={true}
      />

      {selectedAction?.select === "edit" && selectedAction.item && (
        <ApplicationEditDialog
          item={{
            ...selectedAction.item,
            status: selectedAction.item.status ?? "",
            end_date: selectedAction.item.end_date ?? "",
          }}
          onClose={() => setSelectedAction({ select: "", item: null })}
          refetch={refetch}
        />
      )}

      {selectedAction?.select === "delete" && selectedAction.item && (
        <ApplicationDeleteDialog
          item={{
            ...selectedAction.item,
            status: selectedAction.item.status ?? "",
            end_date: selectedAction.item.end_date ?? "",
          }}
          onClose={() => setSelectedAction({ select: "", item: null })}
          refetch={refetch}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Applications"
            value={totalApplications}
            subtitle="All submissions"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Clock}
            title="Pending Review"
            value={pendingApplications}
            subtitle="Awaiting action"
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          />
          <StatsCard
            icon={CheckCircle}
            title="Approved"
            value={approvedApplications}
            subtitle="Accepted applications"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={XCircle}
            title="Rejected"
            value={rejectedApplications}
            subtitle="Declined applications"
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        <ApplicationController
          refetch={refetch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {isLoading ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-5 animate-pulse border-b border-gray-200"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <ErrorDisplay message="Could not fetch applications from the server." />
          ) : filteredApplications && filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Title & Description
                    </th>
                    {/* <th scope="col" className="px-6 py-4 font-semibold">Status</th> */}
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Last Updated
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
                  {filteredApplications.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-sm">
                        <div className="font-bold">{item.title}</div>
                        <p
                          className="font-normal text-gray-500 truncate"
                          title={item.description}
                        >
                          {item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(item.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              {/* <Button className="bg-blue-600 text-white hover:bg-blue-700"> */}
                              <Eye className="h-4 w-4 cursor-pointer  text-blue-600" />
                              {/* </Button> */}
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-lg font-semibold text-gray-800">
                                  Application Details
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-500">
                                  Below are the details of your submitted
                                  application.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4 pt-2 text-sm">
                                <div>
                                  <Label>Title</Label>
                                  <p className="text-gray-700">{item.title}</p>
                                </div>

                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    value={item.description}
                                    readOnly
                                    className="resize-none text-sm"
                                    rows={3}
                                  />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                  <div className="flex-1">
                                    <Label>Status</Label>
                                    <p className="text-gray-700">
                                      {item.status}
                                    </p>
                                  </div>
                                  <div className="flex-1">
                                    <Label>End Date</Label>
                                    <p className="text-gray-700">
                                      {item.end_date
                                        ? new Date(
                                            item.end_date
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                          })
                                        : "Not specified"}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-xs text-gray-500 pt-4 border-t">
                                  <p>
                                    <strong>Created:</strong>{" "}
                                    {new Date(
                                      item?.created_at
                                    ).toLocaleString()}
                                  </p>
                                  <p>
                                    <strong>Updated:</strong>{" "}
                                    {new Date(
                                      item?.updated_at
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <button
                            onClick={() => {
                              setSelectedAction({ select: "edit", item: item });
                            }}
                            className="p-2 rounded-full cursor-pointer text-green-500 hover:bg-gray-100 hover:text-green-600 transition-all"
                            title="Edit Application"
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
                            title="Delete Application"
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
                No Applications Found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "No applications have been submitted yet. Applications will appear here once submitted."}
              </p>
            </div>
          )}

          {queryApplication && queryApplication.last_page > 1 && (
            <PaginationControls 
              currentPage={currentPage} 
              lastPage={queryApplication.last_page} 
              onPageChange={setCurrentPage} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ApplicationPage;
