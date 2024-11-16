export type TTransactionStats = Array<{
  _id: string;
  type: string;
  value: number;
  theme: string;
  length: number;
  trend?: {
    direction: 'up' | 'down';
    percent: number;
  };
}>;

export type TTransactionStatItem = TTransactionStats[number];
