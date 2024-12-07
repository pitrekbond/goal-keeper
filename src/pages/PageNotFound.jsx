import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function PageNotFound() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <main
      className={`h-screen ${
        isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
      } flex flex-col items-center justify-center gap-8`}
    >
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <button
        className={`text-2xl rounded-md border border-gray-300 px-4 py-2 ${
          isDarkMode ? "hover:bg-dark-900" : "hover:bg-gray-200"
        }  transition-colors`}
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </main>
  );
}

export default PageNotFound;
