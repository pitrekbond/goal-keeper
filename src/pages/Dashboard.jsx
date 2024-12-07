import { useDarkMode } from "../context/DarkModeContext";
import { useUser } from "../features/authentication/useUser";
import Calendar from "../features/dashboard/Calendar";
import NewestNotes from "../features/dashboard/NewestNotes";
import Statistics from "../features/dashboard/Statistics";
import UpcomingTasks from "../features/dashboard/UpcomingTasks";
import Spinner from "../ui/Spinner";

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const { isDarkMode } = useDarkMode();
  if (isLoading) return <Spinner />;

  const { fullName } = user.user_metadata;

  return (
    <div className="mr-[15px]">
      <div className="flex items-center justify-between mt-1 lg:mt-4 mx-4">
        <h1
          className={`${
            isDarkMode && "text-white"
          } text-2xl lg:text-3xl font-semibold`}
        >
          Hello {fullName}
        </h1>
      </div>
      <div className="flex flex-col gap-6 pt-2 m-4">
        <div className="flex flex-col md:flex-row gap-6 max-[640px]:items-center">
          <UpcomingTasks className="flex-1" userId={user.id} />
          <NewestNotes />
          <div className="hidden xl:block flex-1">
            <Calendar />
          </div>
        </div>
        <Statistics userId={user.id} />
      </div>
    </div>
  );
}
