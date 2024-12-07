import { useSearchParams } from "react-router-dom";
import TasksTableBody from "./TasksTableBody";
import TasksTableHeader from "./TasksTableHeader";
import { useTasks } from "./useTasks";
import Spinner from "../../ui/Spinner";
import { isToday, isTomorrow } from "date-fns";
import Empty from "./Empty";
import { TASKS_PER_PAGE } from "./../../utils/constants";
import { useEffect, useRef } from "react";
import { useUser } from "../authentication/useUser";
import Pagination from "./Pagination";

const today = new Date();
const todayStart = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
const twoDaysFromNow = new Date(todayStart);
twoDaysFromNow.setDate(todayStart.getDate() + 2);
const sevenDaysFromNow = new Date(todayStart);
sevenDaysFromNow.setDate(todayStart.getDate() + 7);

export default function TasksTable() {
  const { user } = useUser();
  const { isLoadingTasks, tasks } = useTasks(user.id);
  const [searchParams, setSearchParams] = useSearchParams();
  const previousFilterRef = useRef(searchParams.get("filter") || "all");

  const filterValue = searchParams.get("filter") || "all";

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  //we use Ref to remember the previous filter value (before changing it) and we compare it to the current filter and if its not the same we reset the page number to 1 and update the ref .current value to compare it the next time.
  useEffect(
    function () {
      if (filterValue !== previousFilterRef.current) {
        previousFilterRef.current = filterValue;
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
    },
    [filterValue, setSearchParams, searchParams]
  );

  if (isLoadingTasks)
    return (
      <div className="flex justify-center items-center pt-4 w-full">
        <span className="p-20 w-full m-4 flex justify-center items-center">
          <Spinner />
        </span>
      </div>
    );

  //1. FILTER
  const tasksNotCompleted = tasks.filter((task) => task.stage !== "Completed");

  let filteredTasks;
  if (filterValue === "today")
    filteredTasks = tasksNotCompleted.filter((task) => isToday(task.deadline));
  if (filterValue === "tomorrow")
    filteredTasks = tasksNotCompleted.filter((task) =>
      isTomorrow(task.deadline)
    );
  if (filterValue === "thisWeek")
    filteredTasks = tasksNotCompleted.filter(
      (task) =>
        new Date(task.deadline) >= twoDaysFromNow &&
        new Date(task.deadline) <= sevenDaysFromNow
    );
  if (filterValue === "overdue")
    filteredTasks = tasksNotCompleted.filter(
      (task) => new Date(task.deadline) < todayStart
    );
  if (filterValue === "all") filteredTasks = tasksNotCompleted;
  if (filterValue === "notStarted")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.stage === "Not started"
    );
  if (filterValue === "inProgress")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.stage === "In progress"
    );
  if (filterValue === "completed")
    filteredTasks = tasks.filter((task) => task.stage === "Completed");
  if (filterValue === "high")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.priority === "High"
    );
  if (filterValue === "medium")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.priority === "Medium"
    );
  if (filterValue === "low")
    filteredTasks = tasksNotCompleted.filter((task) => task.priority === "Low");
  if (filterValue === "housework")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Housework"
    );
  if (filterValue === "leisure")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Leisure"
    );
  if (filterValue === "education")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Education"
    );
  if (filterValue === "sport")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Sport"
    );
  if (filterValue === "work")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Work"
    );
  if (filterValue === "other")
    filteredTasks = tasksNotCompleted.filter(
      (task) => task.category === "Other"
    );

  if (!tasks.length || !filteredTasks.length)
    return <Empty filterValue={filterValue} />;

  //2. SORT
  const sortByValue = searchParams.get("sortBy") || "date-asc";

  let sortedTasks;
  if (sortByValue === "date-asc" && filterValue !== "completed")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  if (sortByValue === "date-asc" && filterValue === "completed")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate));
  if (sortByValue === "date-desc" && filterValue !== "completed")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  if (sortByValue === "date-desc" && filterValue === "completed")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));

  //3. PAGINATION
  const indexOfLastTask = currentPage * TASKS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - TASKS_PER_PAGE;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const pageCount = Math.ceil(sortedTasks.length / TASKS_PER_PAGE);

  return (
    <div className="pt-4">
      <div className="border shadow-md border-gray-400 text-[1.4rem] overflow-hidden rounded-md m-4 h-full">
        <TasksTableHeader />
        <TasksTableBody
          filteredTasks={currentTasks}
          currentPage={currentPage}
        />
      </div>
      <Pagination
        count={sortedTasks.length}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </div>
  );
}
