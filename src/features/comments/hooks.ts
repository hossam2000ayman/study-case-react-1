import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getComments } from "./api";

export function useComments(page: number, size: number) {
  return useQuery({
    queryKey: ["comments", { page, size }],
    queryFn: () => getComments(page, size),
    placeholderData: keepPreviousData,
  });
}
