// "use client";

// import React, { createContext, ReactNode, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { NewsApiResponse } from "../fwu/news/page";
// import { Application } from "../fwu/apply/page";
// import { NoticesApiResponse } from "../fwu/notice/page";
// import { GalleryData } from "../fwu/gallery/page";
// import { CommitteeDataType } from "../fwu/committees/page";

// // Define a type for the context data
// export interface AllDataContextType {
//   newsData: NewsApiResponse;
//   applicationData: Application[];
//   noticesData: NoticesApiResponse;
//   galleryData: GalleryData;
//   committeeData: CommitteeDataType;
//   isLoading: boolean;
//   isError: boolean;
// }

// const AllDataContext = createContext<AllDataContextType | null>(null);

// const fetchAllData = async (newsCurrentPage: number,applicationCurrentPage: number,noticeCurrentPage: number,galleryCurrentPage: number,committeeCurrentPage: number) => {

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const [news, applications, notices, gallery, committee] = await Promise.all([
//     fetch(`${baseUrl}/news?page=${newsCurrentPage}`).then((res) => res.json()),
//     fetch(`${baseUrl}/application`).then((res) => res.json()),
//     fetch(`${baseUrl}/notice`).then((res) => res.json()),
//     fetch(`${baseUrl}/gallery`).then((res) => res.json()),
//     fetch(`${baseUrl}/committee`).then((res) => res.json()),
//   ]);

//   return {
//     newsData: news,
//     applicationData: applications,
//     noticesData: notices,
//     galleryData: gallery,
//     committeeData: committee,
//   };
// };

// function FetchAllContext({ children }: { children: ReactNode }) {
//     const [newsCurrentPage,setNewsCurrentPage] = useState(1);
//   const [applicationCurrentPage,setApplicationCurrentPage] = useState(1);
//   const [noticeCurrentPage,setNoticeCurrentPage] = useState(1);
//   const [galleryCurrentPage,setGalleryCurrentPage] = useState(1);
//   const [committeeCurrentPage,setCommitteeCurrentPage] = useState(1);
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["all-data", newsCurrentPage,applicationCurrentPage,noticeCurrentPage,galleryCurrentPage,committeeCurrentPage],
//     queryFn: () => fetchAllData(newsCurrentPage,applicationCurrentPage,noticeCurrentPage,galleryCurrentPage,committeeCurrentPage),
//     // staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   return (
//     <AllDataContext.Provider
//       value={{
//         newsData: data?.newsData || [],
//         applicationData: data?.applicationData || [],
//         noticesData: data?.noticesData || [],
//         galleryData: data?.galleryData || [],
//         committeeData: data?.committeeData || [],
//         isLoading,
//         isError,
//       }}
//     >
//       {children}
//     </AllDataContext.Provider>
//   );
// }

// export { FetchAllContext, AllDataContext };
