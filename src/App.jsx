import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import UserSettings from "./pages/UserSettings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { OpenModalProvider } from "./context/OpenModalContext";
import { OpenNoteProvider } from "./context/OpenNoteContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import { DarkModeProvider } from "./context/DarkModeContext";

//staletime - the amount of time that the data in the cache will stay fresh (valid until it is re-fetched again)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <OpenModalProvider>
        <OpenNoteProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                {/*layout route - all the routes below are rendered inside the layout. It doesnt have the path prop  */}
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/*Index Route is the default child route that is going to be matched if none of the other routes matches */}
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="settings" element={<UserSettings />} />
                  <Route path="notes" element={<Notes />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>

            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                  style: {
                    backgroundColor: "#F44336", // Solid red for errors
                    color: "#FFFFFF", // White text
                    borderRadius: "8px", // Optional: rounded corners
                  },
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#4CAF50", // Solid green for success
                  color: "#FFFFFF", // White text
                  borderRadius: "8px", // Optional: rounded corners
                },
              }}
            />
          </QueryClientProvider>
        </OpenNoteProvider>
      </OpenModalProvider>
    </DarkModeProvider>
  );
}

export default App;
