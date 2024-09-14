export type TTransaction = {
  _id: string;
  title: string;
  price: number;
  description: string;

  category: {
    _id: string;
    category: string;
  };
  transactionType: {
    _id: string;
    type: string;
  };
  createdAt: Date;
};

export type TransactionApiResponse<T> = {
  transactions: T;
  nextCursor: boolean;
};

export type TransactionsGroup = TransactionApiResponse<
  Record<string, Array<TTransaction>>
>;

export type TransactionsShortResume = TransactionApiResponse<
  Array<TTransaction>
>;

export type TFilterKeys = 'category' | 'transactionType';
export type TFilterKeysTransactionsAPI = TFilterKeys | 'user';

export type TGetTransactionService<T> = (filters: FormData) => Promise<T>;
