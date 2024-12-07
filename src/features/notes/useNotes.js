import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/apiNotes";

export function useNotes(userId) {
  const { isLoading: isLoadingNotes, data: notes } = useQuery(
    ["note"], // Add userId to the query key for cache management
    () => getNotes(userId) // Pass userId to getTasks function within the queryFn
  );

  return { isLoadingNotes, notes };
}
