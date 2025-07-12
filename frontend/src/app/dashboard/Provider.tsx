"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { DashBoardSidebar } from "./_components/DashBoardSidebar";
import DashboardHeader from "./_components/DashboardHeader";
import AdminContextProvider from "@/contexts/AdminContext";

function DashboardProvider({ children }: { children: React.ReactNode }) {
 
  return (
    <AdminContextProvider>
    <SidebarProvider>
      <DashBoardSidebar />
      <div className="w-full bg-gray-200">
        <div className="sticky top-0 z-30 backdrop-blur-2xl">
          <DashboardHeader />
        </div>
        <div className="">{children}</div>
      </div>
    </SidebarProvider>
    </AdminContextProvider>
  );
}

export default DashboardProvider;
