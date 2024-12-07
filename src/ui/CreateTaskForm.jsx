import { useForm } from "react-hook-form";
import Spinner from "./../ui/Spinner";
import { useCreateTask } from "../features/tasks/useCreateTask";
import { useEditTask } from "../features/tasks/useEditTask";
import { createPortal } from "react-dom";
import { useOpenModal } from "../context/OpenModalContext";
import Error from "./Error";
import { useUser } from "../features/authentication/useUser";
import { useCreateNote } from "../features/notes/useCreateNote";
import { useNotes } from "../features/notes/useNotes";
import { useEditNote } from "../features/notes/useEditNote";
import { useDarkMode } from "../context/DarkModeContext";

export default function CreateTaskForm() {
  const { taskToEdit, onCloseForm } = useOpenModal();
  const { isDarkMode } = useDarkMode();
  const { id: taskId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(taskToEdit?.id);
  const { isCreating, createTask } = useCreateTask();
  const { isEditing, editTask } = useEditTask();
  const { createNote } = useCreateNote();
  const { editNote } = useEditNote();
  const { user } = useUser();
  const { notes, isLoadingNotes } = useNotes(user.id);
  const existingNote = !isLoadingNotes
    ? notes.find((note) => note.taskId === taskToEdit.id)
    : null;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? { ...editValues, description: existingNote?.content || "" }
      : {},
  });

  const { errors } = formState;
  const today = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format

  function onSubmit(data) {
    if (isEditSession) {
      if (data.description) {
        if (!existingNote)
          createNote({
            title: data.name,
            content: data.description,
            userId: user.id,
            taskId: taskToEdit.id,
          });

        if (existingNote)
          editNote({
            newNoteData: {
              title: data.name,
              content: data.description,
            },
            id: existingNote.id,
          });
      }

      editTask(
        { newTaskData: data, id: taskToEdit.id },
        {
          onSuccess: (data) => {
            reset();
            onCloseForm();
          },
        }
      );
    } else {
      createTask(data, {
        onSuccess: (newTask) => {
          if (data.description) {
            createNote({
              title: data.name,
              content: data.description,
              userId: user.id,
              taskId: newTask.id, // Use the new task ID here
            });
          }
          reset();
          onCloseForm();
        },
      });
    }
  }

  if (isCreating || isEditing) return <Spinner />;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-xs"
      onClick={onCloseForm} // Close modal on background click
    >
      <div
        className={`${
          isDarkMode ? "bg-dark-700 text-white" : "bg-gray-50 text-gray-700"
        }  border border-gray-400 text-[1.2rem] rounded-md  h-[37.5rem] p-8 m-4 flex flex-col w-[43.75rem] relative`}
        onClick={(e) => e.stopPropagation()} // Prevent modal content clicks from closing modal
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row label="Task name" id="name">
            <input
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300  rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              type="text"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
            {errors?.name?.message && <Error>{errors.name.message}</Error>}
          </Row>
          <Row label="Deadline" id="deadline">
            <input
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300 rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              type="date"
              id="deadline"
              //this is so that clicking anywhere in the input opens the date picker
              onFocus={(e) => e.target.showPicker()}
              min={today}
              {...register("deadline", {
                required: "This field is required",
              })}
              defaultValue={today}
            />
            {errors?.deadline?.message && (
              <Error>{errors.deadline.message}</Error>
            )}
          </Row>
          <Row label="Priority" id="priority">
            <select
              id="priority"
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300 rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              {...register("priority", {
                required: "This field is required",
              })}
            >
              <option value="">Select priority...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors?.priority?.message && (
              <Error>{errors.priority.message}</Error>
            )}
          </Row>
          <Row label="Stage" id="stage">
            <select
              id="stage"
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300 rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              {...register("stage")}
            >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
            </select>
          </Row>
          <Row label="Category" id="category">
            <select
              id="category"
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300 rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              {...register("category", {
                required: "This field is required",
              })}
            >
              <option value="">Select category...</option>
              <option value="Housework">Housework</option>
              <option value="Leisure">Leisure</option>
              <option value="Education">Education</option>
              <option value="Sport">Sport</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            {errors?.category?.message && (
              <Error>{errors.category.message}</Error>
            )}
          </Row>
          <Row label="Notes" id="description">
            <textarea
              id="description"
              className={`${
                isDarkMode ? "bg-dark-900" : "bg-white"
              } border border-gray-300 rounded-md p-2 shadow-sm px-2 py-2 w-full focus:outline-2 focus:outline-accent-400 outline-offset-[-1px]`}
              {...register("description", {
                validate: (value) => {
                  const wordCount = value.trim().split(/\s+/).length;
                  return (
                    wordCount <= 200 || "Description must be 200 words or less."
                  );
                },
              })}
            />
            {errors?.description?.message && (
              <Error>{errors.description.message}</Error>
            )}
          </Row>
          <input
            type="hidden"
            id="userId"
            {...register("userId")}
            value={user.id}
          />
          <div className="mt-2 flex gap-2 justify-end">
            <button
              onClick={onCloseForm}
              className={`${
                isDarkMode ? "hover:bg-dark-900" : "hover:bg-gray-100"
              } rounded-md border border-gray-300 px-4 py-2 text-[1rem]  transition-colors`}
            >
              Cancel
            </button>
            <button
              className="bg-accent-500 rounded-md px-4 py-2 hover:bg-accent-600 transition-colors text-[1rem] text-white disabled:cursor-not-allowed"
              disabled={isCreating || isEditing}
            >
              {isEditSession ? "Edit task" : "Create new task"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

function Row({ label, id, children }) {
  return (
    <div className="grid grid-cols-[1fr,1.5fr,1fr] max-[640px]:grid-cols-[8rem,1fr] gap-4 items-center w-full text-base border-b-[1.5px] py-4">
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}
