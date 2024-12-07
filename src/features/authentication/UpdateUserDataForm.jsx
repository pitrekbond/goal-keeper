import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm({ isDarkMode }) {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <div className="my-3 lg:my-4 mx-2 lg:mr-16 lg:pt-2 flex flex-col gap-3 max-[640px]:text-sm lg:ml-5">
      <h3
        className={`${
          isDarkMode && "text-white"
        } text-xl font-semibold max-[640px]:ml-2`}
      >
        Update user data
      </h3>
      <form
        className={`${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
        } w-full  rounded-md flex flex-col gap-4 px-4 py-2 lg:px-8 lg:py-6`}
        onSubmit={handleSubmit}
      >
        <div className="w-full grid grid-cols-[4rem_auto] lg:grid-cols-[9.375rem_auto] gap-3 lg:gap-16 items-center border-b-[1.5px] py-2">
          <label>Email address</label>
          <input
            className={`border px-1 lg:px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 w-full lg:w-1/3 ${
              isDarkMode ? "disabled:bg-dark-700" : "disabled:bg-gray-300"
            }  disabled:cursor-not-allowed`}
            type="email"
            value={email}
            disabled
          />
        </div>
        <div className="w-full grid grid-cols-[4rem_auto] lg:grid-cols-[9.375rem_auto] gap-3 lg:gap-16 items-center border-b-[1.5px] py-2">
          <label htmlFor="fullName">Full name</label>
          <input
            className={`${
              isDarkMode && "bg-dark-900"
            } border px-1 lg:px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 w-full lg:w-1/3 disabled:cursor-not-allowed`}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            disabled={isUpdating}
          />
        </div>
        <div className="w-full grid grid-cols-[4rem_auto] lg:grid-cols-[9.375rem_auto] gap-3 lg:gap-16 items-center border-b-[1.5px] py-2">
          <label htmlFor="avatar">Avatar image</label>
          <input
            type="file"
            className="text-xs lg:text-base rounded border-none file:font-inherit file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded file:border-none file:text-white file:bg-accent-500 file:cursor-pointer file:transition-colors file:hover:bg-accent-600 disabled:cursor-not-allowed"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            id="avatar"
            disabled={isUpdating}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className={`${
              isDarkMode
                ? "bg-dark-800 hover:bg-dark-900"
                : "bg-gray-100 hover:bg-gray-200"
            } py-1 px-2 lg:px-4 lg:py-2 border rounded-md  transition-colors duration-300 disabled:cursor-not-allowed`}
            disabled={isUpdating}
            type="reset"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="py-1 px-2 lg:px-4 lg:py-2 border rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={isUpdating}
          >
            Update account
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
