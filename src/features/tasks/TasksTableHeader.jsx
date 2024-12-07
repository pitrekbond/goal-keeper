import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function TasksTableHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSort, setActiveSort] = useState("date-asc");
  const { isDarkMode } = useDarkMode();

  function handleClick(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
    setActiveSort(value);
  }

  return (
    <div
      className={`${
        isDarkMode ? "text-white bg-dark-800" : "text-gray-500 bg-gray-100"
      } grid grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),6rem] gap-4 items-center px-2 py-4 uppercase  text-sm font-medium tracking-wide  border-b-2 max-[640px]:text-xs max-[640px]:grid-cols-2`}
    >
      <div className="text-center flex">
        <div className="opacity-0 w-[40px]"></div>
        <span className="text-center w-full mr-3">Task</span>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center lg:gap-2">
          <button onClick={() => handleClick("date-asc")}>
            <ChevronDoubleUpIcon
              className={`h-5 w-5 text-gray-400 hover:text-red-500 ${
                activeSort === "date-asc" && "text-red-500"
              }`}
            />
          </button>
          <span>
            {searchParams.get("filter") === "completed"
              ? "completion date"
              : "due date"}
          </span>
          <button onClick={() => handleClick("date-desc")}>
            <ChevronDoubleDownIcon
              className={`h-5 w-5 max-[640px]:mr-3 text-gray-400 hover:text-red-500 ${
                activeSort === "date-desc" && "text-red-500"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="text-center hidden xl:block">Priority</div>
      <div className="text-center max-[640px]:hidden">Stage</div>
    </div>
  );
}

export default TasksTableHeader;
