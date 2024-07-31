import { SettingOptions } from '@/utils/settings';
import { SharedSettings } from './@shared';

export type SettingOptions = typeof SettingOptions;

export type MoneyAccountSettings = SharedSettings;

export type SettingOptionsReturnedFn = ReturnType<SettingOptions>;
export type SettingOptionsValues =
  SettingOptionsReturnedFn[keyof SettingOptionsReturnedFn];
