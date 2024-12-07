import { useDarkMode } from "../../context/DarkModeContext";
import TableRow from "./TableRow";

function TasksTableBody({ filteredTasks, currentPage }) {
  const { isDarkMode } = useDarkMode();

  return (
    <section
      className={`flex flex-col ${
        isDarkMode ? "text-white bg-dark-700" : "bg-gray-50 text-gray-700"
      }  h-full  text-sm`}
    >
      {filteredTasks.map((task) => (
        <TableRow
          task={task}
          key={task.id}
          currentPageTasks={filteredTasks}
          currentPage={currentPage}
        />
      ))}
    </section>
  );
}

export default TasksTableBody;
