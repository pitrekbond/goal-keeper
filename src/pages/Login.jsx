import LoginForm from "../features/authentication/LoginForm";
import { useNavigate } from "react-router-dom";
import LogoBright from "../ui/LogoBright";

function Login() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 leading-relaxed px-4 text-gray-700">
      <LogoBright />
      <h1 className="text-3xl font-semibold text-center mb-4 mt-2">
        Log in to your account
      </h1>
      <LoginForm />
      <div className="flex flex-col items-center mt-4">
        <span>Don't have an account yet?</span>
        <button
          className="underline hover:text-accent-500"
          onClick={() => navigate("/signup")}
        >
          Sign up here
        </button>
      </div>
    </main>
  );
}

export default Login;
