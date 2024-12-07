import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLongRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useTasks } from "../tasks/useTasks";
import Stat from "./Stat";
import Graph from "./Graph";

function Statistics({ userId }) {
  const { isLoadingTasks, tasks } = useTasks(userId);

  // Check if tasks are available before processing them
  const safeTasks = isLoadingTasks ? [] : tasks;

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const remainingTasksNumber = safeTasks.filter(
    (task) => task.stage !== "Completed"
  ).length;

  const completedTasks = safeTasks.filter((task) => task.stage === "Completed");

  const completedTasksNumber = completedTasks.length;

  const overdueTasks = safeTasks
    .filter((task) => task.stage !== "Completed")
    .filter((task) => new Date(task.deadline) < todayStart).length;

  const completionRate = safeTasks.length
    ? ((completedTasksNumber / safeTasks.length) * 100).toFixed(1) + "%"
    : "0%";

  return (
    <div className="col-span-2 h-[20rem] lg:h-[31.25rem]">
      <div className="max-[640px]:flex max-[640px]:flex-col sm:grid lg:grid-cols-4 max-[1024px]:gap-x-1 max-[1024px]:gap-y-3 gap-8 lg:grid-rows-[auto_auto]">
        <Stat
          title="Remaining tasks"
          color="bg-yellow-200"
          value={remainingTasksNumber}
          isLoading={isLoadingTasks}
        >
          {
            <ArrowLongRightIcon className="h-6 w-6 lg:h-10 lg:w-10 text-yellow-600" />
          }
        </Stat>
        <Stat
          title="Overdue"
          color="bg-accent-300"
          value={overdueTasks}
          isLoading={isLoadingTasks}
        >
          {
            <ExclamationTriangleIcon className=" h-6 w-6 lg:h-10 lg:w-10 text-accent-600" />
          }
        </Stat>
        <Stat
          title="Completed"
          color="bg-primary-200"
          value={completedTasksNumber}
          isLoading={isLoadingTasks}
        >
          {
            <CheckCircleIcon className=" h-6 w-6 lg:h-10 lg:w-10 text-primary-600" />
          }
        </Stat>
        <Stat
          title="Completion rate"
          color="bg-blue-300"
          value={completionRate}
          isLoading={isLoadingTasks}
        >
          {<ChartBarIcon className=" h-6 w-6 lg:h-10 lg:w-10 text-blue-600" />}
        </Stat>
        <Graph completedTasks={completedTasks} isLoading={isLoadingTasks} />
      </div>
    </div>
  );
}

export default Statistics;
