import { createPortal } from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { useUser } from "../features/authentication/useUser";
import { useTasks } from "../features/tasks/useTasks";
import Spinner from "./Spinner";

function ToDoOnDate({ date, setIsOpenToDo, setSelected }) {
  const { isDarkMode } = useDarkMode();
  const { user } = useUser();
  const { isLoadingTasks, tasks } = useTasks(user.id);

  if (isLoadingTasks)
    return (
      <div className="w-full m-4 flex justify-center items-center">
        <Spinner />;
      </div>
    );

  function handleClose() {
    setIsOpenToDo(false);
  }

  const unfinishedTasks = tasks
    .filter((task) => task.stage !== "Completed")
    .filter((task) => task.deadline === date);

  const finishedTasks = tasks
    .filter((task) => task.stage === "Completed")
    .filter((task) => task.deadline === date);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className={`${
          isDarkMode ? "bg-dark-700 text-white" : "bg-gray-50 text-gray-700"
        } rounded-md px-6 pb-6 pt-4 border border-gray-400 min-h-[37.5rem] h-auto w-[37.5rem] flex flex-col`}
      >
        <div className="flex flex-col justify-center">
          <p className="text-center text-sm">
            Tasks <span className="text-accent-500">to do</span> on
          </p>
          <p className="text-center text-2xl ">{date}</p>
          <div className="grid grid-cols-3 gap-4 w-3/4 items-center mx-auto pt-4 text-gray-500">
            <span className="text-center">Task name</span>
            <span className="text-center">Priority</span>
            <span className="text-center">Stage</span>
          </div>
          <ul className="flex flex-col items-center">
            {unfinishedTasks.map((task) => (
              <UnfinishedTask
                name={task.name}
                priority={task.priority}
                stage={task.stage}
                key={task.id}
              />
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center pt-20">
          <p className="text-center text-sm">
            Tasks <span className="text-primary-400">completed</span> with
            deadline on
          </p>
          <p className="text-center text-2xl">{date}</p>
          <div className="grid grid-cols-3 gap-4 w-3/4 items-center mx-auto pt-4 text-gray-500">
            <span className="text-center">Task name</span>
            <span className="text-center">Priority</span>
            <span className="text-center">Finished on</span>
          </div>
          <ul className="flex flex-col items-center">
            {finishedTasks.map((task) => (
              <FinishedTask
                name={task.name}
                priority={task.priority}
                completionDate={task.completionDate}
                key={task.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ToDoOnDate;

function UnfinishedTask({ name, priority, stage }) {
  return (
    <li className="pt-4 grid grid-cols-3 gap-4 w-3/4">
      <span className="text-center text-accent-500 font-semibold">{name}</span>
      <span className="text-center">{priority}</span>
      <span className="text-center">{stage}</span>
    </li>
  );
}

function FinishedTask({ name, priority, completionDate }) {
  return (
    <li className="pt-4 grid grid-cols-3 gap-4 w-3/4">
      <span className="text-center text-primary-400 font-semibold">{name}</span>
      <span className="text-center">{priority}</span>
      <span className="text-center">{completionDate}</span>
    </li>
  );
}
