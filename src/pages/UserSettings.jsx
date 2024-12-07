import { useDarkMode } from "../context/DarkModeContext";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function UserSettings() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="mr-[8px] lg:mr-[15px] text-gray-700">
      <h1
        className={`${
          isDarkMode ? "text-white" : "text-black"
        } text-2xl lg:text-3xl font-semibold mt-1 lg:mt-4 ml-4 `}
      >
        Update your account
      </h1>
      <UpdateUserDataForm isDarkMode={isDarkMode} />
      <UpdatePasswordForm isDarkMode={isDarkMode} />
    </div>
  );
}

export default UserSettings;
