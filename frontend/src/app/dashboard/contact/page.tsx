"use client"
import React, { useState } from 'react'
import {
  Mail,
  Users,
  MessageSquare,
  TrendingUp,
  Loader2,
  AlertTriangleIcon,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UniversityDashboardHeader from '../_components/UniversityDashboardHeader'
import ContactTable from './_component/ContactTable'
import Controls from './_component/Controls'
import Pagination from './_component/Pagination'

// --- Type Definitions ---

export interface ContactItem {
  id: number
  name: string
  email: string
  message: string
  created_at: string
  updated_at: string
}

export interface ContactDataType {
  data: ContactItem[]
  totalContact: number
}

// --- Components ---

interface StatsCardProps {
  icon: React.ElementType
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
        {change !== undefined && (
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
const AdminContactDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: queryContacts, isLoading, isError ,refetch} = useQuery({
    queryKey: ['contacts',currentPage],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact?page=${currentPage}`)
      return res.data as ContactDataType
    },
    refetchOnWindowFocus: false,
  })

  const timeFilters: string[] = ['all', 'today', 'week', 'month']

  // Filter and search logic
  const filteredContacts = queryContacts?.data.filter((contact: ContactItem) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesTime = true
    if (selectedTimeFilter !== 'all') {
      const contactDate = new Date(contact.created_at)
      const now = new Date()
      
      switch (selectedTimeFilter) {
        case 'today':
          matchesTime = contactDate.toDateString() === now.toDateString()
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesTime = contactDate >= weekAgo
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesTime = contactDate >= monthAgo
          break
      }
    }
    
    return matchesSearch && matchesTime
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex items-center gap-3 p-6">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          <span className="text-lg font-medium text-blue-700">Loading contacts...</span>
        </div>
      </div>
    )
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
            We&apos;re sorry, but an unexpected error has occurred. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityDashboardHeader
        pageTitle="Contact Management Dashboard"
        pageSubtitle="Manage and respond to user inquiries and contact form submissions. Stay connected with your community."
        breadcrumb={["Home", "Admin", "Contacts"]}
        showStats={true}
      />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={MessageSquare}
            title="Total Contacts"
            value={queryContacts?.totalContact ?? 0}
            change={15}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={Users}
            title="Unique Users"
            value={new Set(queryContacts?.data.map(c => c.email)).size ?? 0}
            change={8}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            icon={Mail}
            title="This Week"
            value={queryContacts?.data.filter(c => {
              const contactDate = new Date(c.created_at)
              const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              return contactDate >= weekAgo
            }).length ?? 0}
            change={22}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={TrendingUp}
            title="Response Rate"
            value="85%"
            change={5}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Controls */}
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTimeFilter={selectedTimeFilter}
          setSelectedTimeFilter={setSelectedTimeFilter}
          timeFilters={timeFilters}
        />

        {/* Contact Table */}
        <div className="mb-8">
          <ContactTable refetch={refetch} contacts={filteredContacts ?? []} />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((filteredContacts?.length ?? 0) / 10)}
          onPageChange={setCurrentPage}
          totalItems={filteredContacts?.length ?? 0}
        />
      </div>
    </div>
  )
}

export default AdminContactDashboard