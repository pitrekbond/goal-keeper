import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote as deleteNoteApi } from "../../services/apiNotes";
import toast from "react-hot-toast";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteNote } = useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: () => {
      toast.success("Note successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["note"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNote };
}
