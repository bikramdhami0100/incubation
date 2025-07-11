import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react"
interface PaginationControlsProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, lastPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    if (lastPage <= maxPagesToShow + 2) {
      for (let i = 1; i <= lastPage; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > half + 2) pageNumbers.push('...');
      
      let start = Math.max(2, currentPage - half);
      let end = Math.min(lastPage - 1, currentPage + half);

      if (currentPage <= half + 1) end = maxPagesToShow - 1;
      if (currentPage >= lastPage - half) start = lastPage - maxPagesToShow + 2;

      for (let i = start; i <= end; i++) pageNumbers.push(i);

      if (currentPage < lastPage - half - 1) pageNumbers.push('...');
      pageNumbers.push(lastPage);
    }
    return pageNumbers;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
        <button onClick={handleNext} disabled={currentPage === lastPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div><p className="text-sm text-gray-700">Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{lastPage}</span></p></div>
        <div>
          <div className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"><span className="sr-only">Previous</span><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button key={index} onClick={() => onPageChange(page)} aria-current={currentPage === page ? 'page' : undefined} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}>{page}</button>
              ) : (<span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>)
            )}
            <button onClick={handleNext} disabled={currentPage === lastPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"><span className="sr-only">Next</span><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PaginationControls;