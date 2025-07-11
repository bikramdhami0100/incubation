"use client"
import {
  Home,
  Newspaper,
  AlertCircle,
  // FileText,
  Users,
  UserCheck,
  ImagePlus,
  FileText,
  UserRound,
  // ImageIcon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "News",
    url: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Notices",
    url: "/dashboard/notice",
    icon: AlertCircle, // Represents important alerts/notices
  },
  {
    title: "Applications",
    url: "/dashboard/application",
    icon: FileText, // Represents form or application document
  },
  {
    title: "Applicants",
    url: "/dashboard/applicants",
    icon: Users, // Represents a group of people
  },
  {
    title: "Committee",
    url: "/dashboard/committee",
    icon: UserCheck, // Represents a selected/verified user or group
  },
  // {
  //   title: "Photo Gallery",
  //   url: "/dashboard/photo-gallery",
  //   icon: ImageIcon, // Represents image content
  // },
  {
    title: "Gallery Images",
    url: "/dashboard/gallery-images",
    icon: ImagePlus, // Represents adding or managing images
  },
  {
    title: "Contact",
    url: "/dashboard/contact",
    icon: UserRound,
  }
];

export function DashBoardSidebar() {
    const path=usePathname();
    // console.log(path)
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-center justify-center mt-6 ">
             {/* logo */}
             <Image
             
             src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-full"
              priority
              quality={100}
            //   fill={true}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <h1 className=" text-[8px] font-bold text-end">(FWU) (Incubation Center )</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className=" mt-6">
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className={` ${path === item.url ? " bg-blue-500 text-white transition-all duration-200  hover:text-white  hover:bg-blue-600" : ""}`}
                  asChild>
                    <Link  href={item.url} >
                      <item.icon />
                      <span className=' '>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}