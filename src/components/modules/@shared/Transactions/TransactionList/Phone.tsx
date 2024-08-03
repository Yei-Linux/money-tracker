import { FC } from 'react';
import { PhoneTransactionItem } from './PhoneTransactionItem';
import { TransactionsHomeContent } from './type';

type TransactionsPhone = TransactionsHomeContent;

export const TransactionsPhone: FC<TransactionsPhone> = ({ transactions }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      {transactions?.map((transaction) => (
        <PhoneTransactionItem {...transaction} key={transaction._id} />
      ))}
    </div>
  );
};
