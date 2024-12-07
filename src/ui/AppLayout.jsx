import { Outlet } from "react-router-dom";
import PageNav from "./PageNav";
import Header from "./Header";
import { useDarkMode } from "../context/DarkModeContext";

export default function AppLayout() {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`grid h-screen grid-cols-[7.5rem_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[18rem_1fr] grid-rows-[auto_1fr] overflow-hidden ${
        isDarkMode ? "bg-dark-900" : "bg-gray-200"
      }`}
    >
      <aside className="row-span-2 flex flex-col overflow-y-auto">
        <PageNav />
      </aside>
      <Header />
      <main className="col-start-2 rounded-md mb-6 gap-3 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
