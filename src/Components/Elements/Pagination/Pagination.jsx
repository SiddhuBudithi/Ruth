import React from "react";
import "./Pagination.css";

const Pagination = ({ totalProducts, productsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-item"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; Previous
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      <button
        className="page-item"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
