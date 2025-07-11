"use client";
import React, { useState } from "react";
import {
  Bell,
  Users,
  FileText,
  TrendingUp,
  Loader2Icon,
  LucideAlertTriangle,
} from "lucide-react";
import UniversityDashboardHeader from "../_components/UniversityDashboardHeader";
import { NoticeDataType ,NoticeItem } from "./notice_type/notice";
import NoticeControls from "./_component/NoticeControls";
import NoticePagination from "./_component/NoticePagination";
import NoticeTable from "./_component/NoticeTable";
import StatsCard from "./_component/StatsCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateNoticeModal from "./_component/CreateNotice";
import EditNotice from "./_component/EditNotice";
import DeleteNotice from "./_component/DeleteNotice";

// --- Type Definitions ---

// Main Dashboard Component
const FWUNoticesPage: React.FC = () => {
  const [isEditModelOpen, setIsEditModelOpen] = useState <{ select: string; item: NoticeItem |null } > ({ select:"", item:null });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {data: realNoticeData, isLoading, isError } = useQuery<NoticeDataType>({
    queryKey: ["notices"],
    queryFn: async (): Promise<NoticeDataType> => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notice`);
      return res.data as NoticeDataType;
    },
    select: (data) => {
      return data;
    },
  });

  const filteredNotices = realNoticeData?.data
    ? realNoticeData.data.filter((item: NoticeItem) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" ||
          item.title.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
      })
    : [];

  const categories: string[] = [
    "proposal",
    "mentorship",
    "workshop",
    "funding",
    "facility",
    "program",
    "application",
  ];
  console.log(isEditModelOpen)


   if (isLoading) {
      return (
           <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center gap-3 p-6 ">
          <Loader2Icon className="animate-spin w-10 h-10 text-blue-600" />
          <span className="text-lg font-medium text-blue-700">Loading, please wait...</span>
        </div>
      </div>
      );
    }
  
    if (isError) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <LucideAlertTriangle className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-2xl font-semibold text-red-600 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We&#39;re sorry, but an unexpected error has occurred. Please try again.
          </p>
         
        </div>
      </div>
      );
    }
  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <UniversityDashboardHeader
        pageTitle="Incubation Center - Official Notices"
        pageSubtitle="Stay updated with the latest announcements, programs, and opportunities from our innovation hub. Access important documents and guidelines for startups and entrepreneurs."
        breadcrumb={["Home", "Incubation Center", "Notices"]}
        showStats={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Bell}
            title="Total Notices"
            value={realNoticeData?.total ?? 0}
            change={15}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Users}
            title="Active Admins"
            value="3"
            change={0}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={FileText}
            title="With Attachments"
            value="5"
            change={25}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={TrendingUp}
            title="This Month"
            value="12"
            change={20}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Controls */}
        <NoticeControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          isEditModelOpen={isEditModelOpen}
          setIsEditModelOpen={setIsEditModelOpen}
        />

        {/* open create notice model */}
        {isEditModelOpen?.select === "create" && (
            <Dialog  open={isEditModelOpen?.select === "create" ? true : false} onOpenChange={()=>{
              setIsEditModelOpen({ select: "", item: null })
            }}>
              <DialogContent className=" w-full">
                <DialogHeader className=" w-full">
                  <DialogTitle>Create Notice</DialogTitle>
                  <DialogDescription className=" w-full">
                    <CreateNoticeModal setIsEditModelOpen={setIsEditModelOpen} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        )}
         {/* open edit notice model */}
        {isEditModelOpen?.select === "edit" && isEditModelOpen?.item && (
            <>
             <EditNotice notice={isEditModelOpen.item} setIsEditModelOpen={setIsEditModelOpen} />
            </>
        ) }

         {/* open delete notice model */}
         {isEditModelOpen?.select === "delete" && isEditModelOpen?.item && (
            <>
             <DeleteNotice item={isEditModelOpen.item} isDeleteModelOpen={isEditModelOpen} setIsDeleteModelOpen={setIsEditModelOpen} />
            </>
        ) }

        {/* Notice Table */}
        <div className="mb-8">
          <NoticeTable isEditModelOpen={isEditModelOpen} setIsEditModelOpen={setIsEditModelOpen}  notices={filteredNotices} />
        </div>

        {/* Pagination */}
        {realNoticeData && (
          <NoticePagination
            noticeData={realNoticeData}
            currentPage={currentPage}
            totalPages={realNoticeData.last_page}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default FWUNoticesPage;
