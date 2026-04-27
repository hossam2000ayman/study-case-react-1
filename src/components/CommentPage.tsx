import { useState } from "react";
import { useComments } from "../features/comments/hooks";

const PAGE_SIZE = 10;

export default function CommentPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useComments(page, PAGE_SIZE);

  return (
    <div>
      <h2>Comments</h2>
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.map((comment) => (
            <article key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
              {comment.email && <small>{comment.email}</small>}
            </article>
          ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || (data?.length ?? 0) < PAGE_SIZE}
      >
        Next Page
      </button>
      {isFetching ? <span>Loading ...</span> : null}{" "}
    </div>
  );
}
