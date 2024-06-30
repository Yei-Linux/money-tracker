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

export type TransactionsGroup = Record<string, Array<TTransaction>>;
