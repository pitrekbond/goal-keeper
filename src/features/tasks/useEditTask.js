import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditTask } from "../../services/apiTasks";
import toast from "react-hot-toast";

export function useEditTask() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTask } = useMutation({
    mutationFn: ({ newTaskData, id }) => createEditTask(newTaskData, id),
    onSuccess: () => {
      toast.success("Task successfully edited");
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editTask };
}
