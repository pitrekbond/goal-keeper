import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "../../services/apiTasks";
import toast from "react-hot-toast";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTask } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success("Task successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTask };
}
