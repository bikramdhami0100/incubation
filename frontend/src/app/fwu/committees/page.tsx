"use client"
import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Users, Calendar, Eye, X, Mail,  Crown,  Grid, List, Clock} from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

// Mock the useQuery hook and axios for demonstration


// TypeScript interfaces
interface CommitteeMember {
  name: string;
  email: string;
  position: string;
  photoIndex: number;
  photo: string;
}

interface Committee {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  committee_members: string | CommitteeMember[];
}

export interface CommitteeDataType {
  current_page: number;
  data: Committee[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

// Generate avatar with initials
const getAvatarColor = (index: number) => {
 const colors = [
  'bg-gradient-to-br from-blue-600 to-blue-800',        // Corporate blue
  'bg-gradient-to-br from-green-600 to-emerald-800',    // Calm green
  'bg-gradient-to-br from-indigo-600 to-indigo-800',    // Deep indigo
  'bg-gradient-to-br from-purple-600 to-fuchsia-800',   // Elegant purple
  'bg-gradient-to-br from-teal-600 to-cyan-800',        // Cool teal
  'bg-gradient-to-br from-rose-600 to-rose-800',        // Subtle rose
  'bg-gradient-to-br from-slate-600 to-slate-800',      // Neutral slate
  'bg-gradient-to-br from-gray-600 to-zinc-800',        // Professional gray
  'bg-gradient-to-br from-red-600 to-rose-700',         // Strong red (for alerts or decisions)
  'bg-gradient-to-br from-violet-600 to-indigo-700',    // Balanced violet
  'bg-gradient-to-br from-cyan-600 to-blue-800',        // Fresh cyan
  'bg-gradient-to-br from-emerald-600 to-green-800'     // Trustworthy emerald
];

  return colors[index % colors.length];
};

const getInitials = (name: string) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
};

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 168) { // 7 days
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export default function CommitteesPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchData,setSearchData] = useState("");
  // const [sortBy, setSortBy] = useState<'name' | 'updated' | 'members'>('updated');

  // Fetch committees data
  const {data: committeesData, isLoading} = useQuery({
    queryKey: ['committees', currentPage,searchTerm],
    queryFn: async () => {
      // This would be your actual API call
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/committee?search=${searchTerm}&page=${currentPage}`);
      return res.data as CommitteeDataType;
    },
    // refetchOnWindowFocus: false,
  });

  // Parse committee members
  const parseCommitteeMembers = (members: string | CommitteeMember[]): CommitteeMember[] => {
    if (typeof members === 'string') {
      try {
        return JSON.parse(members);
      } catch {
        return [];
      }
    }
    return members || [];
  };


  // Filter and sort committees
  const filteredAndSortedCommittees = committeesData?.data?.filter(committee => 
    committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB.getTime() - dateA.getTime();
  }) || [];

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchData(e.target.value);
  };

  // Handle committee details view
  const handleViewDetails = (committee: Committee) => {
    setSelectedCommittee(committee);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCommittee(null);
  };

  // Committee details modal
  const CommitteeModal = () => {
    if (!selectedCommittee) return null;
    
    const members = parseCommitteeMembers(selectedCommittee.committee_members);
    
    return (
      <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-gray-100  border rounded-3xl shadow-2xl w-full md:max-w-[80vw] lg:max-w-[70vw] overflow-hidden animate-slideUp">
          {/* Modal Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedCommittee.name}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-blue-100">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Updated {getRelativeTime(selectedCommittee.updated_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{members.length} members</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-3  cursor-pointer hover:bg-opacity-20 rounded-full transition-all duration-200 group"
              >
                <X className="h-6 w-6 text-white group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div  style={{scrollbarWidth:"none"}} className="p-8 overflow-y-auto max-h-[70vh] ">
            {/* Description */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <span>About This Committee</span>
              </h3>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed text-lg">{selectedCommittee.description}</p>
              </div>
            </div>

            {/* Members Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <span>Committee Members</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {members.length}
                </span>
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 cursor-pointer h-24 mb-4 rounded-full overflow-hidden">
                        {/* {getInitials(member.name)} */}
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${member.photo}`}
                          alt={member.name}
                          width={100}
                          height={100}
                          className="w-full h-full border object-cover rounded-full"
                        />

                      </div>
                      <div className="w-full">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                          {member.position.toLowerCase().includes('chair') && (
                            <Crown className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="bg-gradient-to-r inline from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          {member.position}
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          <a href={`mailto:${member.email}`} className="truncate font-medium">{member.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white opacity-5 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-opacity-20 rounded-2xl mb-8 backdrop-blur-sm">
              <Users className="h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Our Committees
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover the dedicated teams driving innovation, growth, and excellence across our organization
            </p>
            
            {/* Enhanced Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                setSearchTerm(searchData);
              }}  className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search committees by name or description..."
                  value={searchData}
                  onChange={handleSearch}
                  className="w-full pl-14 pr-6 py-5 bg-white bg-opacity-95 backdrop-blur-sm border-0 rounded-2xl focus:ring-4 focus:ring-white focus:ring-opacity-30 focus:outline-none text-gray-900 placeholder-gray-500 shadow-xl text-lg"
                />
              </form>
              
              {/* Filter and View Controls */}
              <div className="flex flex-wrap text-black items-center justify-center gap-4">
               
                
                <div className="flex items-center  bg-opacity-20 backdrop-blur-sm rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? ' bg-opacity-30 text-white' : 'text-blue-100 hover:text-white'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? ' bg-opacity-30 text-white' : 'text-blue-100 hover:text-white'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 absolute top-0 left-0"></div>
              </div>
              <span className="mt-6 text-gray-600 font-medium text-lg">Loading committees...</span>
            </div>
          </div>
        )}

        {/* Enhanced Results Info */}
        {!isLoading && committeesData && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-gray-700 text-lg">
                  {searchTerm ? (
                    <span>
                      Found <span className="font-bold text-blue-600">{filteredAndSortedCommittees.length}</span> committees matching 
                      <span className="font-bold text-purple-600"> {searchTerm}</span>
                    </span>
                  ) : (
                    <span>
                      Showing <span className="font-bold text-blue-600">{committeesData.total}</span> committees
                    </span>
                  )}
                </p>
               
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Committees Display */}
        {!isLoading && filteredAndSortedCommittees.length > 0 && (
          <div className={viewMode === 'grid' ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
            {filteredAndSortedCommittees.map((committee: Committee) => {
              const members = parseCommitteeMembers(committee.committee_members);
              
              if (viewMode === 'list') {
                return (
                  <div
                    key={committee.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 md:w-80 flex-shrink-0">
                        <div className="">
                          <h3 className="text-2xl font-bold mb-4">{committee.name}</h3>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className=" bg-opacity-20 px-3 text-black py-1 rounded-full text-sm font-semibold">
                              {members.length} members
                            </div>
                            <div className="text-sm opacity-90">
                              Updated {getRelativeTime(committee.updated_at)}
                            </div>
                          </div>
                          <div className="flex -space-x-2">
                            {members.slice(0, 5).map((member, index) => (
                              <div
                                key={index}
                                className={`w-10 h-10 rounded-full ${getAvatarColor(member.photoIndex)} flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg`}
                                title={member.name}
                              >
                                {getInitials(member.name)}
                              </div>
                            ))}
                            {members.length > 5 && (
                              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg">
                                +{members.length - 5}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1">
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-3">
                          {committee.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Created {new Date(committee.created_at).toLocaleDateString()}</span>
                          </div>
                          <button
                            onClick={() => handleViewDetails(committee)}
                            className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            <Eye className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div
                  key={committee.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-xl font-bold leading-tight flex-1 pr-4">
                          {committee.name}
                        </h3>
                        <div className=" border bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                          {members.length} members
                        </div>
                      </div>
                      
                      {/* Member Avatars Preview */}
                      <div className="flex justify-between items-center">
                        {/* <div className="flex -space-x-2">
                          {members.slice(0, 4).map((member, index) => (
                            <div
                              key={index}
                              className={`w-10 h-10 rounded-full ${getAvatarColor(member.photoIndex)} flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg hover:scale-110 transition-transform`}
                              title={member.name}
                            >
                              {getInitials(member.name)}
                            </div>
                          ))}
                          {members.length > 4 && (
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg">
                              +{members.length - 4}
                            </div>
                          )}
                        </div>
                         */}
                         <div className="flex bg-white h-18 rounded-[50%] w-18">
                           <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${members[0].photo}`} alt={members[0].name} width={100} height={100} className="w-full h-full object-cover rounded-full" />
                         </div>
                        <div className="text-sm opacity-90">
                          {getRelativeTime(committee.updated_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-8">
                    <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed text-lg">
                      {committee.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Created {new Date(committee.created_at).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(committee)}
                        className="group cursor-pointer inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enhanced No Results */}
        {!isLoading && filteredAndSortedCommittees.length === 0 && (
          <div className="text-center py-32">
            <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-lg mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">No committees found</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {searchTerm ? 
                  `We couldn't find any committees matching "${searchTerm}". Try adjusting your search terms or browse all committees.` : 
                  'No committees are currently available. Check back later for updates.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Pagination */}
        {!isLoading && filteredAndSortedCommittees.length > 0 && committeesData && committeesData.last_page > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
              <nav className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => committeesData.prev_page_url && setCurrentPage(currentPage - 1)}
                  disabled={!committeesData.prev_page_url}
                  className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    committeesData.prev_page_url
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                {committeesData.links
                  .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                  .map((link, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(parseInt(link.label))}
                      className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        link.active
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}

                {/* Next Button */}
                <button
                  onClick={() => committeesData.next_page_url && setCurrentPage(currentPage + 1)}
                  disabled={!committeesData.next_page_url}
                  className={`flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    committeesData.next_page_url
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </nav>
            </div>
          </div>
        )}
      </main>

      {/* Committee Details Modal */}
      {isModalOpen && <CommitteeModal />}
      
      {/* Custom Styles */}
    
    </div>
  );
}