import React from "react"
import {  Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Committee } from "./CommitteeTable"

// Controls Component
interface ControlsProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedDepartment: string,
  refetch: () => void
  selectedAction: { select: string; item: Committee | null }
setSelectedAction: (action: {select: string; item: Committee| null}) => void;
  setSelectedDepartment: (department: string) => void
  departments: { department: string; faculties: string[] }[]
}

const CommitteeControls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  setSelectedAction
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search committee members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

     



      <div className=" flex  items-center">
         <Button onClick={()=>{
            setSelectedAction({
                select:"add",
                item:null
            })
         }} className=" cursor-pointer bg-blue-700 ">
             <Plus/> Committee
         </Button>
      </div>
    </div>
  </div>
)

export default CommitteeControls;