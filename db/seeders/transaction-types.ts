export const TransactionTypeIds = {
  Income: '668157bc20b65bf13bb8ca8c',
  Expense: '668157c11ca7d7a74dcb6cac',
};

export const transactionTypesSeeder = [
  {
    _id: TransactionTypeIds.Income,
    type: '↗️ Income',
    theme: 'success',
  },
  {
    _id: TransactionTypeIds.Expense,
    type: '↙️ Expense',
    theme: 'danger',
  },
  {
    _id: '668157c11ca7d7a74dcb6cad',
    type: '↗️ Investment',
    theme: 'purple',
  },
  {
    _id: '668157c11ca7d7a74dcb6cae',
    type: '↗️ Savings',
    theme: 'sunny',
  },
];
