import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  FileText, 
  Leaf, 
  Eye,
  Clock,
  Badge,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectActions } from '../page';
import Image from 'next/image';

interface ApplicationViewProps{
    seletActions:SelectActions,
    setSelectActions:React.Dispatch<React.SetStateAction<SelectActions>>
}
export type Member = {
  name: string;
  email: string;
  phone: string;
  photo: string;
};

const ApplicantViewComponent = ({seletActions, setSelectActions}:ApplicationViewProps) => {

 console.log(seletActions,"hello world");
 const { selectedApplicants } = seletActions;

  // const { selectedApplicants } = applicantDetails;
  // const { application } = selectedApplicants;
   
  const formatDate = (dateString:string |undefined) => {
      if(dateString){
         return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
      }else {
        return ""
      }
  };

 
  return (
    <div className="min-h-screen fixed inset-0 bg-black bg-opacity-50 flex notices-center justify-center z-50  scroll-auto left-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div style={{
        scrollbarWidth:"none",
        overflow:"scroll",
        msOverflowStyle:"none"
      }} className="p-4 bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto  mx-auto ">
        {/* Header */}
        <div className="mb-8 flex  justify-between items-center gap-1 flex-wrap">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Eye className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Applicant Details</h1>
              <p className="text-gray-600 mt-1">Viewing application information</p>
            </div>
          </div>
          <div>
            <Button className=' cursor-pointer bg-blue-600 hover:bg-blue-700' onClick={()=>{
               setSelectActions({
                selectedApplicants:null,
                actionType:''
               })  
            }}><X/></Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Applicant Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                <div className="flex items-start gap-6">
                  <div className="relative">
                     {
                       selectedApplicants?.photo ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/applicants/${selectedApplicants?.photo}`}
                          alt={selectedApplicants?.name}
                          width={100}
                          height={100}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className='relative'>
                          <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-400 rounded-full p-2">
                      <Badge className="w-4 h-4 text-white" />
                    </div>
                        </div>
                      )
                     }
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedApplicants?.name}</h2>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                        {selectedApplicants?.applicants_type}
                      </span>
                      {/* <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                        ID: {selectedApplicants?.id}
                      </span> */}
                    </div>
                    <div className="flex flex-col gap-2 text-white/90">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{selectedApplicants?.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{ selectedApplicants?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Project Title</label>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="text-lg font-semibold text-gray-900 capitalize">
                          {selectedApplicants?.application?.title}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Application ID</label>
                      {/* <span className="text-lg font-semibold text-gray-900">
                        #{application.id}
                      </span> */}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Description</label>
                    <p className="text-gray-900 font-medium capitalize">{selectedApplicants?.application?.description}</p>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Created</span>
                    </div>
                    <p className="text-sm text-gray-900">{formatDate(selectedApplicants?.created_at)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Last Updated</span>
                    </div>
                    <p className="text-sm text-gray-900">{formatDate(selectedApplicants?.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Team Members</h3>
                    <p className="text-white/80 text-sm">{JSON.parse(selectedApplicants?.members || '[]').length} member(s)</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {JSON.parse(selectedApplicants?.members || '[]').map((member:Member, index:number) => (
                  <div key={index} className="border-b border-gray-100 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex items-start gap-4">

                      {
                      member?.photo ?(<Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/teamMembers/${member?.photo}`} alt={member.name} width={100} height={100} className="w-24 h-24 rounded-full object-cover" />):

                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                        {/* <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/teamMembers/${member?.photo}`} alt={member.name} width={100} height={100} /> */}
                      </div>
                      }
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{member?.name}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="break-all">{member?.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{member?.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {JSON.parse(selectedApplicants?.members || '[]').length + 1}
                      </div>
                      <div className="text-sm text-gray-600">Total Team Size</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantViewComponent;