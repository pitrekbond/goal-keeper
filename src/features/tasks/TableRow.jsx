import Spinner from "../../ui/Spinner";
import CreateTaskForm from "../../ui/CreateTaskForm";
import { useDeleteTask } from "./useDeleteTask";
import { useOpenModal } from "../../context/OpenModalContext";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  GlobeAltIcon,
  HomeIcon,
  BookOpenIcon,
  TrophyIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import formatDeadlineDate from "../../utils/helpers";
import { useCompleteTask } from "./useCompleteTask";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function TableRow({ task, currentPageTasks, currentPage }) {
  const { showForm, onShowForm, taskToEdit } = useOpenModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useDarkMode();

  const {
    name,
    deadline,
    priority,
    stage,
    id: taskId,
    category,
    completionDate,
  } = task;
  const { isDeleting, deleteTask } = useDeleteTask();
  const { isCompleting, completeTask } = useCompleteTask();

  //we need to first convert the deadline to a normal JS date, then set it to  0:00 same with current date to compare it then
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleClick = function () {
    const remainingTasksafterDeletion = currentPageTasks.length - 1;
    deleteTask(taskId, {
      onSuccess: () => {
        if (remainingTasksafterDeletion === 0 && currentPage > 1) {
          searchParams.set("page", currentPage - 1);
          setSearchParams(searchParams);
        }
      },
    });
  };

  if (isDeleting || isCompleting) return <Spinner />;

  return (
    <>
      <div className="grid max-[640px]:grid-cols-2 max-[640px]:grid-rows-2 grid-cols-[minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),6rem] gap-4 items-center border-b-[1.5px] px-2 py-2 max-[640px]:text-xs">
        <div className="flex items-center justify-between relative">
          {stage !== "Completed" ? (
            <button
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
              }  transition-all duration-300 rounded-md p-2 group`}
              onClick={() => completeTask(taskId)}
            >
              <CheckIcon className="h-6 w-6 text-gray-300 group-hover:text-accent-500 transition-all duration-300" />
            </button>
          ) : (
            <div className="w-[3rem] h-[2.5rem]"></div>
          )}
          <span className="font-bold text-center w-full">{name}</span>
          {category === "Leisure" && (
            <GlobeAltIcon className="h-6 w-6 text-gray-500" />
          )}
          {category === "Housework" && (
            <HomeIcon className="h-6 w-6 text-gray-500" />
          )}
          {category === "Education" && (
            <BookOpenIcon className="h-6 w-6 text-gray-500" />
          )}
          {category === "Sport" && (
            <TrophyIcon className="h-6 w-6 text-gray-500" />
          )}
          {category === "Work" && (
            <BriefcaseIcon className="h-6 w-6 text-gray-500" />
          )}
          {category === "Other" && (
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
          )}
        </div>
        {stage !== "Completed" ? (
          <div
            className={`text-center ${
              currentDate > deadlineDate && stage !== "Completed"
                ? "text-red-500"
                : ""
            }`}
          >
            {formatDeadlineDate(deadline)}
          </div>
        ) : (
          <div className="text-center ">
            {formatDeadlineDate(completionDate)}
          </div>
        )}
        <div className="text-center">
          <span
            className={`px-3 py-2 rounded-xl min-w-[6rem] inline-block ${
              priority === "Low"
                ? "bg-yellow-200"
                : priority === "Medium"
                ? "bg-orange-300"
                : "bg-red-400"
            }`}
          >
            {priority}
          </span>
        </div>
        <div className="text-center ">
          <span
            className={`px-3 py-2 rounded-xl min-w-[6rem] inline-block ${
              stage === "In progress"
                ? "bg-blue-300"
                : stage === "Not started"
                ? "bg-gray-200"
                : "bg-primary-300"
            }`}
          >
            {stage}
          </span>
        </div>
        <div className="ml-auto flex gap-3 max-[640px]:col-span-2 max-[640px]:w-full max-[640px]:gap-6 max-[640px]:justify-center">
          <button
            onClick={() => onShowForm(task)}
            className={` transition-all duration-300 rounded-md p-2 ${
              isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
            }`}
          >
            <PencilIcon className="h-6 w-6 text-accent-500" />
          </button>
          <button
            onClick={handleClick}
            className={` transition-all duration-300 rounded-md p-2 ${
              isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
            }`}
          >
            <TrashIcon className="h-6 w-6 text-accent-500" />
          </button>
        </div>
      </div>
      {/*  this is so that we get only one div in the console */}
      {showForm && taskToEdit?.id === task.id && <CreateTaskForm />}
    </>
  );
}

export default TableRow;
