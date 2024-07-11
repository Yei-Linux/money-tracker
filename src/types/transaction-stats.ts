export type TTransactionStats = Array<{
  _id: string;
  type: string;
  value: number;
  theme: string;
}>;

export type TTransactionStatItem = TTransactionStats[number];
