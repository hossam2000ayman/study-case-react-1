import { useIsFetching } from "@tanstack/react-query";
import {
  useCreateTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "../features/todos/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateTodoInput, Todo } from "../features/todos/types";

export default function TodoPage() {
  const todosQuery = useTodos();
  const isFetching = useIsFetching();
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const { register, handleSubmit, reset } = useForm<CreateTodoInput>({
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  const handleCreateTodoSubmit: SubmitHandler<CreateTodoInput> = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const handleMarkedAsCompletedSubmit = (todo: Todo) => {
    updateMutation.mutate({ id: todo.id, completed: true });
  };

  const handleDeleteSubmit = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <h2>Todos</h2>
      <p>Query function status: {todosQuery.fetchStatus}</p>
      <p>Query function data status: {todosQuery.status}</p>
      <p>Global isFetching: {isFetching}</p>
      <hr />
      {todosQuery.isPending && <span>Loading...</span>}
      {todosQuery.isError && <span>Error: {todosQuery.error.message}</span>}

      <ul>
        {todosQuery.data?.map((todo) => (
          <li key={todo.id}>
            <div>Id: {todo.id}</div>
            <span>
              <strong>Title: </strong> {todo.title}{" "}
            </span>
            <button
              onClick={() => handleMarkedAsCompletedSubmit(todo)}
              disabled={todo.completed || updateMutation.isPending}
            >
              {todo.completed ? "Completed" : "Mark as completed"}
            </button>
            <button
              onClick={() => handleDeleteSubmit(todo.id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo</h4>
        <input type="text" placeholder="Title" {...register("title")} />
        <br />
        <label>Mark As Completed: </label>
        <input type="checkbox" {...register("completed")} />
        <br />
        <input
          type="submit"
          disabled={createMutation.isPending}
          value={createMutation.isPending ? "Creating ..." : "Create todo"}
        />
      </form>
    </>
  );
}
