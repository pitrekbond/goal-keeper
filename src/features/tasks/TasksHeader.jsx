import { useSearchParams } from "react-router-dom";
import FilterDeadline from "./FilterDeadline";
import FilterOther from "./FilterOther";
import { useDarkMode } from "../../context/DarkModeContext";

function TasksHeader() {
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  let heading;
  if (searchParams.get("filter") === "today") heading = "Today's tasks";
  if (searchParams.get("filter") === "tomorrow") heading = "Tomorrow's tasks";
  if (searchParams.get("filter") === "thisWeek") heading = "This week's tasks";
  if (searchParams.get("filter") === "overdue") heading = "Overdue tasks";
  if (searchParams.get("filter") === "all" || !searchParams.get("filter"))
    heading = "All tasks";
  if (searchParams.get("filter") === "notStarted")
    heading = "Not started tasks";
  if (searchParams.get("filter") === "inProgress")
    heading = "Tasks in progress";
  if (searchParams.get("filter") === "completed") heading = "Completed tasks";
  if (searchParams.get("filter") === "high") heading = "High priority tasks";
  if (searchParams.get("filter") === "medium")
    heading = "Medium priority tasks";
  if (searchParams.get("filter") === "low") heading = "Low priority tasks";
  if (searchParams.get("filter") === "housework") heading = "Housework";
  if (searchParams.get("filter") === "leisure") heading = "Leisure";
  if (searchParams.get("filter") === "education") heading = "Education";
  if (searchParams.get("filter") === "sport") heading = "Sport";
  if (searchParams.get("filter") === "work") heading = "Work";
  if (searchParams.get("filter") === "other") heading = "Other tasks";

  return (
    <div className="flex flex-col md:flex-row lg:items-start justify-between mt-1 lg:mt-4 mx-4">
      <h1
        className={`text-2xl lg:text-3xl ${
          isDarkMode && "text-white"
        } font-semibold`}
      >
        {heading}
      </h1>
      <div className="flex flex-col max-[640px]:items-center md:flex-row gap-1 md:gap-3 max-[640px]:mt-4">
        <FilterDeadline />
        <FilterOther />
      </div>
    </div>
  );
}

export default TasksHeader;
