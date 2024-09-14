import { MoneyCurrency } from '@moneytrack/web/components/modules/@shared/MoneyCurrency';
import { Badge } from '@moneytrack/web/components/ui/badge';
import { SettingsOptionsKeys } from '@moneytrack/web/constants';
import { cn } from '@moneytrack/web/lib/utils';
import { FC, Fragment, PropsWithChildren } from 'react';

type ContentLayout = PropsWithChildren;
const ContentLayout: FC<ContentLayout> = ({ children }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

type HeaderLayout = PropsWithChildren;
const HeaderLayout: FC<HeaderLayout> = ({ children }) => (
  <div className="flex justify-between">{children}</div>
);

type SettingValue = {
  percent: number;
  description: string;
  type: string;
};
const SettingValue: FC<SettingValue> = ({ percent, description, type }) => (
  <div className="flex flex-col items-end">
    <p className="font-semibold text-xl">
      {percent}%{' '}
      {percent === 100 && (
        <span> {type === SettingsOptionsKeys.IncomeGoal ? '✅' : '⛔'} </span>
      )}
    </p>
    <p className="text-[10px]">{description}</p>
  </div>
);

type Title = PropsWithChildren;
const Title: FC<Title> = ({ children }) => (
  <p className="font-bold text-left text-md min-w-[170px]">{children}</p>
);

type Description = PropsWithChildren;
const Description: FC<Description> = ({ children }) => (
  <p className="text-left text-xs">{children}</p>
);

type GoalWithCurrentResult = {
  goal: number;
  currentResult: number;
};
const GoalWithCurrentResult: FC<GoalWithCurrentResult> = ({
  goal,
  currentResult,
}) => (
  <Badge className="flex gap-1 font-semibold shadow-md">
    <MoneyCurrency money={currentResult} variant="sm" />
    <span>/</span>
    <MoneyCurrency money={goal} variant="sm" />
  </Badge>
);

const variants = {
  primary: { bgCard: 'bg-success', bgIcon: 'bg-white' },
  secondary: { bgCard: 'bg-muted', bgIcon: 'bg-white' },
  tertiary: { bgCard: 'bg-sunny', bgIcon: 'bg-white' },
};
type Variants = keyof typeof variants;

type Icon = PropsWithChildren<{ variant: Variants }>;
const Icon: FC<Icon> = ({ children, variant }) => {
  const bg = variants[variant].bgIcon;
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden shadow-lg w-[36px] h-[36px] p-2',
        bg
      )}
    >
      {children}
    </div>
  );
};

type ComposeSettingCard = {
  Title: typeof Title;
  Description: typeof Description;
  Icon: typeof Icon;
  ContentLayout: typeof ContentLayout;
  HeaderLayout: typeof HeaderLayout;
  SettingValue: typeof SettingValue;
  GoalWithCurrentResult: typeof GoalWithCurrentResult;
};
type SettingCard = PropsWithChildren<{
  variant: Variants;
  className?: string;
  ComponentWrapper?: React.ElementType;
  goal?: number;
}>;

export const SettingCard: FC<SettingCard> & ComposeSettingCard = ({
  children,
  variant,
  className,
  ComponentWrapper,
  goal,
}) => {
  const bg = variants[variant].bgCard;
  const Wrapper = ComponentWrapper ?? Fragment;

  return (
    <Wrapper {...(ComponentWrapper ? { goal } : {})}>
      <div
        className={cn(
          'flex flex-col gap-6 rounded-2xl p-4 shadow-md min-w-[250px]',
          bg,
          className
        )}
      >
        {children}
      </div>
    </Wrapper>
  );
};

SettingCard.Title = Title;
SettingCard.Description = Description;
SettingCard.Icon = Icon;
SettingCard.ContentLayout = ContentLayout;
SettingCard.HeaderLayout = HeaderLayout;
SettingCard.SettingValue = SettingValue;
SettingCard.GoalWithCurrentResult = GoalWithCurrentResult;
