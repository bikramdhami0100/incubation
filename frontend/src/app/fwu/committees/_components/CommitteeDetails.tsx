import React from 'react';
import { Users,  Calendar, Clock, User, Crown } from 'lucide-react';
import Image from 'next/image';

const CommitteeDetails = () => {
  const committeeData = {
    id: 3,
    created_at: "2025-06-26T03:25:34.000000Z",
    updated_at: "2025-06-26T03:25:34.000000Z",
    name: "Research",
    description: "Research committee handles academic and field-related research activities. It helps guide student and faculty innovations effectively.",
    committee_members: [
      {
        name: "Ram",
        email: "bepan88673@dalebig.com",
        position: "member",
        photoIndex: 0,
        photo: "rdha8M4gbxZR2V0jnSVFif7AlNCy1u0TDbaqmFw8.jpg"
      },
      {
        name: "Sham",
        email: "bikramdhami334@gmail.com",
        position: "chairperson",
        photoIndex: 1,
        photo: "hxTfASOXKMiOXblGO0WDzw5omWNTMpJahKEogVzr.png"
      }
    ]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPositionIcon = (position: string) => {
    return position.toLowerCase() === 'chairperson' ? <Crown className="w-4 h-4 text-yellow-500" /> : <User className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Committee Header */}
        <div className="bg-white rounded-xl p-6 shadow border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{committeeData.name} Committee</h1>
              <p className="text-sm text-gray-500">Committee ID: #{committeeData.id}</p>
            </div>
            <div className="text-sm text-gray-600 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(committeeData.created_at)}</span>
            </div>
          </div>
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {committeeData.description}
            </p>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-xl p-6 shadow border">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-500" />
              Members ({committeeData.committee_members.length})
            </h2>
          </div>

          <div className="space-y-4">
            {committeeData.committee_members.map((member, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                  {member.photo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}committees/${member.photo}`}
                      alt={`${member.name}'s photo`}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-white bg-indigo-400 font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-800 capitalize flex items-center gap-2">
                    {member.name}
                    {getPositionIcon(member.position)}
                  </h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                  <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeDetails;
