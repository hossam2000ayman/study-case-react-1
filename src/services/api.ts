import axios from "axios";
import type { Todo } from "../types/todo";
import type { Comment } from "../types/comment";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data.map((todo) => todo.id!);
};

export const getTodoById = async (id: number) => {
  const response = await axiosInstance.get<Todo>(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (data: Todo) => {
  const response = await axiosInstance.post<Todo>("/todos", data);
  return response.data;
};

export const updateTodo = async (data: Todo) => {
  const response = await axiosInstance.put<Todo>(`/todos/${data.id}`, data);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`/todos/${id}`);
};

export const getComments = async (page = 0) => {
  const response = await axiosInstance.get<Comment[]>(
    `/comments?page=${page}&size=10`,
  );
  return response.data;
};
