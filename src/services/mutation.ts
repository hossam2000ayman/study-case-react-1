import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    //(Powerful point about tanstack/query) we can simple intercept our mutation function at any of its lifecycle

    // (1) this function will be called before the mutation function is called
    onMutate: () => {
      console.log("mutation is starting");
    },
    // (2) this function will be called if the mutation function is failed
    onError: () => {
      console.log("mutation is failed");
    },
    // (3) this function will be called if the mutation function is successful
    onSuccess: () => {
      console.log("mutation is successful");
    },
    // (4) this function will be called when the mutation function is either successful or failed
    // data: the mutation function returns
    // error: the error that the mutation function throws
    // variables: the variables that we pass to the mutation function
    onSettled: async (_data, error, _variables) => {
      console.log("mutation is settled");
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    // variables: arguments of mutation function
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }], // dynamic query key
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      console.log("Todo deleted successfully");
    },
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
