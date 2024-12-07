import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../index.css";
import { useDarkMode } from "../../context/DarkModeContext";

function Calendar() {
  const selected = new Date(); // Set the selected date to today
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`calendar-container border border-gray-400 shadow-md ${
        isDarkMode ? "dark-mode" : ""
      }  h-[347.2px]`}
    >
      <DayPicker
        mode="single"
        selected={selected}
        disabled={{ before: selected, after: selected }} // Disable all days except today
        className="custom-daypicker"
      />
    </div>
  );
}

export default Calendar;
