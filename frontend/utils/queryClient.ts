// utils/queryClient.ts
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
    },
  },
});

// hooks/useBlogs.ts
import { useQuery } from 'react-query';
import { api } from '../utils/api';

export function useBlogs() {
  return useQuery('blogs', api.getAllBlogs, {
    onError: (error) => {
      console.error('Error fetching blogs:', error);
    },
  });
}
