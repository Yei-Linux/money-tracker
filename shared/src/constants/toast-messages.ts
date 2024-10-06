export const toastMessages = {
  SIGN_IN_SUCCESS: 'Login successfull',
  SIGN_IN_ERROR_WHEN_IS_GENERAL_ERROR: 'Invalid Credentials',
  SIGN_IN_ERROR_WHEN_CREDENTIALS_ARE_INCORRET: 'Invalid Credentials',
  SIGN_UP_SUCCESS: 'You account was created successfuly',
  SIGN_UP_ERROR: 'This user already exists',
  CREATE_TRANSACTION_SUCCESS: 'Your transaction was added sucessfully',
  CREATE_TRANSACTION_ERROR_WHEN_YOU_DONT_HAVE_MONEY_ACCOUNT:
    'You don have money to do this transaction',
  CREATE_TRANSACTION_ERROR_WHEN_YOU_DONT_HAVE_ENOUGH_MONEY:
    "You don't have a money account to do this transaction",
  CREATE_TRANSACTION_ERROR_WHEN_GENERAL_ERROR_HAPPENED:
    'Ocurred an unexpected error doing this transaction',
  SET_EXPENSE_LIMIT_SUCCESS: 'Expense Limit updated successfuly',
  SET_EXPENSE_LIMIT_NOT_MONEY_ERROR: 'You dont have a money account',
  SET_EXPENSE_LIMIT_NEEDS_TO_BE_GREATER_ERROR:
    'Your expense limit needs to be greater than your current expenses',

  SET_INCOME_GOAL_SUCCESS: 'Incomes Goal updated successfuly',
  SET_INCOME_GOAL_NOT_MONEY_ERROR: 'You dont have a money account',
  SET_INCOME_GOAL_NEEDS_TO_BE_GREATER_ERROR:
    'Your incomes Goal needs to be greater than your current incomes',

  EXPENSE_WATCHER_ENABLED: 'You just activate your watcher!',
  EXPENSE_WATCHER_DISABLED: 'You just disactivate your watcher!',
};
