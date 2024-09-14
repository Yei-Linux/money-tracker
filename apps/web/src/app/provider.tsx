'use client';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';

import { SessionProvider } from 'next-auth/react';
import { TCategories } from '@moneytrack/web/types/categories';
import { TTransactionTypes } from '@moneytrack/web/types/transaction-types';
import { useInitTransactionStore } from '@moneytrack/web/hooks/useInitTransactionStore';
import { SessionWrapper } from '@moneytrack/web/components/modules/@shared/Auth/SessionWrapper';

//TODO: Remove this any type
type Providers = {
  categories: TCategories;
  transactionTypes: TTransactionTypes;
  children?: any;
};

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
