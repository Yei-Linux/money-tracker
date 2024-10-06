import { elementTestIds } from '@moneytrack/shared/constants';
import { ExpenseLimitPopup } from '@moneytrack/web/components/modules/Home/MyMoney/MoneySettings/Popups/ExpenseLimitPopup';
import { IncomeGoalPopup } from '@moneytrack/web/components/modules/Home/MyMoney/MoneySettings/Popups/IncomeGoalPopup';
import { SettingsOptionsKeys } from '@moneytrack/web/constants';
import { MoneyAccountSettings } from '@moneytrack/web/types/settings';
import { AtomIcon, EyeIcon, WalletIcon } from 'lucide-react';

export const SettingOptions = ({
  expenseLimit,
  incomeGoal,
  watcherLimit,
}: MoneyAccountSettings) => ({
  ExpenseLimit: {
    type: SettingsOptionsKeys.ExpenseLimit,
    variant: 'secondary' as const,
    title: 'My Expense Limit',
    description: expenseLimit?.goal
      ? 'This month ➡️'
      : 'You can active it just setting your limit!',
    Icon: WalletIcon,
    settingDescription: 'Of your limit',
    settingValue: expenseLimit?.settingValue,
    currentResult: expenseLimit?.currentResult,
    goal: expenseLimit?.goal,
    watcherLimit: undefined,
    ComponentWrapper: ExpenseLimitPopup,
    dataTestIdPercent: elementTestIds.EXPENSE_LIMIT_PERCENT_CARD_ELEMENT,
    dataTestId: elementTestIds.EXPENSE_LIMIT_CURRENT_VALUE_CARD_ELEMENT,
  },
  IncomeGoal: {
    type: SettingsOptionsKeys.IncomeGoal,
    variant: 'secondary' as const,
    title: 'My Icome Goal',
    description: incomeGoal?.goal
      ? 'This month ➡️'
      : 'You can active it just setting your goal!',
    Icon: AtomIcon,
    settingDescription: 'Achieved',
    settingValue: incomeGoal?.settingValue,
    currentResult: incomeGoal?.currentResult,
    goal: incomeGoal?.goal,
    watcherLimit: undefined,
    ComponentWrapper: IncomeGoalPopup,
    dataTestIdPercent: elementTestIds.INCOME_GOAL_PERCENT_CARD_ELEMENT,
    dataTestId: elementTestIds.INCOME_GOAL_CURRENT_VALUE_CARD_ELEMENT,
  },
  ExpenseWatch: {
    type: SettingsOptionsKeys.ExpenseWatch,
    variant: 'secondary' as const,
    title: 'My Expense Watcher',
    description: 'By month!',
    Icon: EyeIcon,
    settingValue: undefined,
    settingDescription: undefined,
    currentResult: undefined,
    goal: undefined,
    watcherLimit,
    ComponentWrapper: undefined,
    dataTestIdPercent: '',
    dataTestId: elementTestIds.EXPENSE_WATCHER_CARD_ELEMENT,
  },
});
