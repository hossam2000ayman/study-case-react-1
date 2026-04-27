import axios from "axios";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
});

export async function getTodos() {
  const response = await api.get<Todo[]>("/todos");
  return response.data;
}

export async function createTodo(data: CreateTodoInput) {
  const response = await api.post<Todo>("/todos", data);
  return response.data;
}

export async function updateTodo(data: UpdateTodoInput) {
  const { id, ...payload } = data;
  const response = await api.patch<Todo>(`/todos/${id}`, payload);
  return response.data;
}

export async function deleteTodo(id: number) {
  await api.delete(`/todos/${id}`);
}
