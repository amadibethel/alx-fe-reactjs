import { useQuery, useQueryClient } from 'react-query';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuery('posts', fetchPosts, {
    // keep old data while refetching for smooth UI
    keepPreviousData: true,
    // only for display brevity; feel free to remove
    select: (posts) => posts.slice(0, 10),
  });

  const lastUpdated =
    dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '—';

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Posts</h2>
        {isFetching && <small>(background fetching…)</small>}
      </div>

      <div style={{ margin: '12px 0', display: 'flex', gap: 8 }}>
        <button onClick={() => refetch()}>Refetch now</button>
        <button onClick={() => queryClient.invalidateQueries('posts')}>
          Invalidate cache (force refresh on next mount/refetch)
        </button>
        <span style={{ marginLeft: 'auto', color: '#555' }}>
          Last updated: {lastUpdated}
        </span>
      </div>

      {isLoading && <p>Loading…</p>}
      {isError && <p style={{ color: 'crimson' }}>{error.message}</p>}

      {data && (
        <ol>
          {data.map((p) => (
            <li key={p.id} style={{ marginBottom: 8 }}>
              <strong>#{p.id}:</strong> {p.title}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
