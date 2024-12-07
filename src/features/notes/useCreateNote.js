import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditNote } from "../../services/apiNotes";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createNote } = useMutation({
    mutationFn: createEditNote,
    onSuccess: () => {
      toast.success("Note successfully created");
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNote };
}
