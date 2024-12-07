import { useLocation, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightStartOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useOpenModal } from "../context/OpenModalContext";
import CreateTaskForm from "./CreateTaskForm";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../features/authentication/useUser";
import { useOpenNote } from "../context/OpenNoteContext";
import WriteNoteForm from "./WriteNoteForm";
import { useDarkMode } from "../context/DarkModeContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  const { showForm, onShowForm } = useOpenModal();
  const { showNote, onShowNote } = useOpenNote();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout, isLoading } = useLogout();
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <>
      <header
        className={`col-start-2 flex flex-wrap items-center justify-between mt-6 mb-3 mr-2 lg:mr-3 py-3 lg:pr-2 ${
          isDarkMode ? "bg-dark-800" : "bg-gray-100"
        }  rounded-md sticky top-0 z-10`}
      >
        <div className="p-1 lg:ml-5 flex gap-1 lg:gap-4 flex-wrap justify-center sm:justify-start w-full sm:w-auto order-2 sm:order-1">
          <button
            className="bg-accent-500 rounded-md px-2 py-1 lg:px-4 lg:py-2 hover:bg-accent-600 text-white transition-colors mb-2 sm:mb-0"
            onClick={() => onShowForm()}
          >
            + New Task
          </button>
          <button
            className="bg-accent-500 rounded-md px-2 py-1 lg:px-4 lg:py-2 hover:bg-accent-600 text-white transition-colors mb-2 sm:mb-0"
            onClick={() => onShowNote()}
          >
            + New Note
          </button>
        </div>

        <ul className="flex gap-1 items-center w-full sm:w-auto justify-center sm:justify-end order-1 sm:order-2">
          <li>
            <div
              className={`flex gap-2 lg:gap-4  items-center font-medium text-base ${
                isDarkMode ? "text-white" : "text-gray-700"
              } mr-2`}
            >
              <img
                className={`block w-[1.9rem] lg:w-[2.4rem] aspect-square object-cover object-center rounded-full outline outline-2 ${
                  isDarkMode ? "outline-dark-800" : "outline-gray-100"
                } `}
                src={avatar || "default-user.jpg"}
                alt={`Avatar of ${fullName}`}
              />
              <span>{fullName}</span>
            </div>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/settings")}
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
              } hover:bg-accent-100 transition-all duration-300 ${
                isSettingsPage
                  ? "ring-2 ring-accent-500 rounded-md"
                  : "rounded-md"
              } lg:p-2`}
            >
              <UserIcon className="h-6 w-6 text-accent-500" />
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={toggleDarkMode}
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
              } transition-all duration-300 rounded-md  lg:p-2`}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-accent-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-accent-500" />
              )}
            </button>
          </li>
          <li className="p-1">
            <button
              disabled={isLoading}
              onClick={logout}
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
              } transition-all duration-300 rounded-md lg:p-2`}
            >
              {!isLoading ? (
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-accent-500" />
              ) : (
                <SpinnerMini />
              )}
            </button>
          </li>
        </ul>
      </header>
      {showNote && <WriteNoteForm />}
      {showForm && <CreateTaskForm />}
    </>
  );
}

export default Header;
