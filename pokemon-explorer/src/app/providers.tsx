'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { FIVE_MINUTES, TEN_MINUTES, DEFAULT_RETRY_ATTEMPTS } from '@/lib/constants/reactQuery';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: FIVE_MINUTES,
            gcTime: TEN_MINUTES,
            retry: DEFAULT_RETRY_ATTEMPTS,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
