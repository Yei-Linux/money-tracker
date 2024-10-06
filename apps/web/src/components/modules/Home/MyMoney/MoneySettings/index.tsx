import { SettingOptions } from '@moneytrack/web/utils/settings';
import { SettingCard } from './SettingCard';
import { WatcherToggle } from './WatcherToggle';
import { MoneyAccountSettings } from '@moneytrack/web/types/settings';
import { SettingsOptionsKeys } from '@moneytrack/web/constants';
import { EitherExpenseOrIncome } from './EitherExpenseOrIncomes';
import { Title } from '@moneytrack/web/components/ui/title';
import { ScrollContainer } from '@moneytrack/web/components/ui/scroll-container';
import { HandyArrowToLeftIcon } from '@moneytrack/web/components/ui/icons/HandyArrowToLeftIcon';
import { sectionsTestIds } from '@moneytrack/shared/constants';

type MoneySettings = MoneyAccountSettings;

export const MoneySettings = (props: MoneySettings) => {
  const settings = Object.values(SettingOptions(props));

  return (
    <div className="flex flex-col gap-10">
      <Title as="h2">My Settings</Title>

      <div
        className="flex items-center"
        data-testid={sectionsTestIds.MONEY_SETTINGS_SECTION}
      >
        <ScrollContainer>
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
              dataTestId,
              dataTestIdPercent,
            }) => (
              <SettingCard
                variant={variant}
                className={
                  type !== SettingsOptionsKeys.ExpenseWatch
                    ? 'cursor-pointer'
                    : ''
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
                        type={type}
                        data-testid={dataTestIdPercent}
                      />
                    )}
                </SettingCard.HeaderLayout>
                <SettingCard.ContentLayout>
                  <SettingCard.Title>{title}</SettingCard.Title>

                  {type !== SettingsOptionsKeys.ExpenseWatch ? (
                    <EitherExpenseOrIncome
                      description={description}
                      goal={goal}
                      currentResult={currentResult}
                      data-testid={dataTestId}
                    />
                  ) : (
                    <WatcherToggle
                      data-testid={dataTestId}
                      watcherLimit={!!watcherLimit}
                    />
                  )}
                </SettingCard.ContentLayout>
              </SettingCard>
            )
          )}
        </ScrollContainer>
        <span className="hidden md:flex ml-[-200px]">
          <HandyArrowToLeftIcon />
        </span>
      </div>
    </div>
  );
};
