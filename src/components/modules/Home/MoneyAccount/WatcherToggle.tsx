'use client';

import { Switch } from '@/components/ui/switch';
import { WatcherToggleSettings } from '@/constants';
import { useToggle } from '@/hooks/@shared/useToggle';
import { FC } from 'react';

type WatcherToggle = {
  watcherLimit: boolean;
};

export const WatcherToggle: FC<WatcherToggle> = ({ watcherLimit }) => {
  const { active, toggle } = useToggle({ defaultValue: watcherLimit });
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
