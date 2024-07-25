import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type ContentLayout = PropsWithChildren;
export const ContentLayout: FC<ContentLayout> = ({ children }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

type HeaderLayout = PropsWithChildren;
export const HeaderLayout: FC<HeaderLayout> = ({ children }) => (
  <div className="flex justify-between">{children}</div>
);

type SettingValue = PropsWithChildren;
export const SettingValue: FC<SettingValue> = ({ children }) => (
  <div className="flex flex-col items-end">
    <p className="font-semibold text-xl">{children}</p>
    <p className="text-[8px]">Achieved</p>
  </div>
);

type Title = PropsWithChildren;
export const Title: FC<Title> = ({ children }) => (
  <p className="font-bold text-md min-w-[170px]">{children}</p>
);

type Description = PropsWithChildren;
export const Description: FC<Description> = ({ children }) => (
  <p className="text-xs">{children}</p>
);

const variants = {
  primary: { bgCard: 'bg-success', bgIcon: 'bg-white' },
  secondary: { bgCard: 'bg-muted', bgIcon: 'bg-white' },
  tertiary: { bgCard: 'bg-purple', bgIcon: 'bg-white' },
};
type Variants = keyof typeof variants;

type Icon = PropsWithChildren<{ variant: Variants }>;
export const Icon: FC<Icon> = ({ children, variant }) => {
  const bg = variants[variant].bgIcon;
  return (
    <div className={cn('rounded-full overflow-hidden shadow-lg w-fit p-2', bg)}>
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
};
type SettingCard = PropsWithChildren<{
  variant: Variants;
}>;

export const SettingCard: FC<SettingCard> & ComposeSettingCard = ({
  children,
  variant,
}) => {
  const bg = variants[variant].bgCard;
  return (
    <div className={cn('flex flex-col gap-6 rounded-2xl p-4 shadow-md', bg)}>
      {children}
    </div>
  );
};

SettingCard.Title = Title;
SettingCard.Description = Description;
SettingCard.Icon = Icon;
SettingCard.ContentLayout = ContentLayout;
SettingCard.HeaderLayout = HeaderLayout;
SettingCard.SettingValue = SettingValue;
