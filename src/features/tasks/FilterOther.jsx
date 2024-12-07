import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function FilterOther() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  function handleChange(event) {
    //here we have to use event.target.value, otherwise we cant access the value from the selected option in <select></select> element
    const { value } = event.target;
    if (value) {
      searchParams.set("filter", value); // Update the corresponding query parameter
    } else {
      searchParams.delete("filter"); // Remove the query parameter if no value is selected
    }
    setSearchParams(searchParams); // Update the URL
  }

  return (
    <div className="flex-col items-end max-[640px]:text-xs max-[640px]:mt-2">
      <div className={`text-center ${isDarkMode && "text-white"}`}>
        Filter by
      </div>
      <div className={` max-[640px]:grid max-[640px]:grid-cols-2 flex gap-1`}>
        <SelectPriority onChange={handleChange} isDarkMode={isDarkMode} />
        <SelectStage onChange={handleChange} isDarkMode={isDarkMode} />
        <SelectCategory onChange={handleChange} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default FilterOther;

function SelectStage({ onChange, isDarkMode }) {
  const [searchParams] = useSearchParams();
  return (
    <select
      className={`lg:py-2 lg:px-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent ring-offset-[-1px] outline-none  ${
        isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-black"
      } ${
        searchParams.get("filter") === "notStarted" ||
        searchParams.get("filter") === "inProgress" ||
        searchParams.get("filter") === "completed"
          ? "!bg-accent-500 text-white"
          : ""
      }`}
      id="stage"
      onChange={onChange}
      value={
        searchParams.get("filter") === "notStarted" ||
        searchParams.get("filter") === "inProgress" ||
        searchParams.get("filter") === "completed"
          ? searchParams.get("filter")
          : ""
      }
    >
      <option
        value=""
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Stage
      </option>
      <option
        value="notStarted"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Not started
      </option>
      <option
        value="inProgress"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        In progress
      </option>
      <option
        value="completed"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Completed
      </option>
    </select>
  );
}

function SelectPriority({ onChange, isDarkMode }) {
  const [searchParams] = useSearchParams();
  return (
    <select
      className={`py-2 px-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent ring-offset-[-1px] outline-none  ${
        isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-black"
      } ${
        searchParams.get("filter") === "high" ||
        searchParams.get("filter") === "medium" ||
        searchParams.get("filter") === "low"
          ? "!bg-accent-500 text-white"
          : ""
      }`}
      id="priority"
      onChange={onChange}
      value={
        searchParams.get("filter") === "high" ||
        searchParams.get("filter") === "medium" ||
        searchParams.get("filter") === "low"
          ? searchParams.get("filter")
          : ""
      }
    >
      <option
        value=""
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Priority
      </option>
      <option
        value="low"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Low
      </option>
      <option
        value="medium"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        Medium
      </option>
      <option
        value="high"
        className={`${
          isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
        } max-[640px]:text-xs`}
      >
        High
      </option>
    </select>
  );
}

function SelectCategory({ onChange, isDarkMode }) {
  const [searchParams] = useSearchParams();
  return (
    <div className="max-[640px]:col-span-2 max-[640px]:flex max-[640px]:justify-center max-[640px]:w-full">
      <select
        className={`py-2 px-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent ring-offset-[-1px] outline-none  ${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-black"
        } ${
          searchParams.get("filter") === "housework" ||
          searchParams.get("filter") === "leisure" ||
          searchParams.get("filter") === "education" ||
          searchParams.get("filter") === "sport" ||
          searchParams.get("filter") === "work" ||
          searchParams.get("filter") === "other"
            ? "!bg-accent-500 text-white"
            : ""
        }`}
        id="category"
        onChange={onChange}
        value={
          searchParams.get("filter") === "housework" ||
          searchParams.get("filter") === "leisure" ||
          searchParams.get("filter") === "education" ||
          searchParams.get("filter") === "sport" ||
          searchParams.get("filter") === "work" ||
          searchParams.get("filter") === "other"
            ? searchParams.get("filter")
            : ""
        }
      >
        <option
          value=""
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Category
        </option>
        <option
          value="housework"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Housework
        </option>
        <option
          value="leisure"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Leisure
        </option>
        <option
          value="education"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Education
        </option>
        <option
          value="sport"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Sport
        </option>
        <option
          value="work"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Work
        </option>
        <option
          value="other"
          className={`${
            isDarkMode ? "!bg-dark-800 text-white" : "!bg-gray-100 text-black"
          } max-[640px]:text-xs`}
        >
          Other
        </option>
      </select>
    </div>
  );
}
