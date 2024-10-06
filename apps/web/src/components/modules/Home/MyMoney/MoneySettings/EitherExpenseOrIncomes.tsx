import { SettingOptionsValues } from '@moneytrack/web/types/settings';
import { SettingCard } from './SettingCard';
import { FC } from 'react';

type EitherExpenseOrIncome = Pick<
  SettingOptionsValues,
  'description' | 'goal' | 'currentResult'
> & { 'data-testid'?: string };

export const EitherExpenseOrIncome: FC<EitherExpenseOrIncome> = ({
  description,
  goal,
  currentResult,
  ...props
}) => (
  <div className="flex justify-between items-center" {...props}>
    <SettingCard.Description>{description}</SettingCard.Description>

    {!!goal && (
      <SettingCard.GoalWithCurrentResult
        goal={goal}
        currentResult={currentResult ?? 0}
      />
    )}
  </div>
);
