'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';


interface DashboardPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function DashboardPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: DashboardPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const renderPageLinks = () => {
    const pages = [];
    const showMax = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + showMax - 1);
    
    if (endPage - startPage < showMax - 1) {
      startPage = Math.max(1, endPage - showMax + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key="1">
          <PaginationLink 
            className="cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => onPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) pages.push(<PaginationEllipsis key="e1" className="text-slate-300" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={`cursor-pointer w-[40px] h-[40px] rounded-md transition-all ${
              currentPage === i 
                ? 'bg-[#146EB4] text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i === 1 ? '1' : String(i)}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<PaginationEllipsis key="e2" className="text-gray-300" />);
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            className="cursor-pointer text-gray-500 hover:bg-gray-100 w-[40px] h-[40px] rounded-md"
            onClick={() => onPageChange(totalPages)}
          >
            {String(totalPages)}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="w-full flex justify-center py-6">
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button 
              className={`flex items-center gap-2 px-3 py-1 text-sm font-medium border border-gray-200 rounded-md transition-all ${
                currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
               Previous
            </button>
          </PaginationItem>
          
          <div className="flex gap-1 mx-2">
            {renderPageLinks()}
          </div>
          
          <PaginationItem>
             <button 
              className={`flex items-center gap-2 px-3 py-1 text-sm font-medium border border-gray-200 rounded-md transition-all ${
                currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
               Next
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
