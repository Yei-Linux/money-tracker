import { SettingOptions } from '@/utils/settings';
import { SettingCard } from './SettingCard';

export const Settings = () => {
  const settings = Object.values(SettingOptions);

  return (
    <div className="flex justify-around p-2 items-center flex-wrap gap-3 w-full max-w-[800px] m-auto">
      {settings.map(({ variant, title, description, Icon, settingValue }) => (
        <SettingCard variant={variant}>
          <SettingCard.HeaderLayout>
            <SettingCard.Icon variant={variant}>
              <Icon size={20} />
            </SettingCard.Icon>
            {settingValue && (
              <SettingCard.SettingValue>
                {settingValue}
              </SettingCard.SettingValue>
            )}
          </SettingCard.HeaderLayout>
          <SettingCard.ContentLayout>
            <SettingCard.Title>{title}</SettingCard.Title>
            <SettingCard.Description>{description}</SettingCard.Description>
          </SettingCard.ContentLayout>
        </SettingCard>
      ))}
    </div>
  );
};
