import TasksHeader from "../features/tasks/TasksHeader";
import TasksTable from "../features/tasks/TasksTable";

function Tasks() {
  return (
    <div className="mr-[15px]">
      <TasksHeader />
      <TasksTable />
    </div>
  );
}

export default Tasks;
