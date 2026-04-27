import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getComments, getTodoById, getTodosIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

//I need to get todos by ids one by one so how can I do this ?
// parallel queries
export function useTodos(ids: (number | undefined)[] | undefined) {
  //if you want to fetch multiple queries that we do not know how many of them are
  //we can simply use that hooks
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", { id }], //dynamic key
        queryFn: () => getTodoById(id!),
      };
    }),
  });
}

export function useComments(page: number) {
  return useQuery({
    queryKey: ["comments", { page }],
    queryFn: () => getComments(page),
    // while the new page data is loading it will keep the previousData until the new data is loaded
    // and this will help user to not observe any gap between data transition
    placeholderData: keepPreviousData,
  });
}
