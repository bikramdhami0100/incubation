"use client";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function UserProvider({ children }: { children: React.ReactNode }) {
   const queryclient=new QueryClient();
   
  return (
      <QueryClientProvider client={queryclient}>
      <div className=" w-full h-full m-0 p-0" >
        <Toaster position="top-right" />
          {children}
       </div>
      </QueryClientProvider>
  );
}

export default UserProvider;
