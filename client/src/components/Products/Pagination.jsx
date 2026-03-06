import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded glass-card hover:glow-on-hover animate-smooth"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded ${
              currentPage === pageNum
                ? "bg-primary text-primary-foreground font-semibold"
                : "glass-card hover:glow-on-hover"
            } animate-smooth`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded glass-card hover:glow-on-hover animate-smooth"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
};

export default Pagination;