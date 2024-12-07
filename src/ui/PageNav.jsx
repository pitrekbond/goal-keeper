import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { useDarkMode } from "../context/DarkModeContext";

export default function PageNav() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex-grow my-6 mx-3 ${
        isDarkMode ? "text-white" : "text-gray-700"
      } `}
    >
      <ul
        className={`flex flex-col w-24 md:w-[10rem] lg:w-64  rounded-md ${
          isDarkMode ? "bg-dark-800" : "bg-gray-100"
        }  h-full`}
      >
        {" "}
        {/* Adjust width for smaller screens */}
        {/* Logo Section */}
        <li className="flex justify-center">
          <div className="w-3/4 h-full flex justify-center items-center rounded-md">
            <Logo />
          </div>
        </li>
        <li className="flex justify-center h-14 transition-colors my-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-3/4 h-full flex items-center rounded-md ${
                isDarkMode
                  ? "hover:bg-dark-900 hover:text-accent-500"
                  : "hover:bg-gray-200 hover:text-accent-500"
              }  transition-colors duration-300 justify-center gap-2 ${
                isActive
                  ? isDarkMode
                    ? "bg-dark-900 text-accent-500"
                    : "bg-gray-200 text-accent-500"
                  : ""
              }`
            }
          >
            <HomeIcon className="w-6 h-6" />
            Home
          </NavLink>
        </li>
        <li className="flex justify-center h-14 mb-4">
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `w-3/4 h-full flex items-center transition-colors duration-300 justify-center rounded-md gap-2 ${
                isDarkMode
                  ? "hover:bg-dark-900 hover:text-accent-500"
                  : "hover:bg-gray-200 hover:text-accent-500"
              }  transition-colors duration-300 justify-center gap-2 ${
                isActive
                  ? isDarkMode
                    ? "bg-dark-900 text-accent-500"
                    : "bg-gray-200 text-accent-500"
                  : ""
              }
              }`
            }
          >
            <CalendarDaysIcon className="w-6 h-6" />
            My tasks
          </NavLink>
        </li>
        <li className="flex justify-center h-14">
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `w-3/4 h-full flex items-center transition-colors duration-300 justify-center rounded-md gap-2 ${
                isDarkMode
                  ? "hover:bg-dark-900 hover:text-accent-500"
                  : "hover:bg-gray-200 hover:text-accent-500"
              }  transition-colors duration-300 justify-center gap-2 ${
                isActive
                  ? isDarkMode
                    ? "bg-dark-900 text-accent-500"
                    : "bg-gray-200 text-accent-500"
                  : ""
              }`
            }
          >
            <ClipboardIcon className="w-6 h-6" />
            Notes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
