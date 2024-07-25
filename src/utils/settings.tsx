import { AtomIcon, EyeIcon, LucideEyeOff } from 'lucide-react';

export const SettingOptions = {
  ExpenseLimit: {
    variant: 'primary' as const,
    title: 'My Expense Limit',
    description: 'By month!',
    Icon: LucideEyeOff,
    settingValue: '90%',
  },
  IncomeGoal: {
    variant: 'secondary' as const,
    title: 'My Icome Goal',
    description: 'By month!',
    Icon: AtomIcon,
    settingValue: '90%',
  },
  ExpenseWatch: {
    variant: 'tertiary' as const,
    title: 'My Expense Watcher',
    description: 'By month!',
    Icon: EyeIcon,
    settingValue: '',
  },
};
