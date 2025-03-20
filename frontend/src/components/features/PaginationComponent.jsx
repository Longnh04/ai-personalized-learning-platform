import React from "react";
import "../../styles/Features/Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${
            i === currentPage ? "active" : ""
          }`}
          onClick={() => onPageChange(i)} // Gọi hàm onPageChange khi click vào trang
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)} // Chuyển về trang trước
        disabled={currentPage === 1} // Vô hiệu hóa nếu ở trang đầu
      >
        &laquo; Prev
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)} // Chuyển sang trang sau
        disabled={currentPage === totalPages} // Vô hiệu hóa nếu ở trang cuối
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
