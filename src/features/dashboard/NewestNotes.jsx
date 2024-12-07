import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { useNotes } from "../notes/useNotes";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";

export default function NewestNotes() {
  const { user } = useUser();
  const { isLoadingNotes, notes } = useNotes(user.id);
  const { isDarkMode } = useDarkMode();

  const latestNotes = !isLoadingNotes
    ? notes
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)
    : [];
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100 text-gray-700"
      } overflow-hidden rounded-md shadow-md border border-gray-400 flex-grow  flex flex-col max-[640px]:w-[15rem]`}
    >
      <h3 className="text-xl  font-semibold border-b-[2px] p-4 text-center">
        New notes
      </h3>
      {isLoadingNotes ? (
        <div className="w-full m-4 flex justify-center items-center">
          <Spinner />
        </div>
      ) : latestNotes.length === 0 ? (
        <NoNotes />
      ) : (
        <ul className="flex-shrink-0 flex flex-col h-[13.625rem] overflow-y-auto">
          {latestNotes.map((note) => (
            <LatestNote note={note} key={note.id} />
          ))}
        </ul>
      )}

      <button
        className={`max-[1024px]:h-[3rem]  flex-grow font-semibold px-6 ${
          isDarkMode ? "bg-dark-800" : "bg-gray-200"
        }  hover:bg-accent-500 transition-all duration-300 hover:text-white flex items-center justify-center gap-2 group`}
        onClick={() => navigate("/notes")}
      >
        <span className="text-accent-500 group-hover:text-white transition-all duration-300">
          Go to your notes
        </span>
        {
          <ArrowLongRightIcon className="h-6 w-6 text-accent-500 group-hover:text-white transition-all duration-300" />
        }
      </button>
    </div>
  );
}

function LatestNote({ note }) {
  const { title, content } = note;
  const maxLength = 40;
  const displayText =
    content.length > maxLength ? content.slice(0, maxLength) + "..." : content;

  return (
    <li className="p-2 border-b-[1.5px]">
      <h4 className="font-semibold py-1 px-2">{title}</h4>
      <p className="text-xs py-1 px-2 truncate overflow-hidden whitespace-nowrap">
        {displayText}
      </p>
    </li>
  );
}

function NoNotes() {
  return (
    <p className="font-semibold flex-shrink-0 h-[13.625rem] overflow-y-auto flex items-center justify-center text-center p-4">
      You don't have any notes yet
    </p>
  );
}
