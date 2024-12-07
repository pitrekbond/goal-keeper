import { useDarkMode } from "../../context/DarkModeContext";
import Spinner from "../../ui/Spinner";

export default function Stat({ title, value, color, isLoading, children }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`${
        isDarkMode ? "bg-dark-800" : "bg-gray-100"
      }  text-center p-2 lg:p-4 rounded-md shadow-md border border-gray-400 grid grid-cols-[2rem_1fr] lg:grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 `}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div
            className={`row-span-full h-10 w-10 lg:h-14 lg:w-14 rounded-full flex items-center justify-center ${color}`}
          >
            {children}
          </div>
          <h5
            className={`self-end text-left text-sm uppercase tracking-[0.4px] font-semibold ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            } `}
          >
            {title}
          </h5>
          <p
            className={`text-left text-2xl tracking-[0.4px] font-semibold ${
              isDarkMode ? "text-white" : "text-gray-700"
            } `}
          >
            {value}
          </p>
        </>
      )}
    </div>
  );
}
