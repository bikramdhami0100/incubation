
// import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
}
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems 
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center justify-between">
    <div className="text-sm text-gray-700">
      Showing <span className="font-medium">{Math.min((currentPage - 1) * 10 + 1, totalItems)}</span> to{' '}
      <span className="font-medium">{Math.min(currentPage * 10, totalItems)}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="px-3 py-2 text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
)

export default Pagination