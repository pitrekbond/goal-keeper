import { useState } from "react";
import { useNotes } from "../features/notes/useNotes";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import Note from "../features/notes/Note";
import ModalNote from "../features/notes/ModalNote";
import NoNotes from "../features/notes/NoNotes";
import { useDarkMode } from "../context/DarkModeContext";

export default function Notes() {
  const [selectedNote, setSelectedNote] = useState(null);
  const { user } = useUser();
  const { isLoadingNotes, notes } = useNotes(user.id);
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <div className="mr-[15px]">
        <div className="flex items-center justify-between mt-1 lg:mt-4 mx-4">
          <h1
            className={`text-2xl ${
              isDarkMode && "text-white"
            } lg:text-3xl font-semibold`}
          >
            Your notes
          </h1>
        </div>
        {isLoadingNotes ? (
          <div className="flex justify-center items-center pt-[45.5px] w-full">
            <div className="p-20 w-full m-4 flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) : !notes.length ? (
          <NoNotes isDarkMode={isDarkMode} />
        ) : (
          <div
            className={`${
              isDarkMode ? "text-white" : "text-gray-700"
            } pt-2 m-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 `}
          >
            {notes.map((note) => (
              <Note
                isDarkMode={isDarkMode}
                note={note}
                key={note.id}
                onOpen={() =>
                  setSelectedNote({
                    title: note.title,
                    content: note.content,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
      {selectedNote && (
        <ModalNote
          selectedNote={selectedNote}
          onClose={() => setSelectedNote(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}
