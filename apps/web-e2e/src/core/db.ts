import {
  moneyAccountModel,
  transactionsModel,
  userModel,
} from '@moneytrack/shared/models';
import { testingInformation } from './constants';

export const resetMainTablesToTestAgainFlows = async () => {
  try {
    await transactionsModel.deleteMany();
    const user = await userModel.findOne({
      email: testingInformation.userEmail,
    });
    if (user)
      await moneyAccountModel.updateOne(
        { user: user._id },
        {
          money: 0,
          expenses: 0,
          incomes: 0,
          expenseLimit: null,
          incomeGoal: null,
          watcherLimit: false,
        }
      );
    console.log('Main Tables reseted! ✨');
  } catch (error) {
    const errorMessage = `Ocurred an unexpected error when reseting tables to start testin: ${
      (error as Error).message
    }`;
    console.warn(errorMessage);
    throw new Error(errorMessage);
  }
};
