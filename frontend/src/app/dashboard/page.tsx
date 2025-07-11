"use client"
import React from 'react'
import { 
  Plus, 
  Bell,
  Users,
  FileText,
  Camera,
  UserCheck,
  ClipboardList,
  // Award,
  MessageSquare,
  LucideIcon 
} from 'lucide-react'
// Recharts components remain the same, but will be used differently
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import UniversityDashboardHeader from './_components/UniversityDashboardHeader';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '../fwucontext/CustomCookies';
import Link from 'next/link';

// --- Type Definitions ---

interface ApiDashboardData {
  totalNews: number;
  totalNotices: number;
  totalApplicants: number;
  totalApplications: number;
  totalContact: number;
  totalGallery: number;
}

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value?: number;
  color: string;
  description: string;
}

interface Action {
  icon: LucideIcon;
  label: string;
  color: string;
  link:string,
}

// Type for the data structure the new chart will use
interface ChartDataItem {
    name: string;
    value: number;
    fill: string; // Each bar will have its own color
}
interface AllContentChartProps {
    data: ChartDataItem[];
}


// --- Reusable UI Components ---

const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 rounded-xl bg-gray-200 h-12 w-12"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const SkeletonChart: React.FC = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-[300px] bg-gray-200 rounded-lg"></div>
    </div>
);


const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
        <p className="font-bold">Error</p>
        <p>{message}</p>
    </div>
);


const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value, color, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value ?? '...'}</h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

// IMPROVED: Bar Chart Component to show all content totals
const AllContentChart: React.FC<AllContentChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Overall Content Distribution</h3>
        <p className="text-gray-600 text-sm">A summary of all key metrics in the system</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            stroke="#4b5563" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#4b5563" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(243, 244, 246, 0.7)' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {/* This is key: It assigns a specific color to each bar based on the data */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


const QuickActions: React.FC = () => {
  const actions: Action[] = [
    { icon: Plus, label: 'Add News', color: 'bg-blue-500 hover:bg-blue-600' ,link: '/dashboard/news#addnews' },
    { icon: Bell, label: 'Post Notice', color: 'bg-green-500 hover:bg-green-600',link: '/dashboard/notice#postnotice' },
    { icon: UserCheck, label: 'Review Applications', color: 'bg-purple-500 hover:bg-purple-600' ,link: '/dashboard/applications#reviewapplications' },
    { icon: Camera, label: 'Upload Gallery', color: 'bg-orange-500 hover:bg-orange-600',link: '/dashboard/gallery-images#uploadgallery' },
    { icon: Users, label: 'Manage Committee', color: 'bg-red-500 hover:bg-red-600' ,link: '/dashboard/committee#managecommittee' },
    // { icon: Award, label: 'Graduate Startup', color: 'bg-indigo-500 hover:bg-indigo-600',link: '/fwu/graduation#graduation' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        <p className="text-gray-600 text-sm">Perform common tasks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link 
            href={action.link}
            key={index}
            className={`flex items-center space-x-3 p-4 rounded-xl text-white transition-all hover:scale-105 ${action.color}`}
          >
            <action.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
const FWUIncubationDashboard: React.FC = () => {
 
  const { data, isLoading, isError, error } = useQuery<ApiDashboardData>({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
                <SkeletonChart />
            </div>
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full animate-pulse">
                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                     <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-16 bg-gray-200 rounded-xl"></div>)}
                     </div>
                </div>
            </div>
        </div>
      );
    }

    if (isError) {
      return <ErrorMessage message={error instanceof Error ? error.message : 'An unknown error occurred'} />;
    }

    if (data) {
      // Data transformation: Prepare the data for the improved bar chart
      const chartData: ChartDataItem[] = [
        { name: 'Apps', value: data.totalApplications, fill: '#3B82F6' }, // Blue
        { name: 'Applicants', value: data.totalApplicants, fill: '#8B5CF6' }, // Purple
        { name: 'News', value: data.totalNews, fill: '#6366F1' }, // Indigo
        { name: 'Notices', value: data.totalNotices, fill: '#EF4444' }, // Red
        { name: 'Gallery', value: data.totalGallery, fill: '#EC4899' }, // Pink
        { name: 'Contacts', value: data.totalContact, fill: '#14B8A6' }, // Teal
      ];

      return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats and Chart */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Stats Grid - Now with 3 columns for better fit */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatsCard
                        icon={ClipboardList} title="Applications" value={data.totalApplications}
                        color="bg-gradient-to-br from-blue-500 to-blue-600" description="Total applications"
                    />
                    <StatsCard
                        icon={Users} title="Applicants" value={data.totalApplicants}
                        color="bg-gradient-to-br from-purple-500 to-purple-600" description="Total entrepreneurs"
                    />
                    <StatsCard
                        icon={FileText} title="News" value={data.totalNews}
                        color="bg-gradient-to-br from-indigo-500 to-indigo-600" description="Published articles"
                    />
                    <StatsCard
                        icon={Bell} title="Notices" value={data.totalNotices}
                        color="bg-gradient-to-br from-red-500 to-red-600" description="Official announcements"
                    />
                    <StatsCard
                        icon={Camera} title="Gallery" value={data.totalGallery}
                        color="bg-gradient-to-br from-pink-500 to-pink-600" description="Photos & videos"
                    />
                    <StatsCard
                        icon={MessageSquare} title="Contacts" value={data.totalContact}
                        color="bg-gradient-to-br from-teal-500 to-teal-600" description="Messages received"
                    />
                </div>

                {/* The new and improved chart for all content */}
                <AllContentChart data={chartData} />
            </div>

            {/* Right Column: Quick Actions */}
            <div className="lg:col-span-1">
                <QuickActions />
            </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityDashboardHeader
        pageTitle="Incubation Center Dashboard"
        pageSubtitle="An overview of the incubation center's key metrics and activities. Use the quick actions for common tasks."
        breadcrumb={["Home", "Incubation Center", "Dashboard"]}
        showStats={false}
        page="dashboard"
      />
      <main className="mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  )
}

export default FWUIncubationDashboard;