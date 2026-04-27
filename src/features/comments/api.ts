import axios from "axios";
import type { Comment } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
});

export async function getComments(page: number, size: number) {
  const response = await api.get<Comment[]>("/comments", {
    params: { page, size },
  });

  return response.data;
}
