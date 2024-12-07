import { CheckIcon } from "@heroicons/react/24/outline";
import { useTasks } from "../tasks/useTasks";
import Spinner from "../../ui/Spinner";
import formatDeadlineDate from "./../../utils/helpers";
import { useCompleteTask } from "../tasks/useCompleteTask";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../../context/DarkModeContext";

export default function UpcomingTasks({ userId }) {
  const { isDarkMode } = useDarkMode();

  if (!userId) return null;
  return (
    <div
      className={`${
        isDarkMode ? "bg-dark-800" : "bg-gray-100"
      }  overflow-hidden rounded-md w-[15rem] lg:w-[32.5rem] shadow-md border border-gray-400`}
    >
      <h2
        className={`text-xl ${
          isDarkMode ? "text-white" : "text-gray-700"
        } font-semibold border-b-[2px] p-4 text-center`}
      >
        Your upcoming tasks
      </h2>
      <div className=" text-[1.4rem] overflow-hidden rounded-md w-full">
        <UpcomingTasksTableContent userId={userId} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

function UpcomingTasksTableContent({ userId, isDarkMode }) {
  const { isLoadingTasks, tasks } = useTasks(userId);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  if (isLoadingTasks)
    return (
      <div className="w-full m-4 flex justify-center items-center">
        <Spinner />;
      </div>
    );

  const tasksNotCompleted = tasks.filter((task) => task.stage !== "Completed");
  const numberOfTasksToShow = isLargeScreen ? 5 : 4;

  const upcomingTasks = tasksNotCompleted
    .slice(0, numberOfTasksToShow)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <section
      className={`flex flex-col bg-gray-10 h-full ${
        isDarkMode ? "text-white" : "text-gray-700"
      } text-sm`}
    >
      {upcomingTasks.length ? (
        upcomingTasks.map((task) => (
          <UpcomingTask task={task} key={task.id} isDarkMode={isDarkMode} />
        ))
      ) : (
        <NoTasks isDarkMode={isDarkMode} />
      )}
    </section>
  );
}

function UpcomingTask({ task, isDarkMode }) {
  const { isCompleting, completeTask } = useCompleteTask();
  const { deadline, name, id: taskId } = task;

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (isCompleting) return <Spinner />;

  return (
    <div className="grid grid-cols-[minmax(0,1fr),minmax(0,1fr)] gap-4 items-center border-b-[1.5px] px-2 py-2">
      <div className="flex items-center justify-between relative">
        <button
          className={`${
            isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
          }  transition-all duration-300 rounded-md p-2 group`}
          onClick={() => completeTask(taskId)}
          disabled={isCompleting}
        >
          <CheckIcon className="h-6 w-6 text-gray-300 group-hover:text-accent-500 transition-all duration-300" />
        </button>
        <span className="font-bold text-center w-full lg:mr-12 text-accent-500">
          {name}
        </span>
      </div>
      <div className="flex items-center relative">
        {/* Move content of the second column more to the left */}
        <span
          className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 ${
            currentDate > deadlineDate && "text-red-500"
          }`}
        >
          {formatDeadlineDate(task.deadline)}
        </span>
      </div>
    </div>
  );
}

function NoTasks({ isDarkMode }) {
  return (
    <div className="flex justify-center items-center pt-4 w-full">
      <span
        className={`text-base text-center font-semibold ${
          isDarkMode ? "bg-dark-800" : "bg-gray-100"
        }  p-16 rounded-md w-full m-4`}
      >
        You don't have any pending tasks
      </span>
    </div>
  );
}
