export type SettingItem = {
  counter: number;
  goal: number;
  currentResult: number;
  settingValue: number;
};

export type SharedSettings = {
  expenseLimit: SettingItem | null;
  incomeGoal: SettingItem | null;
  watcherLimit: boolean;
};
