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
import { TCategories } from '@/types/categories';
import { TTransactionTypes } from '@/types/transaction-types';
import { useInitTransactionStore } from '@/hooks/useInitTransactionStore';
import { SessionWrapper } from '@/components/modules/@shared/Auth/SessionWrapper';

type Providers = PropsWithChildren<{
  categories: TCategories;
  transactionTypes: TTransactionTypes;
}>;

export const Providers = ({
  children,
  categories,
  transactionTypes,
}: Providers) => {
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data) {
          toast.error(error.message);
        }
      },
    }),
  });

  useInitTransactionStore({ categories, transactionTypes });

  return (
    <SessionProvider>
      <SessionWrapper>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster />
      </SessionWrapper>
    </SessionProvider>
  );
};
