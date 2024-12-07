import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  //2. If there's no authenticated user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  //3. While loading, show spinner (navigate can only be used inside other function or inside useEffect)
  if (isLoading)
    return (
      <div className="h-screen bg-gray-50 items-center justify-center">
        <Spinner />
      </div>
    );

  //4. If there's a user, render the app
  if (isAuthenticated) return children;
}
