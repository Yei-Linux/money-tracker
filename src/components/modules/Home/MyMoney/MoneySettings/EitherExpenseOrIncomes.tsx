import { SettingOptionsValues } from '@/types/settings';
import { SettingCard } from './SettingCard';
import { FC } from 'react';

type EitherExpenseOrLimit = Pick<
  SettingOptionsValues,
  'description' | 'goal' | 'currentResult'
>;

export const EitherExpenseOrLimit: FC<EitherExpenseOrLimit> = ({
  description,
  goal,
  currentResult,
}) => (
  <div className="flex justify-between items-center">
    <SettingCard.Description>{description}</SettingCard.Description>

    {!!goal && (
      <SettingCard.GoalWithCurrentResult
        goal={goal}
        currentResult={currentResult ?? 0}
      />
    )}
  </div>
);
