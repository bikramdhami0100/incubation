import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  LogOut } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { removeCookie } from "@/app/fwucontext/CustomCookies";
import Link from "next/link";
import { useAdminContext } from "@/contexts/AdminContext";
function DashboardHeader() {
  const {adminData}=useAdminContext();
  const handlerLogOut=async()=>{

    const data=(await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`)).data;;
    console.log(data);
    if(typeof window !== 'undefined'){
      localStorage.removeItem('token')
      window.location.href='/login'
      removeCookie('token');
    }

  }
  const image=adminData?.admin[0].profile_image;
console.log(adminData,"this is admin data");
  return (
    <div>
      <div className="border-b shadow-md flex justify-between  items-center gap-1 p-2">
        <SidebarTrigger  size={'lg'}/>

        <div className=" flex gap-2 justify-center items-center">
            {/* <div className="bg-white/20 flex gap-1 backdrop-blur-sm rounded-xl p-3">
              <Bell className="w-6 h-6" />
              <span className=" text-sm  rounded-[5px] w-[10px] h-[10px] ">2</span>
            </div> */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <Image
                height={32}
                width={32}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/admin/${image}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Account</DropdownMenuLabel> */}
               <Link className=" cursor-pointer"  href={"/dashboard/profile"}><DropdownMenuItem className=" cursor-pointer">Profile</DropdownMenuItem></Link>
              <DropdownMenuSeparator />
               {/* <Link className=" cursor-pointer"  href={"/dashboard/settings"}><DropdownMenuItem className=" cursor-pointer">Settings</DropdownMenuItem></Link> */}
              {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
              <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => {
                 handlerLogOut();
              }}> <LogOut/> logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
