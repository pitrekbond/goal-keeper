import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";
import Error from "../../ui/Error";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <form
      className="w-full max-w-[22.5rem]  lg:max-w-[31.25rem] px-8 py-6 border-[1.5px] border-gray-200 bg-gray-50 rounded-md overflow-hidden text-xl flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm" htmlFor="fullName">
            Full name
          </label>
          {errors?.fullName?.message && (
            <Error>{errors.fullName.message}</Error>
          )}
        </div>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="fullName"
          type="text"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm" htmlFor="email">
            Email address
          </label>
          {errors?.email?.message && <Error>{errors.email.message}</Error>}
        </div>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="email"
          type="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </div>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="password"
          type="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm" htmlFor="repeatPassword">
            Repeat password
          </label>
          {errors?.repeatPassword?.message && (
            <Error>{errors.repeatPassword.message}</Error>
          )}
        </div>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="repeatPassword"
          type="password"
          disabled={isLoading}
          {...register("repeatPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </div>

      <div className="flex justify-between">
        <button
          className="bg-accent-500 rounded-md py-2 px-4 text-white hover:bg-accent-600 transition-colors duration-300 flex items-center justify-center min-w-[150px] min-h-[45px]"
          type="submit"
          disabled={isLoading}
        >
          Create new user
        </button>
        <button
          className="rounded-md border border-gray-300 px-4 py-2 text-[1rem] hover:bg-gray-100 transition-colors"
          onClick={() => navigate(-1)}
          type="button"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
