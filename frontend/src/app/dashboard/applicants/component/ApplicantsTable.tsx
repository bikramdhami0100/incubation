"use client";
import {
  Calendar,
  Eye,
  Mail,
  Phone,
  Trash2,
  // User,
  // UserCheck,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Applicant } from "../types/ApplicantsTypes";
import { SelectActions } from "../page";
interface ApplicantsTableProps {
  applicants: Applicant[];
  seletActions: SelectActions;
  setSeletActions: React.Dispatch<React.SetStateAction<SelectActions>>;
}

const ApplicantsTable = ({
  applicants,
  setSeletActions,
}: ApplicantsTableProps) => {
  // interface FormatDateOptions {
  //     year: 'numeric' | '2-digit';
  //     month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  //     day: 'numeric' | '2-digit';
  // }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const parseMembers = (membersString: string): unknown[] => {
    try {
      return JSON.parse(membersString);
    } catch {
      return [];
    }
  };

 

  return (
    <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200 z-0">
      <div  className="w-full">
        <div className="overflow-auto max-w-full">

        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              {/* <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th> */}
             
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody  className="bg-white divide-y divide-gray-200">
            {applicants?.map((applicant) => {
              const members = parseMembers(applicant.members);
              const teamSize = members.length + 1; // +1 for the main applicant

              return (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {applicant.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {applicant.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {applicant.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {applicant.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                 
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      {teamSize} member{teamSize > 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(applicant.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex">
                      <button
                        onClick={() => {
                          //
                          console.log("hello world");
                          setSeletActions({
                            selectedApplicants: applicant,
                            actionType: "view",
                          });
                        }}
                        className="text-blue-600 cursor-pointer hover:text-blue-900 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {/* <button className="text-green-600 cursor-pointer hover:text-green-900 p-1 rounded">
                        <UserCheck className="h-4 w-4" />
                      </button> */}
                      <button
                        onClick={() => {
                          setSeletActions({
                            selectedApplicants: applicant,
                            actionType: "delete",
                          });
                        }}
                        className="text-gray-600 cursor-pointer hover:text-gray-900 p-1 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex w-full items-center flex-wrap gap-2">
                      {/* Approved Button */}
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to approve this applicant?"
                            )
                          ) {
                            setSeletActions({
                              selectedApplicants: applicant,
                              actionType: "approved",
                            });
                          }
                        }}
                        className="bg-gradient-to-r w-[80px] cursor-pointer h-8 bg-green-300 to-green-600  hover:bg-green-200 transition duration-200 px-3 py-1 rounded-md text-xs font-semibold shadow-sm "
                      >
                        Approved {applicant?.status=="approved" ? "✓" : ""}
                      </button>

                      {/* Pending Button */}
                      <button
                        onClick={() => {
                          if (confirm("Mark this applicant as pending?")) {
                            setSeletActions({
                              selectedApplicants: applicant,
                              actionType: "pending",
                            });
                          }
                        }}
                      className="bg-gradient-to-r w-[80px] cursor-pointer h-8 bg-yellow-300 to-yellow-600  hover:bg-yellow-200 transition duration-200 px-3 py-1 rounded-md text-xs font-semibold shadow-sm "
                      >
                        Pending {applicant?.status=="pending" ? "✓" : ""}
                      </button>

                      {/* Rejected Button */}
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to reject this applicant?"
                            )
                          ) {
                            setSeletActions({
                              selectedApplicants: applicant,
                              actionType: "rejected",
                            });
                          }
                        }}

                        className="bg-gradient-to-r w-[80px] cursor-pointer h-8 bg-red-300 to-red-600  hover:bg-red-200 transition duration-200 px-3 py-1 rounded-md text-xs font-semibold shadow-sm "
                      >
                        Rejected {applicant?.status=="rejected" ? "✓" : ""}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsTable;
