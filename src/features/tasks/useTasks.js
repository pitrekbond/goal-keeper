import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/apiTasks";

export function useTasks(userId) {
  const { isLoading: isLoadingTasks, data: tasks } = useQuery(
    ["task"], // Add userId to the query key for cache management
    () => getTasks(userId) // Pass userId to getTasks function within the queryFn
  );

  return { isLoadingTasks, tasks };
}
