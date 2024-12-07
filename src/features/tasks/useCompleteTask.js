import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTask as completeTaskApi } from "../../services/apiTasks";
import toast from "react-hot-toast";

export function useCompleteTask() {
  const queryClient = useQueryClient();

  const { isLoading: isCompleting, mutate: completeTask } = useMutation({
    mutationFn: completeTaskApi,
    onSuccess: () => {
      toast.success("Task successfully completed");
      queryClient.invalidateQueries({
        queryKey: ["task"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCompleting, completeTask };
}
