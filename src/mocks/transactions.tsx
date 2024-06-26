import { TransactionList } from '@/types/summary';

export const transactionsGroup: TransactionList = {
  Today: [
    {
      id: '1',
      category: 'Streaming',
      title: 'Netflix',
      cost: 40,
      description: 'Payment to streaming',
      date: '15-01-2024',
    },
  ],
  Yesterday: [
    {
      id: '2',
      category: 'Streaming',
      title: 'Netflix',
      cost: 40,
      description: 'Payment to streaming',
      date: '14-01-2024',
    },
    {
      id: '3',
      category: 'Streaming',
      title: 'Netflix',
      cost: 40,
      description: 'Payment to streaming',
      date: '14-01-2024',
    },
  ],
  '13 Jan, 2024': [
    {
      id: '4',
      category: 'Streaming',
      title: 'Netflix',
      cost: 40,
      description: 'Payment to streaming',
      date: '13-01-2024',
    },
  ],
};
