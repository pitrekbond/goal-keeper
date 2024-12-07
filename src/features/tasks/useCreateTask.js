import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditTask } from "../../services/apiTasks";
import toast from "react-hot-toast";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createTask } = useMutation({
    mutationFn: createEditTask,
    onSuccess: () => {
      toast.success("Task successfully created");
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTask };
}
