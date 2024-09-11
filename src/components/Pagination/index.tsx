import React from 'react';
import './styles.scss'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        className="pagination-button" 
        onClick={handlePrevClick} 
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span className="pagination-current">{currentPage} de {totalPages}</span>

      <button 
        className="pagination-button" 
        onClick={handleNextClick} 
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;