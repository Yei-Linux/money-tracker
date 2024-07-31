export const computePercent = (value: number, goal: number) =>
  (+value * 100) / +goal;

export const assertPercentValue = (percent: number, goal?: number | null) => {
  if (goal === undefined || goal === null) return undefined;
  if (isNaN(percent)) return 0;
  return percent;
};
