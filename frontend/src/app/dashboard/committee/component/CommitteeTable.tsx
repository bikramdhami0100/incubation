import { Calendar, Crown, Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";

export interface CommitteeMember {
  name: string;
  email: string;
  position: string;
  photo?: string | null;
  photoIndex?: number | null;
}

export interface Committee {
  id: number;
  name: string;
  description: string;
  committee_members: string; // JSON string
  created_at: string;
  updated_at: string;
}
// Committee Table Component
interface CommitteeTableProps {
  committees: Committee[];
  onEdit: (committee: Committee) => void;
  onDelete: (committee: Committee) => void;
  onView: (committee: Committee) => void;
}
// Committee Members List Component
interface CommitteeMembersListProps {
  members: CommitteeMember[];
  maxDisplay?: number;
}
const CommitteeMembersList: React.FC<CommitteeMembersListProps> = ({
  members,
  maxDisplay = 3,
}) => {
  const additionalCount = Math.max(0, members.length - maxDisplay);

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {additionalCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="text-gray-600 font-medium text-xs">
              +{additionalCount}
            </span>
          </div>
        )}
      </div>
      <span className="ml-3 text-sm text-gray-600">
        {members.length} member{members.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
};

const CommitteeTable: React.FC<CommitteeTableProps> = ({
  committees,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Committee Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {committees?.map((committee) => {
             
              const members = JSON.parse(committee.committee_members);
              // console.log(members);
              return (
                <tr
                  key={committee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {/* <Crown className="w-5 h-5 text-white" /> */}
                        {members?.length > 0 ? (
                          <Image
                            // fill
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/committees/${members[0].photo}`}
                            alt={members[0].name}
                            height={32}
                            width={32}
                            className=" h-[40px] w-[40px] object-cover rounded-[20px]"
                          />
                        ) : (
                          <Crown className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {committee.name}
                        </div>
                        {/* <div className="text-sm text-gray-500">
                          ID: {committee.id}
                        </div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <p className="line-clamp-2">{committee.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CommitteeMembersList members={members} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(committee.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(committee)}
                        className="p-2 cursor-pointer rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(committee)}
                        className="p-2 cursor-pointer rounded-lg hover:bg-green-50 text-green-600 hover:text-green-700 transition-colors"
                        title="Edit Committee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(committee)}
                        className="p-2 cursor-pointer rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                        title="Delete Committee"
                      >
                        <Trash2 className="w-4 h-4" />
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
  );
};
export default CommitteeTable;
