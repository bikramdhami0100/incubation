import React from 'react';
import { Users, Mail, Crown, Calendar, Edit3, X } from 'lucide-react';
import { Committee, CommitteeMember } from '../page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ViewCommitteeDataProps {
  data: Committee;
  setSelectedAction: React.Dispatch<React.SetStateAction<{ select: string; item: Committee | null }>>;
}

const ViewCommitteeData = ({ data, setSelectedAction }: ViewCommitteeDataProps) => {
  const members = JSON.parse(data?.committee_members);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="fixed inset-0 z-30 bg-gray-100 p-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold capitalize text-slate-800">{data.name} Committee</h1>
              <p className="text-sm text-slate-500">ID: #{data.id}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-slate-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> {formatDate(data.created_at)}
            </p>
            <Button onClick={() => setSelectedAction({ select: '', item: null })} variant="outline" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-start space-x-2">
            <Edit3 className="w-5 h-5 text-slate-500 mt-1" />
            <div className='w-full'>
              <h2 className="font-semibold text-slate-700 mb-2">Description</h2>
              <p className="text-slate-600 text-wrap   whitespace-pre-line break-words text-sm">{data.description}</p>
            </div>
          </div>
        </div>

        {/* Committee Members */}
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4">
            <h2 className="text-white text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Members ({members.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Photo</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member: CommitteeMember, index: number) => (
                  <tr key={index} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      {member.photo ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${member.photo}`}
                          alt={member.name}
                          height={40}
                          width={40}
                          className="rounded-full border"
                        />
                      ) : (
                        <div className={`w-10 h-10 bg-gradient-to-r ${getGradientClass(index)} text-white flex items-center justify-center rounded-full`}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold capitalize">{member.name}</div>
                        <div className="text-xs text-slate-500">Member #{index + 1}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-amber-600">
                      <div className="flex items-center">
                        <Crown className="w-4 h-4 mr-1 text-amber-500" />
                        {member.position}
                      </div>
                    </td>
                    <td className="px-4 py-3 break-all">
                      <div className="flex items-center text-slate-600">
                        <Mail className="w-4 h-4 mr-1" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center text-sm text-slate-500">
                        <div className={`w-2 h-2 rounded-full mr-2 ${member.photo ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                        {member.photo ? 'Available' : 'No Photo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-slate-600 flex justify-between mt-4 pt-4 border-t">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Last Updated: {formatDate(data.updated_at)}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Total Members: {members.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCommitteeData;
