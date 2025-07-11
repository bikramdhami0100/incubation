"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { DashBoardSidebar } from "./_components/DashBoardSidebar";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardProvider({ children }: { children: React.ReactNode }) {
 
  return (
    <SidebarProvider>
      <DashBoardSidebar />
      <div className="w-full bg-gray-200">
        <div className="sticky top-0 z-30 backdrop-blur-2xl">
          <DashboardHeader />
        </div>
        <div className="">{children}</div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
