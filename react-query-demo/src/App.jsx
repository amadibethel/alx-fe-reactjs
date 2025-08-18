import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "react-query";

// 1️⃣ Create the QueryClient
const queryClient = new QueryClient();

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// 2️⃣ Posts component demonstrating caching & refetch
function PostsComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching, dataUpdatedAt } = useQuery(
    "posts",
    fetchPosts,
    {
      keepPreviousData: true,
      staleTime: 60 * 1000, // 60s cache
    }
  );

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h2>Posts</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>{error.message}</p>}

      {data && (
        <ol>
          {data.slice(0, 10).map((post) => (
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
        <p style={{ color: "#555" }}>Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—"}</p>
        {isFetching && <small>Background fetching…</small>}
      </div>
    </div>
  );
}

// 3️⃣ App component wraps with QueryClientProvider
export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 16, fontFamily: "sans-serif" }}>
        <h1>React Query Demo</h1>
        <button onClick={() => setShowPosts((s) => !s)} style={{ marginBottom: 12 }}>
          {showPosts ? "Hide Posts (unmount)" : "Show Posts (remount)"}
        </button>
        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}
