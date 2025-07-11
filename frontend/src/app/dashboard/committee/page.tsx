"use client";
import React, { useState } from "react";
import {
  Users,
  Crown,
  UserCheck,
  Loader2,
  AlertTriangleIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
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
 
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UniversityDashboardHeader from "../_components/UniversityDashboardHeader";
import CommitteeControls from "./component/CommitteeControls";
// import Image from 'next/image'
import AddCommittee from "./component/AddCommittee";
import CommitteeTable from "./component/CommitteeTable";
import ViewCommitteeData from "./component/ViewCommittteeData";
import EditCommitteeData from "./component/EditCommitteeData ";
import { toast } from "sonner";
import { getCookie } from "@/app/fwucontext/CustomCookies";
// import { toast } from "sonner";

// --- Type Definitions ---

export interface CommitteeMember {
  name: string;
  email: string;
  position: string;
  photo?: string | null | File;
  photoIndex?: number | null;
}

export interface Committee {
  id: number;
  name: string;
  description: string;
  committee_members: string; // JSON string
  created_at: string;
  updated_at: string;
}

interface CommitteeDataType {
  current_page: number;
  data: Committee[];
  total: number;
  per_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  from: number;
  to: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

// --- Components ---

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

// Stats Card Component
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

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}) => {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-lg ${
            page === currentPage
              ? "text-white bg-blue-600 border border-blue-600"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

// Main Committee Component
const CommitteePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<{
    select: string;
    item: Committee | null;
  }>({
    select: "",
    item: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch committee data
  const {
    data: queryCommittee,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["committee", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/committee?page=${currentPage}`
      );
      return res.data as CommitteeDataType;
    },
    refetchOnWindowFocus: false,
  });


  // Filter logic
  const filteredCommittees = queryCommittee?.data.filter(
    (committee: Committee) => {
      const members: CommitteeMember[] = JSON.parse(
        committee.committee_members || "[]"
      );
      const matchesSearch =
        committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        committee.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        members.some(
          (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    }
  );

  // Calculate stats
  const totalCommittees = queryCommittee?.total || 0;
  const totalMembers =
    queryCommittee?.data.reduce((acc, committee) => {
      const members: CommitteeMember[] = JSON.parse(
        committee.committee_members || "[]"
      );
      return acc + members.length;
    }, 0) || 0;

  const activeCommittees = queryCommittee?.data.length || 0;

  const totalChairpersons =
    queryCommittee?.data.reduce((acc, committee) => {
      const members: CommitteeMember[] = JSON.parse(
        committee.committee_members || "[]"
      );
      const chairpersons = members.filter(
        (member) =>
          member.position.toLowerCase().includes("chair") ||
          member.position.toLowerCase().includes("president") ||
          member.position.toLowerCase().includes("head")
      );
      return acc + chairpersons.length;
    }, 0) || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Action handlers
  const handleEdit = (committee: Committee) => {
    setSelectedAction({ select: "edit", item: committee });

  };

  const handleDelete = (committee: Committee) => {
    setSelectedAction({ select: "delete", item: committee });
   
  };

  const handleView = (committee: Committee) => {
    setSelectedAction({ select: "view", item: committee });

  };

  const handlerDeleteData=async()=>{
   const respone=(await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/committee/${selectedAction.item?.id}`,  {params:{member:selectedAction.item?.committee_members},
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    }
  })).data;
   if(respone){
    toast.success("Committee deleted successfully!");
    setSelectedAction({ select: "", item: null });
    // setSelectedAction({ select: "", item: null });
    refetch();
   }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center gap-3 p-6">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          <span className="text-lg font-medium text-blue-700">
            Loading committee data, please wait...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <AlertTriangleIcon className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;re sorry, but an unexpected error has occurred while loading
            committee data. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityDashboardHeader
        pageTitle="Committee Management"
        pageSubtitle="Here you can view and manage committees, their members, roles, and responsibilities."
        breadcrumb={["Home", "Incubation Center", "Committee Management"]}
        showStats={true}
      />
      {selectedAction?.select === "view" && selectedAction.item && (
        <ViewCommitteeData
          setSelectedAction={setSelectedAction}
          data={selectedAction.item}
        />
      )}

      {selectedAction?.select == "edit" && selectedAction.item && (
        <EditCommitteeData
          setSelectedAction={setSelectedAction}
          data={selectedAction.item}
          refetch={refetch}
          // onSubmit={handleEditSubmit}
        />
      )}

     {selectedAction?.select == "delete" && selectedAction.item && (
  <AlertDialog open={selectedAction?.select == "delete" ? true : false}>
    <AlertDialogContent className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
      {/* Animated Header with Gradient */}
      <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-rose-700 px-8 py-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          {/* Animated Warning Icon */}
          <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 animate-pulse">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold text-white mb-2">
            Delete Committee?
          </AlertDialogTitle>
          
          <p className="text-red-100 text-sm font-medium">
            {selectedAction.item?.name} Committee
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Content Section */}
      <AlertDialogHeader className="px-8 py-6 space-y-4">
        <AlertDialogDescription className="text-center text-slate-600 text-base leading-relaxed">
          <span className="font-semibold text-slate-800">This action cannot be undone.</span>
          <br />
          This will permanently delete the committee and remove all associated data from our servers.
          
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-2 text-red-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">All committee members and data will be lost</span>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>

      {/* Action Buttons */}
      <AlertDialogFooter className="px-8 py-6 bg-slate-50 space-x-3">
        <AlertDialogCancel
          onClick={() => {
            setSelectedAction({ select: "", item: null });
          }}
          className="flex-1 cursor-pointer bg-white hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 ease-out hover:scale-105 hover:shadow-md"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancel</span>
          </span>
        </AlertDialogCancel>
        
        <AlertDialogAction 
          onClick={handlerDeleteData}
          className="flex-1 cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg transform active:scale-95"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete Forever</span>
          </span>
        </AlertDialogAction>
      </AlertDialogFooter>
      
      {/* Subtle Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </AlertDialogContent>
  </AlertDialog>
)}
      {selectedAction?.select === "add" && (
        <div className="relative min-h-screen w-full">
          <div
            style={{ scrollbarWidth: "none" }}
            className="bg-white fixed top-0 bottom-0 p-4 right-0 left-0 z-40 overflow-y-auto"
          >
            <div className="">
              <AddCommittee
                 refetch={refetch}
                setSelectedAction={setSelectedAction}
                selectedAction={selectedAction}
                // onSuccess={() => refetch()}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Users}
            title="Total Committees"
            value={totalCommittees}
            subtitle="Active committees"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={UserCheck}
            title="Total Members"
            value={totalMembers}
            subtitle="Across all committees"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={Crown}
            title="Leadership Roles"
            value={totalChairpersons}
            subtitle="Chairs & Heads"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={MapPin}
            title="Active Committees"
            value={activeCommittees}
            subtitle="Currently active"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Controls */}
        <CommitteeControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          selectedDepartment=""
          setSelectedDepartment={() => {}}
          departments={[]}
          refetch={refetch}
        />

        {/* Committee Table */}
        {filteredCommittees && filteredCommittees.length > 0 ? (
          <CommitteeTable
            committees={filteredCommittees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No committees found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "No committees have been created yet."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {queryCommittee && queryCommittee.last_page > 1 && (
          <Pagination
            currentPage={queryCommittee.current_page}
            totalPages={queryCommittee.last_page}
            onPageChange={handlePageChange}
            hasNext={queryCommittee.next_page_url !== null}
            hasPrev={queryCommittee.prev_page_url !== null}
          />
        )}
      </div>
    </div>
  );
};

export default CommitteePage;
