import { useState } from 'react';
import PostsComponent from './components/PostsComponent';

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>React Query Demo: Posts</h1>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setShow((s) => !s)}>
          {show ? 'Hide Posts (unmount)' : 'Show Posts (remount)'}
        </button>
        <p style={{ color: '#555', marginTop: 8 }}>
          Tip: Hide, wait a moment, then show again within 60s to see cached data load instantly.
        </p>
      </div>

      {show && <PostsComponent />}
    </div>
  );
}
