import { SharedSettings } from './@shared';

export type MyMoneyAccount = {
  money: number;
  user: string;
} & SharedSettings;
