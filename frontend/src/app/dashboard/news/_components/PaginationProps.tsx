import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {  MockNewsDataType } from '../page'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  mockNewsData: MockNewsDataType
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, mockNewsData }) => (
  <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <span>Showing 1 to {mockNewsData.data.length} of {mockNewsData.total} results</span>
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
        {currentPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
)

export default Pagination
