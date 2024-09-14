export type TTransactionStats = Array<{
  _id: string;
  type: string;
  value: number;
  theme: string;
  length: number;
}>;

export type TTransactionStatItem = TTransactionStats[number];
