import { getStartEndDateByMonth } from '../lib/date';
import { historyMoneySettingsModel } from '../models';

export const getExpenseLimitIncomeGoalsByMonth = async (
  moneyAccount: string,
  monthDate: Date
) => {
  const { startDate, endDate } = getStartEndDateByMonth(monthDate);

  const historyModelSettings = await historyMoneySettingsModel
    .findOne({
      moneyAccount,
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .select({
      expenseLimit: true,
      incomeGoal: true,
    });

  if (!historyModelSettings) return { expenseLimit: 0, incomeGoal: 0 };

  return {
    expenseLimit: +historyModelSettings.expenseLimit,
    incomeGoal: +historyModelSettings.incomeGoal,
  };
};

export const upsertExpenseLimitOrIncomeGoalByMonth = async (
  moneyAccount: string,
  monthDate: Date,
  type: 'expenseLimit' | 'incomeGoal',
  value: number
) => {
  const { startDate, endDate } = getStartEndDateByMonth(monthDate);

  const historyModelSettings = await historyMoneySettingsModel
    .findOne({
      moneyAccount,
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .select({ _id: true });

  if (!historyModelSettings) {
    await historyMoneySettingsModel.create({ moneyAccount, [type]: value });
    return;
  }

  await historyMoneySettingsModel.updateOne(
    { id: historyModelSettings._id },
    { moneyAccount, [type]: value }
  );
};
