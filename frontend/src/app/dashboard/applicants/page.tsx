"use client";
import React, { useState, useMemo, useEffect } from "react";
import UniversityDashboardHeader from "../_components/UniversityDashboardHeader";
import {
  FileText,
  Users,
  UserCheck,
  Clock,
  Loader,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import StatsCard from "./component/StatsCard";
import Controls from "./component/Controls";
import ApplicantsTable from "./component/ApplicantsTable";
import Pagination from "./component/Pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ApplicantViewComponent from "./component/ApplicantViewComponent";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getCookie } from "@/app/fwucontext/CustomCookies";
// Define types for data structures
interface Application {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Applicant {
  id: number;
  application_id: number;
  status: string; // Assuming status is a string, adjust if it's an enum or specific type
  name: string;
  email: string;
  phone: string;
  photo: string;
  members: string;
  applicants_type: "student" | "faculty"; // Or use a more specific enum
  created_at: string;
  updated_at: string;
  application: Application;
}

interface PaginatedData {
  current_page: number;
  data: Applicant[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Stats {
  total: number;
  studentCount: number;
  thisMonth: number;
}

export interface SelectActions {
  selectedApplicants: Applicant | null;
  actionType:
    | "view"
    | "edit"
    | "delete"
    | "pending"
    | "rejected"
    | "approved"
    | ""; // Or use an enum
}

// Main ApplicantsPage Component
function ApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [seletActions, setSelectActions] = useState<SelectActions>({
    selectedApplicants: null,
    actionType: "",
  });
  const {
    data: mockApplicantsData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applicant"],
    queryFn: async (): Promise<PaginatedData> => {
      // Explicit return type
      const response = await axios.get<PaginatedData>(
        `${process.env.NEXT_PUBLIC_API_URL}/applicant?page=${currentPage}`
      );
      return response.data;
    },
    // select:(data)=>{  // Remove this select function.  It serves no purpose and is missing a return.
    //   console.log(data,"this is selected data")
    // }
  });

  const applicantTypes = useMemo(() => {
    if (!mockApplicantsData) return []; // Handle case where data is not yet loaded
    // const types = [...new Set(mockApplicantsData.data.map(applicant => applicant.applicants_type))];
    const types = ["student", "teacher", "faculty", "startup"];
    return types;
  }, [mockApplicantsData]); // Dependency array now includes mockApplicantsData

  // Filter applicants based on search and type
  const filteredApplicants = useMemo(() => {
    if (!mockApplicantsData) return []; // Handle case where data is not yet loaded

    return mockApplicantsData.data.filter((applicant) => {
      const matchesSearch =
        !searchTerm ||
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.application.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        !selectedType || applicant.applicants_type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType, mockApplicantsData]); // Dependency array includes mockApplicantsData

  // Calculate stats
  const stats = useMemo<Stats>(() => {
    if (!mockApplicantsData) return { total: 0, studentCount: 0, thisMonth: 0 }; // Handle initial state
    const total = mockApplicantsData.total;
    const studentCount = mockApplicantsData.data.filter(
      (a) => a.applicants_type === "student"
    ).length;
    const thisMonth = mockApplicantsData.data.filter((a) => {
      const createdDate = new Date(a.created_at);
      const now = new Date();
      return (
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return { total, studentCount, thisMonth };
  }, [mockApplicantsData]); // Dependency array includes mockApplicantsData

  const handlerStatusChange = async (type: string, item: Applicant) => {
    setLoader(true);
    try {
      if (type == "pending") {
        const responsePending = (
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/status-email`, {
            item,
            status: "pending",
          })
        ).data;
        console.log(responsePending);
        toast.success(responsePending.message);
      }
      if (type == "rejected") {
        const responseRejected = (
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/status-email`, {
            item,
            status: "rejected",
          })
        ).data;
        console.log(responseRejected);
        toast.success(responseRejected.message);
      }
      if (type == "approved") {
        const responseApproved = (
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/status-email`, {
            item,
            status: "approved",
          })
        ).data;
        console.log(responseApproved);
        toast.success(responseApproved.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      refetch();
      setLoader(false);
    }
  };

  useEffect(() => {
    if (
      seletActions.selectedApplicants?.id &&
      ["pending", "rejected", "approved"].includes(seletActions.actionType)
    ) {
      handlerStatusChange(
        seletActions.actionType,
        seletActions.selectedApplicants
      );
    }
  }, [seletActions, refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center gap-3 p-6 ">
          <Loader className="animate-spin w-10 h-10 text-blue-600" />
          <span className="text-lg font-medium text-blue-700">
            Loading, please wait...
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
            <AlertTriangle className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We&#39;re sorry, but an unexpected error has occurred. Please try
            again.
          </p>
        </div>
      </div>
    );
  }

  if (!mockApplicantsData) {
    // Handle the case where data might be null or undefined after loading
    return <div>No data available.</div>;
  }
  const handlerDeleteApplicant = async (item: Applicant) => {
    setLoader(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/applicant/${item.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);

    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      refetch();
      setSelectActions({ actionType: "", selectedApplicants: null });
      setLoader(false);
    }
  }
  return (
    <div>
      <UniversityDashboardHeader
        pageTitle="Incubation Center - Applicants"
        pageSubtitle="Manage and review applications from aspiring entrepreneurs and startups. Evaluate profiles, view portfolios, and make informed decisions for selection and incubation."
        breadcrumb={["Home", "Incubation Center", "Applicants"]}
        showStats={false}
      />
      {loader && (
        <AlertDialog open={loader}>
          <AlertDialogContent className="flex flex-col items-center gap-4 text-center py-10">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">
                Loading...
              </AlertDialogTitle>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {seletActions?.actionType == "view" && (
        <>
          <div className=" scroll-auto top-0 z-40 right-0 left-0">
            <ApplicantViewComponent
              seletActions={seletActions}
              setSelectActions={setSelectActions}
            />
          </div>
        </>
      )}

{seletActions?.actionType === "delete" && (
  <AlertDialog open={seletActions?.actionType === "delete"?true:false} >
    <AlertDialogContent className="bg-white border border-red-200 shadow-xl rounded-3xl p-8 max-w-lg text-center">
      <AlertDialogHeader className="flex flex-col items-center gap-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-full animate-pulse">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <AlertDialogTitle className="text-2xl font-semibold text-red-600">
          Delete Applicant?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-500 text-sm leading-relaxed">
          Are you sure you want to remove this applicant from the application? <br />
          This action cannot be undone and will permanently delete the applicant’s information from this system.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6 flex justify-center gap-4">
        <AlertDialogCancel
          onClick={() => setSelectActions({ actionType: "", selectedApplicants: null })}
          className="px-5 cursor-pointer py-2.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow transition-all font-medium"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handlerDeleteApplicant(seletActions.selectedApplicants!)}
          className="px-5 cursor-pointer py-2.5 rounded-md bg-red-600 text-white hover:bg-red-700 hover:shadow transition-all font-medium"
        >
          Yes, Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)}


      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Applications"
            value={stats.total}
            change={12}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Users}
            title="Student Applications"
            value={stats.studentCount}
            change={5}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={UserCheck}
            title="Approved"
            value="0"
            change={0}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={Clock}
            title="This Month"
            value={stats.thisMonth}
            change={25}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Controls */}
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          applicantTypes={applicantTypes}
        />

        {/* Applicants Table */}
        <div className="">
          <ApplicantsTable
            // path={mockApplicantsData.path}
            seletActions={seletActions}
            setSeletActions={setSelectActions}
            applicants={filteredApplicants}
          />
        </div>

        {/* Pagination */}
        <Pagination
          applicantsData={mockApplicantsData}
          currentPage={currentPage}
          totalPages={mockApplicantsData.last_page}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ApplicantsPage;
