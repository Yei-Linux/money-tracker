import { SettingOptions } from "@/utils/settings";
import { SettingCard } from "./SettingCard";
import { WatcherToggle } from "./WatcherToggle";
import { MoneyAccountSettings } from "@/types/settings";
import { SettingsOptionsKeys } from "@/constants";
import { EitherExpenseOrLimit } from "./EitherExpenseOrIncomes";
import { Title } from "@/components/ui/title";
import { ScrollContainer } from "@/components/ui/scroll-container";
import { HandyArrowToLeftIcon } from "@/components/ui/icons/HandyArrowToLeftIcon";

type MoneySettings = MoneyAccountSettings;

export const MoneySettings = (props: MoneySettings) => {
  const settings = Object.values(SettingOptions(props));

  return (
    <div className="flex flex-col gap-10">
      <Title as="h2">My Settings</Title>

      <div className="flex items-center">
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
            }) => (
              <SettingCard
                variant={variant}
                className={
                  type !== SettingsOptionsKeys.ExpenseWatch
                    ? "cursor-pointer"
                    : ""
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
        </ScrollContainer>
        <span className="hidden md:flex ml-[-200px]">
          <HandyArrowToLeftIcon />
        </span>
      </div>
    </div>
  );
};
