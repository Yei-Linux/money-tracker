'use client';

import { elementTestIds } from '@moneytrack/shared/constants';
import { Switch } from '@moneytrack/web/components/ui/switch';
import { WatcherToggleSettings } from '@moneytrack/web/constants';
import { useToggleWatcherLimit } from '@moneytrack/web/hooks/useToggleWatcherLimit';
import { FC } from 'react';

type WatcherToggle = {
  watcherLimit: boolean;
  'data-testid'?: string;
};

export const WatcherToggle: FC<WatcherToggle> = ({
  watcherLimit,
  ...props
}) => {
  const { active, toggle } = useToggleWatcherLimit({
    watcherLimitDefaultValue: watcherLimit,
  });
  const textSettingts = [
    WatcherToggleSettings.Inactive,
    WatcherToggleSettings.Active,
  ];
  const message = textSettingts[+active];

  return (
    <div className="flex justify-between gap-2 items-center" {...props}>
      <p className="text-xs">{message}</p>
      <Switch
        data-testid={elementTestIds.EXPENSE_WATCHER_TOGGLE_ELEMENT}
        checked={active}
        onCheckedChange={toggle}
      />
    </div>
  );
};
