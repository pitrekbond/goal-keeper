import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useDeleteNote } from "./useDeleteNote";
import SpinnerMini from "./../../ui/SpinnerMini";
import { useOpenNote } from "../../context/OpenNoteContext";
import WriteNoteForm from "../../ui/WriteNoteForm";

export default function Note({ note, onOpen, isDarkMode }) {
  const { title, content: text, id: noteId } = note;
  const { isDeleting, deleteNote } = useDeleteNote();
  const { showNote, onShowNote } = useOpenNote();

  // Split content into lines and words
  const lines = text.split("\n");
  const words = text.split(" ");

  // Truncate content based on line and word limits
  const isTruncated = lines.length > 4 || words.length > 40;
  const truncatedLines = lines.slice(0, 4);
  let truncatedContent = truncatedLines.join("\n");

  // Ensure word limit is also applied to truncated lines
  const truncatedWords = truncatedContent.split(" ").slice(0, 40);
  truncatedContent = truncatedWords.join(" ");

  // Add ellipsis if truncated
  if (isTruncated) truncatedContent += "...";

  return (
    <div
      className={`${
        isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
      }  rounded-md px-6 pb-6 pt-4 border border-gray-400 relative`}
    >
      <h3 className="text-center font-semibold text-accent-500">{title}</h3>
      <div className="whitespace-pre-wrap">
        <p>{truncatedContent}</p>
      </div>
      <div className="py-2">
        {isTruncated && (
          <button
            className="text-accent-500 border-b border-accent-500 leading-3 pb-1"
            onClick={onOpen}
          >
            Show more
          </button>
        )}
        <button
          className={`absolute bottom-4 right-4 p-2 ${
            isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
          }  transition-all duration-300 rounded-md disabled:cursor-not-allowed`}
          disabled={isDeleting}
          onClick={() => deleteNote(noteId)}
        >
          {isDeleting ? (
            <SpinnerMini />
          ) : (
            <TrashIcon className="h-6 w-6 text-accent-500" />
          )}
        </button>
        <button
          className={`${
            isDarkMode ? "hover:bg-dark-900" : "hover:bg-accent-100"
          } absolute bottom-4 right-16 p-2 hover:bg-accent-100 transition-all duration-300 rounded-md`}
          onClick={() => onShowNote(note)}
        >
          {<PencilIcon className="h-6 w-6 text-accent-500" />}
        </button>
      </div>
      {showNote && <WriteNoteForm />}
    </div>
  );
}
