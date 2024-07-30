import { SettingOptions } from '@/utils/settings';
import { SettingCard } from './SettingCard';
import { WatcherToggle } from './WatcherToggle';
import { MoneyAccountSettings } from '@/types/settings';

type Settings = MoneyAccountSettings;

export const Settings = (props: Settings) => {
  const settings = Object.values(SettingOptions(props));

  return (
    <div className="flex justify-around p-2 items-center flex-wrap gap-3 w-full max-w-[800px] m-auto">
      {settings.map(
        ({
          variant,
          title,
          description,
          Icon,
          settingDescription,
          settingValue,
          goal,
          currentResult,
          watcherLimit,
        }) => (
          <SettingCard
            variant={variant}
            className={watcherLimit === undefined ? 'cursor-pointer' : ''}
          >
            <SettingCard.HeaderLayout>
              <SettingCard.Icon variant={variant}>
                <Icon size={20} />
              </SettingCard.Icon>
              {settingValue && settingDescription && (
                <SettingCard.SettingValue
                  percent={settingValue}
                  description={settingDescription}
                />
              )}
            </SettingCard.HeaderLayout>
            <SettingCard.ContentLayout>
              <SettingCard.Title>{title}</SettingCard.Title>

              {watcherLimit === undefined ? (
                <div className="flex justify-between items-center">
                  <SettingCard.Description>
                    {description}
                  </SettingCard.Description>

                  {!!goal && (
                    <SettingCard.GoalWithCurrentResult
                      goal={goal}
                      currentResult={currentResult ?? 0}
                    />
                  )}
                </div>
              ) : (
                <WatcherToggle watcherLimit={watcherLimit} />
              )}
            </SettingCard.ContentLayout>
          </SettingCard>
        )
      )}
    </div>
  );
};
