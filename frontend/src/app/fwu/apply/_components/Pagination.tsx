"use client"
import React from "react";
import { PaginatedData } from  "@/app/dashboard/applicants/types/ApplicantsTypes";
import { Button } from "@/components/ui/button";
interface PaginationProps {
  applicantsData: PaginatedData;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ applicantsData, currentPage, totalPages, onPageChange }:PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white p-6 rounded-xl border  border-gray-200 m-6">
      <div className="flex items-center justify-between flex-wrap">
        <div className="text-sm text-gray-700">
          Showing {applicantsData.from} to {applicantsData.to} of {applicantsData.total} applicants
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          
          {generatePageNumbers().map((page, index) => (
            <Button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 cursor-pointer text-sm font-medium rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </Button>
          ))}
          
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            id="application-form"
            className="px-3  cursor-pointer py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;