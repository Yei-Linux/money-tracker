export const TransactionTypeIds = {
  Income: '668157bc20b65bf13bb8ca8c',
  Expense: '668157c11ca7d7a74dcb6cac',
  Investment: '668157c11ca7d7a74dcb6cad',
  Savings: '668157c11ca7d7a74dcb6cae',
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
    _id: TransactionTypeIds.Investment,
    type: '↗️ Investment',
    theme: 'purple',
  },
  {
    _id: TransactionTypeIds.Savings,
    type: '↗️ Savings',
    theme: 'sunny',
  },
];
