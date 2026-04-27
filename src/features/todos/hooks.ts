import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
