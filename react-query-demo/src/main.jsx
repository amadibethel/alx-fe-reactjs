import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // data considered fresh for 60s (demonstrates cache → instant load on remount)
      staleTime: 60 * 1000,
      // keep cached data in memory for 5 minutes after unmount
      cacheTime: 5 * 60 * 1000,
      // keep UX predictable during demo
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
