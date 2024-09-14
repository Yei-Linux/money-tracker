'use client';

import { Switch } from '@moneytrack/web/components/ui/switch';
import { WatcherToggleSettings } from '@moneytrack/web/constants';
import { useToggleWatcherLimit } from '@moneytrack/web/hooks/useToggleWatcherLimit';
import { FC } from 'react';

type WatcherToggle = {
  watcherLimit: boolean;
};

export const WatcherToggle: FC<WatcherToggle> = ({ watcherLimit }) => {
  const { active, toggle } = useToggleWatcherLimit({
    watcherLimitDefaultValue: watcherLimit,
  });
  const textSettingts = [
    WatcherToggleSettings.Inactive,
    WatcherToggleSettings.Active,
  ];
  const message = textSettingts[+active];

  return (
    <div className="flex justify-between gap-2 items-center">
      <p className="text-xs">{message}</p>
      <Switch checked={active} onCheckedChange={toggle} />
    </div>
  );
};
