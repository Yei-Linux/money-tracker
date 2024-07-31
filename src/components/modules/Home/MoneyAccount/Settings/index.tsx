import { SettingOptions } from '@/utils/settings';
import { SettingCard } from './SettingCard';
import { WatcherToggle } from './WatcherToggle';
import { MoneyAccountSettings } from '@/types/settings';
import { SettingsOptionsKeys } from '@/constants';
import { EitherExpenseOrLimit } from './EitherExpenseOrIncomes';

type Settings = MoneyAccountSettings;

export const Settings = (props: Settings) => {
  const settings = Object.values(SettingOptions(props));

  return (
    <div className="flex items-center gap-2 overflow-x-auto max-w-[96vw] md:justify-center md:w-full p-2">
      {settings.map(
        ({
          type,
          variant,
          title,
          description,
          Icon,
          settingDescription,
          settingValue,
          goal,
          currentResult,
          watcherLimit,
          ComponentWrapper,
        }) => (
          <SettingCard
            variant={variant}
            className={
              type !== SettingsOptionsKeys.ExpenseWatch ? 'cursor-pointer' : ''
            }
            ComponentWrapper={ComponentWrapper}
            goal={goal}
            key={type}
          >
            <SettingCard.HeaderLayout>
              <SettingCard.Icon variant={variant}>
                <Icon size={20} />
              </SettingCard.Icon>
              {settingValue !== undefined &&
                settingValue !== null &&
                settingDescription && (
                  <SettingCard.SettingValue
                    percent={settingValue}
                    description={settingDescription}
                  />
                )}
            </SettingCard.HeaderLayout>
            <SettingCard.ContentLayout>
              <SettingCard.Title>{title}</SettingCard.Title>

              {type !== SettingsOptionsKeys.ExpenseWatch ? (
                <EitherExpenseOrLimit
                  description={description}
                  goal={goal}
                  currentResult={currentResult}
                />
              ) : (
                <WatcherToggle watcherLimit={!!watcherLimit} />
              )}
            </SettingCard.ContentLayout>
          </SettingCard>
        )
      )}
    </div>
  );
};
