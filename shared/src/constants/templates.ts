type ExpenseLimitEmailTemplate = {
  userName: string;
  monthExpenses: number;
  percentExpensesLimit: number;
  transactionExpenseName?: string;
};

const getTemplateMessageForExpenseLimit = (
  percentExpensesLimit: ExpenseLimitEmailTemplate['percentExpensesLimit']
) => {
  if (percentExpensesLimit >= 100)
    return 'You are still doing transactions but your expense limit was surpassed 💀';

  if (percentExpensesLimit >= 80)
    return `You are close to surpassed the limit 🫠. Plese take into account that your expense limit are in ${percentExpensesLimit}%`;

  return `Plese take into account that your expense limit are in ${percentExpensesLimit}% 😉`;
};

export const expenseLimitEmailTemplate = ({
  userName,
  monthExpenses,
  percentExpensesLimit,
  transactionExpenseName,
}: ExpenseLimitEmailTemplate) => {
  const message = getTemplateMessageForExpenseLimit(percentExpensesLimit);

  return `
    Hello ${userName}. ${
    transactionExpenseName
      ? `You have made a new expense: ${transactionExpenseName}.`
      : ''
  } 
    Your current expenses in total of the month are $${monthExpenses}. 
    ${message}
`;
};
