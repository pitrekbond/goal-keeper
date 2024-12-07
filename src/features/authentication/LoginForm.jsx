import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <form
      className="w-full max-w-[23rem] lg:max-w-[31.25rem] px-8 py-6 border-[1.5px] border-gray-200 bg-gray-50 rounded-md overflow-hidden text-xl flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm" htmlFor="email">
          Email address
        </label>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-500 text-sm"
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="bg-accent-500 rounded-md py-2 px-4 text-white hover:bg-accent-600 transition-colors duration-300 flex items-center justify-center gap-2 w-full min-w-[150px] min-h-[45px]">
        {!isLoading ? "Log in" : <SpinnerMini />}
      </button>
    </form>
  );
}

export default LoginForm;
