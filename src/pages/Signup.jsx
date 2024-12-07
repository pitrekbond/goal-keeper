import SignupForm from "../features/authentication/SignupForm";
import LogoBright from "../ui/LogoBright";

function Signup() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 leading-relaxed text-gray-700">
      <LogoBright />
      <h1 className="text-3xl font-semibold text-center mt-2 mb-4">Sign up</h1>
      <SignupForm />
    </main>
  );
}

export default Signup;
