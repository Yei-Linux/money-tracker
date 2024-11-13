import { SharedSettings } from './@shared';

export type MyMoneyAccount = {
  money: number;
  moneyByMonth: number;
  user: string;
} & SharedSettings;
