import { useQuery, useQueryClient } from "react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching, dataUpdatedAt } = useQuery(
    "posts",
    fetchPosts,
    {
      // Advanced caching options
      staleTime: 60 * 1000, // 60s considered fresh
      cacheTime: 5 * 60 * 1000, // 5 minutes in memory after unmount
      refetchOnWindowFocus: false, // avoids auto refetch when switching tabs
      keepPreviousData: true, // smooth UI during refetch
      select: (posts) => posts.slice(0, 10), // optional: limit posts shown
    }
  );

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h2>Posts</h2>
      {isLoading && <p>Loading…</p>}
      {isError && <p style={{ color: "red" }}>{error.message}</p>}

      {data && (
        <ol>
          {data.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong>: {post.title}
            </li>
          ))}
        </ol>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => refetch()}>Refetch Data</button>
        <button onClick={() => queryClient.invalidateQueries("posts")} style={{ marginLeft: 8 }}>
          Invalidate Cache
        </button>
        <p style={{ color: "#555" }}>Last updated: {lastUpdated}</p>
        {isFetching && <small>Background fetching…</small>}
      </div>
    </div>
  );
}
