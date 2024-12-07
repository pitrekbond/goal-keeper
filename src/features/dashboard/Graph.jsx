import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../../ui/Spinner";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Graph({ completedTasks, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const { isDarkMode } = useDarkMode();

  function handleClick(value) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }
  const today = new Date();

  // Calculate the start and end of selected period
  const startOfLastWeek = subDays(today, 6);
  const startOfLastMonth = subDays(today, 29);
  const startOfLastQuarter = subDays(today, 89);
  const end = today;

  // Get all the days of selected period
  const lastWeekDates = eachDayOfInterval({
    start: startOfLastWeek,
    end,
  });
  const lastMonthDays = eachDayOfInterval({
    start: startOfLastMonth,
    end,
  });
  const lastQuarterDays = eachDayOfInterval({
    start: startOfLastQuarter,
    end,
  });

  //turn completionDate to a normal date
  const completionDatesArray = completedTasks.map(
    (task) => new Date(task.completionDate)
  );

  let data;
  if (searchParams.get("last") === "week" || !searchParams.get("last"))
    data = lastWeekDates.map((date) => {
      return {
        label: format(date, "MMM dd"),
        numberOfTasksCompleted: completionDatesArray.filter((task) =>
          isSameDay(date, task)
        ).length,
      };
    });

  if (searchParams.get("last") === "month")
    data = lastMonthDays.map((date) => {
      return {
        label: format(date, "MMM dd"),
        numberOfTasksCompleted: completionDatesArray.filter((task) =>
          isSameDay(date, task)
        ).length,
      };
    });

  if (searchParams.get("last") === "quarter")
    data = lastQuarterDays.map((date) => {
      return {
        label: format(date, "MMM dd"),
        numberOfTasksCompleted: completionDatesArray.filter((task) =>
          isSameDay(date, task)
        ).length,
      };
    });

  return (
    <div
      className={`col-span-4 ${
        isDarkMode ? "bg-dark-800" : "bg-gray-100"
      }  p-4 rounded-md shadow-md border border-gray-400`}
    >
      <>
        <div className="mb-4  flex justify-between max-[640px]:items-center">
          <h5
            className={`${
              isDarkMode ? "text-white" : "text-gray-700"
            }  text-lg font-semibold`}
          >
            {`Tasks completed last ${searchParams.get("last") || "week"}`}
          </h5>
          {isLoading ? (
            <div className="p-20 w-full m-4 flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div
              className={`flex gap-2 ${
                isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
              }  px-1 py-1 rounded-md border border-gray-200 shadow-sm max-[640px]:flex-col`}
            >
              <FilterButton
                onClick={() => handleClick("week")}
                isActive={
                  searchParams.get("last") === "week" ||
                  !searchParams.get("last")
                }
              >
                {isLargeScreen ? "Last 7 days" : "L7"}
              </FilterButton>
              <FilterButton
                onClick={() => handleClick("month")}
                isActive={searchParams.get("last") === "month"}
              >
                {isLargeScreen ? "Last 30 days" : "L30"}
              </FilterButton>
              <FilterButton
                onClick={() => handleClick("quarter")}
                isActive={searchParams.get("last") === "quarter"}
              >
                {isLargeScreen ? "Last 90 days" : "L90"}
              </FilterButton>
            </div>
          )}
        </div>
        {}
        <ResponsiveContainer
          height={isLargeScreen ? 300 : 200}
          width={isLargeScreen ? "90%" : "100%"}
          className="lg:ml-7"
        >
          <AreaChart
            data={data}
            margin={{ top: 8, right: 27, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="label" />
            <YAxis unit="" width={!isLargeScreen ? 20 : 60} />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip />
            <Area
              dataKey="numberOfTasksCompleted"
              type="monotone"
              stroke="#059669"
              fill="#6ee7b7"
              name="Tasks completed"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    </div>
  );
}

function FilterButton({ children, onClick, isActive }) {
  return (
    <button
      className={`hover:bg-accent-500 hover:text-white rounded-md px-1 md:px-2 py-1 max-[640px]:text-xs ${
        isActive && "bg-accent-500 text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
