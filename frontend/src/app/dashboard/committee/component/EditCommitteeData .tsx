"use client"
import React, { useState, useEffect } from 'react';
import { Users, Calendar, Edit3, User, X, Plus, Trash2, Save, Upload, Hash, Loader } from 'lucide-react';
import { getCookie } from '@/app/fwucontext/CustomCookies';
import axios from 'axios';
import { toast } from 'sonner';

// Define types
interface CommitteeMember {
  name: string;
  email: string;
  position: string;
  hierarchy: number;
  photo: string; // URL/path of existing photo
}

interface Committee {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  committee_members: string; // JSON string of CommitteeMember[]
}

interface EditCommitteeDataProps {
  data: Committee;
  setSelectedAction: React.Dispatch<React.SetStateAction<{select: string, item: Committee | null}>>;
  refetch: () => void
}

const EditCommitteeData = ({ data, setSelectedAction ,refetch}: EditCommitteeDataProps) => {
  const [formData, setFormData] = useState<{
    committeeName: string;
    committeeDescription: string;
    teamMembers: CommitteeMember[];
  }>({
    committeeName: '',
    committeeDescription: '',
    teamMembers: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [teamPhotos, setTeamPhotos] = useState<{[key: number]: File}>({});
 

  // Initialize form with existing data
  useEffect(() => {
    if (data) {
      try {
        const membersFromDB =JSON.parse(data.committee_members || "[]");
        const membersWithHierarchy = membersFromDB?.map((member: CommitteeMember, index: number) => ({
          ...member,
          hierarchy: member.hierarchy || index + 1,
        }));

        setFormData({
          committeeName: data.name,
          committeeDescription: data.description,
          teamMembers: membersWithHierarchy
        });
      } catch (error) {
        console.error('Error parsing committee members:', error);
        toast.error('Failed to load committee member data.');
        setFormData({
          committeeName: data.name,
          committeeDescription: data.description,
          teamMembers: []
        });
      }
    }
  }, [data]);

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600'
    ];
    return gradients[index % gradients.length];
  };

  const handleInputChange = (field: 'committeeName' | 'committeeDescription', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMemberChange = (index: number, field: keyof CommitteeMember, value: string | number) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addMember = () => {
    setFormData(prev => {
      const nextHierarchy = prev.teamMembers.length > 0
        ? Math.max(0, ...prev.teamMembers.map(m => m.hierarchy)) + 1
        : 1;
      return {
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { name: '', email: '', position: '', hierarchy: nextHierarchy, photo: '' }
        ]
      };
    });
  };

  const removeMember = (indexToRemove: number) => {
    // Remove member from form data
    const updatedMembers = formData.teamMembers.filter((_, i) => i !== indexToRemove);
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));

    // Create a new photos object and re-index it correctly
    const newTeamPhotos: { [key: number]: File } = {};
    Object.entries(teamPhotos).forEach(([photoIndexStr, file]) => {
      const photoIndex = parseInt(photoIndexStr, 10);
      if (photoIndex < indexToRemove) {
        newTeamPhotos[photoIndex] = file; // Keep photos before the removed index
      } else if (photoIndex > indexToRemove) {
        newTeamPhotos[photoIndex - 1] = file; // Shift down the index for photos after the removed one
      }
      // Photo at the removed index is implicitly deleted
    });
    setTeamPhotos(newTeamPhotos);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.committeeName.trim()) newErrors.committeeName = 'Committee name is required';
    if (!formData.committeeDescription.trim()) newErrors.committeeDescription = 'Description is required';
    if (formData.teamMembers.length === 0) newErrors.teamMembers = 'At least one member is required';

    const hierarchies = new Set<number>();
    formData.teamMembers.forEach((member, index) => {
      if (!member.name.trim()) newErrors[`member_${index}_name`] = 'Member name is required';
      if (!member.email.trim()) newErrors[`member_${index}_email`] = 'Member email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) newErrors[`member_${index}_email`] = 'Invalid email format';
      if (!member.position.trim()) newErrors[`member_${index}_position`] = 'Member position is required';
      
      if (!member.hierarchy || member.hierarchy <= 0) {
        newErrors[`member_${index}_hierarchy`] = 'Hierarchy must be a positive number.';
      } else if (hierarchies.has(member.hierarchy)) {
        newErrors[`member_${index}_hierarchy`] = 'Hierarchy number must be unique.';
      }
      if (member.hierarchy > 0) {
        hierarchies.add(member.hierarchy);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsLoading(true);
    
    try {
      const submitFormData = new FormData();
      
      submitFormData.append("name", formData.committeeName);
      submitFormData.append("description", formData.committeeDescription);
      submitFormData.append("_method", "PUT");

      const teamMembersData = formData?.teamMembers.map(member => ({
        name: member.name,
        email: member.email,
        position: member.position,
        hierarchy: member.hierarchy,
        photo: member.photo, // Send existing photo path; backend will overwrite if new photo is uploaded
      }));
      
      submitFormData.append("committee_members", JSON.stringify(teamMembersData));
      
      Object.entries(teamPhotos).forEach(([index, photoFile]) => {
        if (photoFile) {
          submitFormData.append(`member_photos[]`, photoFile);
          submitFormData.append(`member_photo_indexes[]`, index);
        }
      });

      // console.log('Submitting data:');
      // for (const pair of submitFormData.entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }
      
      const token = getCookie("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/committee/${data.id}`,
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      console.log(response?.data, "this is response");

      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Committee updated successfully!");
        setTimeout(() => setSelectedAction({ select: "", item: null }), 1500);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
   
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
      refetch();
    }
  };

  const handleFileUpload = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (e.g., JPG, PNG, GIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB.');
      return;
    }
    setTeamPhotos(prev => ({ ...prev, [index]: file }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <form onSubmit={handleSubmit} className="w-[90vw] h-[90vh] lg:w-[80vw] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 bg-white rounded-t-2xl shadow-md p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Edit Committee</h1>
                <p className="text-slate-600 text-sm mt-1 flex items-center">
                  <Hash className="w-4 h-4 mr-1" />ID: {data.id}
                </p>
              </div>
            </div>
            <button type="button" className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setSelectedAction({ select: "", item: null })}>
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
              <h2 className="text-xl font-semibold text-slate-800">Basic Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Committee Name</label>
                <input type="text" value={formData.committeeName} onChange={(e) => handleInputChange('committeeName', e.target.value)} className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.committeeName ? 'border-red-500' : 'border-slate-200'}`} placeholder="Enter committee name" />
                {errors.committeeName && <p className="text-red-500 text-sm mt-1">{errors.committeeName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea value={formData.committeeDescription} onChange={(e) => handleInputChange('committeeDescription', e.target.value)} rows={4} className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${errors.committeeDescription ? 'border-red-500' : 'border-slate-200'}`} placeholder="Enter committee description" />
                {errors.committeeDescription && <p className="text-red-500 text-sm mt-1">{errors.committeeDescription}</p>}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white text-slate-800 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Committee Members ({formData.teamMembers.length})
                  </h2>
                </div>
                <button type="button" onClick={addMember} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>
              {errors.teamMembers && <p className="text-red-300 text-sm mt-2">{errors.teamMembers}</p>}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div className={`h-16 bg-gradient-to-r ${getGradientClass(index)} flex items-center justify-between px-4`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-slate-800">{index + 1}</div>
                        <div className="flex items-center space-x-2"><User className="w-4 h-4 text-white" /><span className="text-white font-semibold">Member Details</span></div>
                      </div>
                      <button type="button" onClick={() => removeMember(index)} className="p-1 hover:bg-white/20 rounded-full transition-colors"><Trash2 className="w-4 h-4 text-white" /></button>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Hierarchy / Order</label>
                        <input type="number" value={member.hierarchy || ''} onChange={(e) => handleMemberChange(index, 'hierarchy', parseInt(e.target.value, 10) || 0)} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors[`member_${index}_hierarchy`] ? 'border-red-500' : 'border-slate-200'}`} placeholder="e.g., 1 for first" min="1" />
                        {errors[`member_${index}_hierarchy`] && <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_hierarchy`]}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input type="text" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors[`member_${index}_name`] ? 'border-red-500' : 'border-slate-200'}`} placeholder="Enter member name" />
                        {errors[`member_${index}_name`] && <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_name`]}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input type="email" value={member.email} onChange={(e) => handleMemberChange(index, 'email', e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors[`member_${index}_email`] ? 'border-red-500' : 'border-slate-200'}`} placeholder="Enter member email" />
                        {errors[`member_${index}_email`] && <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_email`]}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
                        <input type="text" value={member.position} onChange={(e) => handleMemberChange(index, 'position', e.target.value)} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors[`member_${index}_position`] ? 'border-red-500' : 'border-slate-200'}`} placeholder="Enter member position" />
                        {errors[`member_${index}_position`] && <p className="text-red-500 text-xs mt-1">{errors[`member_${index}_position`]}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Photo</label>
                        <div className="flex items-center space-x-3">
                          <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { handleFileUpload(index, file); } }} className="hidden" id={`photo-${index}`} />
                          <label htmlFor={`photo-${index}`} className="cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 flex items-center space-x-2 transition-colors text-sm">
                            <Upload className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-700">Choose Photo</span>
                          </label>
                          {teamPhotos[index] ? (
                            <span className="text-xs text-green-600 font-semibold">✓ New photo selected</span>
                          ) : member.photo ? (
                            <span className="text-xs text-slate-500">✓ Existing photo</span>
                          ) : null }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex-shrink-0 bg-white rounded-b-2xl shadow-md p-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last Updated: {new Date(data.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setSelectedAction({ select: "", item: null })} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCommitteeData;