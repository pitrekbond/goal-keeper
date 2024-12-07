import { useDarkMode } from "../../context/DarkModeContext";

function Empty({ filterValue }) {
  const { isDarkMode } = useDarkMode();

  let message;
  if (filterValue === "today") message = "There are no tasks for today";
  if (filterValue === "tomorrow") message = "There are not tasks for tomorrow";
  if (filterValue === "thisWeek") message = "There are no tasks for this week";
  if (filterValue === "overdue") message = "There are no overdue tasks";
  if (filterValue === "all" || !filterValue)
    message = "There are no tasks to do";
  if (filterValue === "notStarted") message = "There are no unstarted tasks";
  if (filterValue === "inProgress")
    message = "There are no tasks currently in progress";
  if (filterValue === "completed")
    message = "You haven't completed any tasks yet";
  if (filterValue === "high") message = "There are no high priority tasks";
  if (filterValue === "medium") message = "There are no medium priority tasks";
  if (filterValue === "low") message = "There are no low priority tasks";
  if (filterValue === "housework")
    message = "There are no tasks from the Housework category";
  if (filterValue === "leisure")
    message = "There are no tasks from the Leisure category";
  if (filterValue === "education")
    message = "There are no tasks from the Education category";
  if (filterValue === "sport")
    message = "There are no tasks from the Sport category";
  if (filterValue === "work")
    message = "There are no tasks from the Work category";
  if (filterValue === "other")
    message = "There are no tasks from other categories";

  return (
    <div className="flex justify-center items-center pt-4 w-full">
      <span
        className={`text-center text-lg font-semibold ${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-gray-700"
        }  p-20 rounded-md shadow-md border border-gray-400 w-full m-4`}
      >
        {message}
      </span>
    </div>
  );
}

export default Empty;
