import { createContext, useContext, useState } from "react";

const OpenNoteContext = createContext();

function OpenNoteProvider({ children }) {
  const [showNote, setShowNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});

  function onShowNote(note = {}) {
    setNoteToEdit(note); // Set taskToEdit to the provided task or null for creating a new task
    setShowNote(true); // Open the modal
  }

  function onCloseNote() {
    setShowNote(false); // Close the modal
    setNoteToEdit(null); // Reset taskToEdit state
  }

  return (
    <OpenNoteContext.Provider
      value={{ showNote, onShowNote, onCloseNote, noteToEdit }}
    >
      {children}
    </OpenNoteContext.Provider>
  );
}

function useOpenNote() {
  const context = useContext(OpenNoteContext);
  if (context === undefined)
    throw new Error("OpenNoteContext was used outside of OpenNoteProvider");
  return context;
}

export { OpenNoteProvider, useOpenNote };
