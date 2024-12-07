import { useForm } from "react-hook-form";
import Error from "./../../ui/Error";
import { useUpdateUser } from "./useUpdateUser";
import { useMediaQuery } from "react-responsive";

function UpdatePasswordForm({ isDarkMode }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isUpdating } = useUpdateUser();
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  function onSubmit({ password }) {
    updateUser({ password }, { onSettled: () => reset() });
  }

  return (
    <div className="mx-2 my-6 lg:mr-16 pt-2 flex flex-col gap-3 lg:ml-5 max-[640px]:text-sm">
      <h3
        className={`${
          isDarkMode && "text-white"
        } text-xl font-semibold max-[640px]:ml-2`}
      >
        Update password
      </h3>
      <form
        className={`${
          isDarkMode ? "bg-dark-800 text-white" : "bg-gray-100"
        } w-full  rounded-md flex flex-col gap-4 px-4 lg:px-8 py-6`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full grid grid-cols-[4rem_auto] lg:grid-cols-[9.375rem_auto] gap-3 lg:gap-16 items-center border-b-[1.5px] py-2">
          <label htmlFor="password">New password (min. 8 chars)</label>
          <div className="flex items-center gap-8">
            <input
              className={`${
                isDarkMode && "bg-dark-900"
              } border px-1 lg:px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 w-full lg:w-1/3`}
              type="password"
              id="password"
              disabled={isUpdating}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
            {isLargeScreen && errors?.password?.message && (
              <Error>{errors.password.message}</Error>
            )}
          </div>
        </div>
        <div className="w-full grid grid-cols-[4rem_auto] lg:grid-cols-[9.375rem_auto] gap-3 lg:gap-16 items-center border-b-[1.5px] py-2">
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="flex items-center gap-8">
            <input
              className={`${
                isDarkMode && "bg-dark-900"
              } border px-1 lg:px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 w-full lg:w-1/3`}
              type="password"
              id="confirmPassword"
              disabled={isUpdating}
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
            {isLargeScreen && errors?.confirmPassword?.message && (
              <Error>{errors.confirmPassword.message}</Error>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className={`${
              isDarkMode
                ? "bg-dark-800 hover:bg-dark-900"
                : "bg-gray-100 hover:bg-gray-200"
            } py-1 px-2 lg:px-4 lg:py-2 border rounded-md transition-colors duration-300 disabled:cursor-not-allowed`}
            disabled={isUpdating}
            type="reset"
            onClick={reset}
          >
            Cancel
          </button>
          <button
            className="py-1 px-2 lg:px-4 lg:py-2 border rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={isUpdating}
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
