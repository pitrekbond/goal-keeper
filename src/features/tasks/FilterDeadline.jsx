import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function FilterDeadline() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  function handleClick(value) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex-col items-end max-[640px]:text-xs">
      <div className={`text-center ${isDarkMode && "text-white"}`}>
        Deadline
      </div>
      <div
        className={` ${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
        } max-[640px]:grid max-[640px]:grid-cols-3 max-[640px]:grid-rows-2 flex gap-1 md:gap-2  px-1 py-1 rounded-md border border-gray-200 shadow-sm`}
      >
        <FilterButton
          onClick={() => handleClick("today")}
          isActive={searchParams.get("filter") === "today"}
        >
          Today
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("tomorrow")}
          isActive={searchParams.get("filter") === "tomorrow"}
        >
          Tomorrow
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("thisWeek")}
          isActive={searchParams.get("filter") === "thisWeek"}
        >
          In 2-7 days
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("overdue")}
          isActive={searchParams.get("filter") === "overdue"}
        >
          Overdue
        </FilterButton>
        <FilterButton
          onClick={() => handleClick("all")}
          isActive={
            searchParams.get("filter") === "all" || !searchParams.get("filter")
          }
        >
          All
        </FilterButton>
      </div>
    </div>
  );
}

export default FilterDeadline;

function FilterButton({ children, onClick, isActive }) {
  return (
    <button
      className={`hover:bg-accent-500 hover:text-white rounded-md max-[768px]:text-xs lg:px-2 py-1 ${
        isActive && "bg-accent-500 text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
