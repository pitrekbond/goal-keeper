import { useForm } from "react-hook-form";
import { useOpenNote } from "../context/OpenNoteContext";
import { useUser } from "../features/authentication/useUser";
import { useCreateNote } from "../features/notes/useCreateNote";
import SpinnerMini from "./SpinnerMini";
import { createPortal } from "react-dom";
import { useEditNote } from "../features/notes/useEditNote";
import { useDarkMode } from "../context/DarkModeContext";

export default function WriteNoteForm() {
  const { noteToEdit, onCloseNote } = useOpenNote();
  const { id: noteId, ...editValues } = noteToEdit;
  const { isCreating, createNote } = useCreateNote();
  const { editNote } = useEditNote();
  const { isDarkMode } = useDarkMode();

  const isEditSession = Boolean(noteToEdit?.id);
  const { user } = useUser();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEditSession) {
      editNote(
        { newNoteData: data, id: noteId },
        {
          onSuccess: (data) => {
            reset();
            onCloseNote();
          },
        }
      );
    } else
      createNote(data, {
        onSuccess: (data) => {
          reset();
          onCloseNote();
        },
      });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-xs"
      onClick={onCloseNote}
    >
      <div
        className={`${
          isDarkMode ? "bg-dark-700 text-white" : "bg-gray-50 text-gray-700"
        }  rounded-md px-6 pb-6 pt-4 border border-gray-400 max-[640px]:h-[33rem] max-[640px]:w-[20rem] h-[37.5rem] w-[37.5rem] `}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="flex flex-col h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b-[1.5px] py-4 flex justify-center">
            <input
              className={`${
                isDarkMode && "bg-dark-900"
              } w-5/6 border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-base outline-offset-[-1px] ${
                errors?.title
                  ? "border-red-500 placeholder-red-500 outline-offset-[-1px]"
                  : ""
              }`}
              placeholder={errors?.title ? errors.title.message : "Note title"}
              id="title"
              type="text"
              {...register("title", { required: "Title required" })}
            />
          </div>
          <div className="border-b-[1.5px] py-4 flex justify-center h-full">
            <textarea
              className={`${
                isDarkMode && "bg-dark-900"
              } w-5/6 border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-base outline-offset-[-1px] ${
                errors?.content
                  ? "border-red-500 placeholder-red-500 outline-offset-[-1px]"
                  : ""
              }`}
              placeholder={
                errors?.content
                  ? errors.content.message
                  : "Write your note here (max 200 words)"
              }
              id="content"
              {...register("content", {
                required: "Note content required",
                validate: (value) => {
                  const wordCount = value.trim().split(/\s+/).length;
                  return (
                    wordCount <= 200 || "Content must be 200 words or less."
                  );
                },
              })}
            />
          </div>
          <input
            type="hidden"
            id="userId"
            {...register("userId")}
            value={user.id}
          />
          <div className="mt-2 flex gap-2 justify-end">
            <button
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-gray-100"
              } rounded-md border border-gray-300 px-4 py-2 text-[1rem]  transition-colors`}
              onClick={onCloseNote}
            >
              Cancel
            </button>
            <button
              className="bg-accent-500 rounded-md px-4 py-2 hover:bg-accent-600 transition-colors text-[1rem] text-white disabled:cursor-not-allowed"
              disabled={isCreating}
            >
              {isCreating ? (
                <SpinnerMini />
              ) : isEditSession ? (
                "Edit note"
              ) : (
                "Create note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
