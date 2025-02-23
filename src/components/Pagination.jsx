import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Pagination({ currentPage, setSearchParams }) {
  const { status } = useSelector((state) => state.products);
  const totalPages = 3;

  const changePage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="py-4 flex justify-center items-center">
      {status !== "loading" && (
        <div className="flex items-center space-x-2 bg-white shadow-md rounded-full px-4 py-2 border">

          <button
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full flex items-center justify-center text-sm
              ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-blue-600 hover:text-white"}`}
          >
            <FaAngleLeft />
          </button>

          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => changePage(pageNum)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300
                    ${currentPage === pageNum ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 hover:bg-blue-600 hover:text-white"}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full flex items-center justify-center text-sm
              ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-blue-600 hover:text-white"}`}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
}
