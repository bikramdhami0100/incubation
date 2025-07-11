"use client"
import React, {  useState } from 'react'
import {
  Tag,
  Users,
  FileText,
  TrendingUp, // Added TrendingUp as it's used in StatsCard
  Loader2,
  AlertTriangleIcon
} from 'lucide-react'
import NewsTable from './_components/NewsTable'
import Controls from './_components/Controls'
import Pagination from './_components/PaginationProps'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UniversityDashboardHeader from '../_components/UniversityDashboardHeader'

// --- Type Definitions ---

interface Admin {
  id: number
  name: string
  email: string
  profile_image: string
  role: string,
  email_verified: number
  created_at: string
  updated_at: string
}

export interface NewsItem{
  id: number
  title: string
  description: string
  news_photo?: string|null|File,
  category: string
  added_by: number
  created_at: string
  updated_at: string
  admin: Admin
}

 export interface MockNewsDataType {
  current_page: number
  data: NewsItem[]
  total: number
  per_page: number
  last_page: number
  path?: string
}

// --- Components ---

interface StatsCardProps {
  icon: React.ElementType // Type for Lucide icon components
  title: string
  value: string | number
  change?: number
  color: string
}

// Stats Card Component
const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value, change, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {change !== undefined && ( // Check if change is provided
          <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
)

// Main Dashboard Component
const AdminNewsDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1);

// When refetchInterval changes to true, data will be refetched every 600ms
// When false, automatic refetching is disabled
  const { data: queryNews ,isLoading ,isError} = useQuery({
  queryKey: ['news'],
  queryFn: async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news?page=${currentPage}`);
    return res.data as MockNewsDataType;
  },
  select: (data) => {
    return data; // Make sure to return data if you're selecting
  },
  // (Optional) You can still use this to control refetch on focus
  refetchOnWindowFocus: false,
});
console.log(queryNews,'this is query news data');






const mockNewsData: MockNewsDataType|undefined = queryNews;
 
  // Filter and search logic
 const filteredNews= mockNewsData?.data.filter((item: NewsItem) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  

const categories: string[] = [
  'event',
  'announcement',
  'research',
  'startup',
  'seminar',
  'funding',
  'achievement',
  // 'notice',
  'workshop',
];

 if (isLoading) {
    return (
         <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex items-center gap-3 p-6 ">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
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
          <AlertTriangleIcon className="text-red-500 w-16 h-16" />
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
    <div className="min-h-screen bg-gray-50">
       <UniversityDashboardHeader
        pageTitle="Incubation Center - Official News"
        pageSubtitle=" Stay updated with the latest announcements, programs, and opportunities from our innovation hub. Access important documents and guidelines for startups and entrepreneurs."
        breadcrumb={["Home", "Incubation Center", "News"]}
        showStats={true}
      />
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total News"
            value={mockNewsData?.total ?? 0}
            change={12}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Users}
            title="Active Authors"
            value="3"
            change={5}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={Tag}
            title="Categories"
            value="4"
            change={0}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={TrendingUp}
            title="This Month"
            value="8"
            change={25}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

           
        {/* Controls */}
         <Controls  searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
        {/* News Table */}
        <div className="mb-8">
          <NewsTable
            path={mockNewsData?.path ?? ''}
            news={filteredNews ?? [] }
          />
        </div>

        {/* Pagination */}
        <Pagination
          mockNewsData={mockNewsData ?? { current_page: 1, data: [], total: 0, per_page: 10, last_page: 1 }}
          currentPage={currentPage}
          totalPages={mockNewsData?.last_page ?? 1}
          onPageChange={setCurrentPage}
        />
        
      </div>
    </div>
  )
}

export default AdminNewsDashboard