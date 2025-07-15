"use client"
import { useState, useEffect } from 'react';
import { Committee, CommitteeMember } from '../page';
import Image from 'next/image';
import { Calendar ,Eye} from 'lucide-react';
interface CommitteeCardProps {
  committee: Committee; // CORRECTED: This should be the full Committee object
  viewMode: "grid" | "list"; // CORRECTED: Use a more specific union type
  onViewDetails: (committee: Committee) => void; // CORRECTED: Be specific with the parameter type
}
const CommitteeCard = ({ committee, viewMode, onViewDetails }:CommitteeCardProps) => {

 const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
     const parseCommitteeMembers = (
    members: string | CommitteeMember[]
  ): CommitteeMember[] => {
    if (typeof members === "string") {
      try {
        return JSON.parse(members);
      } catch {
        return [];
      }
    }
    return members || [];
  };
  const members = parseCommitteeMembers(committee.committee_members);
  
  // Get available member photos
  const memberPhotos = members.filter(member => member.photo && member.photo !== '');
  const hasPhotos = memberPhotos.length > 0;
   console.log(memberPhotos,"member photos")
   console.log(hasPhotos,"hash phostos")
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 168) {
    // 7 days
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
  // Auto-swap photos every 3 seconds
  useEffect(() => {
    if (hasPhotos && memberPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => 
          (prevIndex + 1) % memberPhotos.length
        );
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [hasPhotos, memberPhotos.length]);
//    console.log( process.env.NEXT_PUBLIC_IMAGE_BASE_URL+"/notices/"+ memberPhotos[currentPhotoIndex].photo)
  // Generate random gradient colors for cards without photos
  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-blue-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-cyan-600',
      'from-indigo-500 to-purple-600',
      'from-pink-500 to-rose-600',
      'from-yellow-500 to-orange-600',
      'from-emerald-500 to-teal-600',
      'from-violet-500 to-purple-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };
  const getAvatarColor = (index: number) => {
  const colors = [
    "bg-gradient-to-br from-blue-600 to-blue-800", // Corporate blue
    "bg-gradient-to-br from-green-600 to-emerald-800", // Calm green
    "bg-gradient-to-br from-indigo-600 to-indigo-800", // Deep indigo
    "bg-gradient-to-br from-purple-600 to-fuchsia-800", // Elegant purple
    "bg-gradient-to-br from-teal-600 to-cyan-800", // Cool teal
    "bg-gradient-to-br from-rose-600 to-rose-800", // Subtle rose
    "bg-gradient-to-br from-slate-600 to-slate-800", // Neutral slate
    "bg-gradient-to-br from-gray-600 to-zinc-800", // Professional gray
    "bg-gradient-to-br from-red-600 to-rose-700", // Strong red (for alerts or decisions)
    "bg-gradient-to-br from-violet-600 to-indigo-700", // Balanced violet
    "bg-gradient-to-br from-cyan-600 to-blue-800", // Fresh cyan
    "bg-gradient-to-br from-emerald-600 to-green-800", // Trustworthy emerald
  ];

  return colors[index % colors.length];
};
  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className={`p-8 md:w-80 flex-shrink-0 relative overflow-hidden ${
            hasPhotos ? '' : `bg-gradient-to-br ${getRandomGradient()}`
          }`}>
            {/* Photo Background with Overlay */}
            {hasPhotos && (
              <>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${memberPhotos[currentPhotoIndex].photo})`
                  }}
                />
                <div className="absolute inset-0 bg-black/60 bg-opacity-50"></div>
                
                {/* Photo indicators */}
                {memberPhotos.length > 1 && (
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {memberPhotos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentPhotoIndex ? 'bg-blue-600' : 'bg-white bg-opacity-40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            
            {/* Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl font-bold mb-4">{committee.name}</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className=" border bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  {members.length} members
                </div>
                <div className=" border bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                   {getRelativeTime(committee.updated_at)}
                </div>
              </div>
              
              {/* Member Avatars */}
              <div className="flex -space-x-2">
                {members.slice(0, 5).map((member, index) => (
                  <div key={index} className="relative">
                    {member.photo ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${member.photo}`}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(member.photoIndex)} flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg`}
                        title={member.name}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}
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
                onClick={() => onViewDetails(committee)}
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
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden">
      {/* Card Header */}
      <div onClick={()=>{
        if(hasPhotos && typeof window !== 'undefined'){
          window.open(`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${memberPhotos[currentPhotoIndex].photo}`, '_blank');
        }
      }} className={`p-8 text-white relative overflow-hidden cursor-pointer ${
        hasPhotos ? '' : `bg-gradient-to-br ${getRandomGradient()}`
      }`}>
        {/* Photo Background with Overlay */}
        {hasPhotos && (
          <>
            <div 
              className="absolute  bg-cover bg-center   inset-0   transition-all duration-1000 ease-in-out"
              style={{
       
                backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${memberPhotos[currentPhotoIndex].photo})`
              }}
            />
            <div className="absolute inset-0 bg-black/60 bg-opacity-50"></div>
            
            {/* Photo indicators */}
            {memberPhotos.length > 1 && (
              <div className="absolute top-4 right-4 flex space-x-1">
                {memberPhotos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPhotoIndex ? 'bg-blue-600' : 'bg-white bg-opacity-40'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Decorative elements for gradient backgrounds */}
        {!hasPhotos && (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
          </>
        )}
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-bold leading-tight flex-1 pr-4">
              {committee.name}
            </h3>
            <div className=" border  bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
              {members.length} members
            </div>
          </div>
          
          {/* Member Preview and Time */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* First member photo/avatar */}
              {members.length > 0 && (
                <div className="relative">
                  {members[0].photo ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${members[0].photo}`}
                        alt={members[0].name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(members[0].photoIndex)} flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg`}>
                      {getInitials(members[0].name)}
                    </div>
                  )}
                </div>
              )}
              
              {/* Member count indicator */}
              {members.length > 1 && (
                <div className="text-sm  border bg-opacity-20 px-2 py-1 rounded-full">
                  +{members.length - 1} more
                </div>
              )}
            </div>
            
            <div className="text-sm  border  bg-opacity-20 px-2 py-1 rounded-full">
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
            onClick={() => onViewDetails(committee)}
            className="group cursor-pointer inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;