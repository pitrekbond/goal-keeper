import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import { TASKS_PER_PAGE } from "../../utils/constants";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Pagination({ count, pageCount, currentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  const adjustedPageCount = Math.max(pageCount, 1);

  function handleNextPage() {
    const next =
      currentPage === adjustedPageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function handlePreviousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", previous);
    setSearchParams(searchParams);
  }

  if (adjustedPageCount <= 1) return null;

  return (
    <div
      className={`mr-4 my-4 flex justify-end ${
        isDarkMode ? "text-white" : "text-gray-700"
      } `}
    >
      <span className="mr-6 p-1">
        Showing{" "}
        {
          <span className="font-semibold">
            {(currentPage - 1) * TASKS_PER_PAGE + 1}
          </span>
        }{" "}
        to{" "}
        {
          <span className="font-semibold">
            {currentPage === pageCount ? count : currentPage * TASKS_PER_PAGE}
          </span>
        }{" "}
        of {<span className="font-semibold">{count}</span>} results
      </span>
      <div className="flex gap-2">
        <button
          className={`flex pr-2 items-center box-sizing:border-box pl-2 rounded-md transition-colors ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-accent-500 hover:text-white"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-6 h-6" />
          <span>Previous</span>
        </button>
        <button
          className={`flex items-center box-sizing:border-box py-1 pl-2 rounded-md transition-colors ${
            currentPage === pageCount
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-accent-500 hover:text-white"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
