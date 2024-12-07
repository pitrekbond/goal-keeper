import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditNote } from "../../services/apiNotes";

export function useEditNote() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editNote } = useMutation({
    mutationFn: ({ newNoteData, id }) => createEditNote(newNoteData, id),
    onSuccess: () => {
      toast.success("Note successfully edited");
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editNote };
}
