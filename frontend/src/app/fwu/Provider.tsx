"use client"
import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
function UserProvider({ children }: { children: React.ReactNode }) {
  // const queryclient=new QueryClient();
  return (
    <div className=" w-full h-full">
        <Header />
            {children}
        <Footer />

    </div>
  );
}

export default UserProvider;
