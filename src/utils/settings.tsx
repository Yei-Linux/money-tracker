import { MoneyAccountSettings } from '@/types/settings';
import { AtomIcon, EyeIcon, LucideEyeOff } from 'lucide-react';

export const SettingOptions = ({
  expenseLimit,
  incomeGoal,
  watcherLimit,
}: MoneyAccountSettings) => ({
  ExpenseLimit: {
    variant: 'primary' as const,
    title: 'My Expense Limit',
    description: expenseLimit?.goal
      ? 'This month:'
      : 'You can active it just setting your limit!',
    Icon: LucideEyeOff,
    settingDescription: 'Of your limit',
    settingValue: expenseLimit?.settingsValue,
    currentResult: expenseLimit?.currentResult,
    goal: expenseLimit?.goal,
    watcherLimit: undefined,
  },
  IncomeGoal: {
    variant: 'secondary' as const,
    title: 'My Icome Goal',
    description: incomeGoal?.goal
      ? 'This month:'
      : 'You can active it just setting your goal!',
    Icon: AtomIcon,
    settingDescription: 'Achieved',
    settingValue: incomeGoal?.settingsValue,
    currentResult: incomeGoal?.currentResult,
    goal: incomeGoal?.goal,
    watcherLimit: undefined,
  },
  ExpenseWatch: {
    variant: 'tertiary' as const,
    title: 'My Expense Watcher',
    description: 'By month!',
    Icon: EyeIcon,
    settingValue: undefined,
    settingDescription: undefined,
    currentResult: undefined,
    goal: undefined,
    watcherLimit,
  },
});
