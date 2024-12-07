import { createContext, useContext, useState } from "react";

const OpenModalContext = createContext();

function OpenModalProvider({ children }) {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});

  function onShowForm(task = {}) {
    setTaskToEdit(task); // Set taskToEdit to the provided task or null for creating a new task
    setShowForm(true); // Open the modal
  }

  function onCloseForm() {
    setShowForm(false); // Close the modal
    setTaskToEdit(null); // Reset taskToEdit state
  }

  return (
    <OpenModalContext.Provider
      value={{ showForm, onShowForm, onCloseForm, taskToEdit }}
    >
      {children}
    </OpenModalContext.Provider>
  );
}

function useOpenModal() {
  const context = useContext(OpenModalContext);
  if (context === undefined)
    throw new Error("OpenModalContext was used outside of OpenModalProvider");
  return context;
}

export { OpenModalProvider, useOpenModal };
