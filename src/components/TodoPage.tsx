import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries";
import {
  useUpdateTodo,
  useCreateTodo,
  useDeleteTodo,
} from "../services/mutation";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Todo } from "../types/todo";

export default function Page() {
  const query = useTodosIds();
  // this is a global state that react query provide to us to know if there is any query in pending mode or not
  const isFetching = useIsFetching();
  const queries = useTodos(query.data);

  const createMutation = useCreateTodo();
  const { register, handleSubmit } = useForm<Todo>();
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createMutation.mutate(data);
  };

  const updateMutation = useUpdateTodo();
  const handleMarkedAsCompletedSubmit = (data: Todo | undefined) => {
    if (data) {
      updateMutation.mutate({ ...data, completed: true });
    }
  };

  const deleteMutation = useDeleteTodo();
  const handleDeleteSubmit = (id: number) => {
    deleteMutation.mutate(id);
  };
  // const handleDeleteSubmit = async (id: number) => {
  //   await deleteMutation.mutateAsync(id);
  //   consoole.log("success");
  // };

  return (
    <>
      {/*
     a function of a query that responsible for talking to the backend 
     which return a promise 
     */}
      <p>Query function status : {query.fetchStatus}</p>
      {/* 
      status about data which is success , pending or error mode
      */}
      <p>Query function data status : {query.status}</p>
      <p>Global isFetching: {isFetching}</p>
      <hr />
      {query.isPending && <span>Loading...</span>}
      {query.isError && <span>Error: {query.error.message} </span>}
      {query.isSuccess && (
        <>
          <h4>Todos Id :</h4>
          {query.data?.join(", ")}
        </>
      )}
      <hr />

      <ul>
        {queries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title: </strong> {data?.title}{" "}
            </span>
            <button
              onClick={() => handleMarkedAsCompletedSubmit(data)}
              disabled={data?.completed}
            >
              {data?.completed ? "Completed" : "Mark as completed"}
            </button>
            {data?.id && (
              <button onClick={() => handleDeleteSubmit(data.id!)}>
                Delete
              </button>
            )}
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
