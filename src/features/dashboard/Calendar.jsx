import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../index.css";
import { useDarkMode } from "../../context/DarkModeContext";
import { useState } from "react";
import ToDoOnDate from "../../ui/ToDoOnDate";

function Calendar() {
  const date = new Date().toISOString().split("T")[0];

  const [selected, setSelected] = useState(date);
  const [isOpenToDo, setIsOpenToDo] = useState(false);
  const { isDarkMode } = useDarkMode();

  function handleSelect(selectedDate) {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const formattedDate = nextDay.toISOString().split("T")[0];
      setSelected(formattedDate);
    }
    setIsOpenToDo(true);
  }

  return (
    <>
      <div
        className={`calendar-container border border-gray-400 shadow-md ${
          isDarkMode ? "dark-mode" : ""
        }  h-[377.2px]`}
      >
        <DayPicker
          mode="single"
          selected={selected}
          // disabled={{ before: selected, after: selected }} // Disable all days except today
          onSelect={handleSelect}
          className="custom-daypicker"
        />
      </div>
      {isOpenToDo && (
        <ToDoOnDate
          date={selected}
          setIsOpenToDo={setIsOpenToDo}
          setSelected={setSelected}
        />
      )}
    </>
  );
}

export default Calendar;
