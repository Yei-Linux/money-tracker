'use client';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';
import { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data) {
          toast.error(error.message);
        }
      },
    }),
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </SessionProvider>
  );
};
