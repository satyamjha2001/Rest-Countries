import "./Pagination.css";

export default function Pagination({
  totalCountries,
  countriesPerPage,
  currentPage,
  setCurrentPage,
}) {
    //   const pages = [];
     const totalPages = Math.ceil(totalCountries / countriesPerPage);
     const maxPageNumbersToShow = 3; // Number of page buttons to display

     // Calculate the range of page numbers to display
     const startPage = Math.max(
       1,
       Math.min(
         currentPage - Math.floor(maxPageNumbersToShow / 2),
         totalPages - maxPageNumbersToShow + 1
       )
     );
     const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

     // Generate the pages array for rendering
     const pages = Array.from(
       { length: endPage - startPage + 1 },
       (_, i) => startPage + i
     );
//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(i);
//   }
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}
