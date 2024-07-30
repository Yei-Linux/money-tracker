export type SettingItem = {
  goal: number;
  currentResult: number;
  settingsValue: number;
};

export type SharedSettings = {
  expenseLimit: SettingItem | null;
  incomeGoal: SettingItem | null;
  watcherLimit: boolean;
};
