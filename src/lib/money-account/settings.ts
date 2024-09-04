export const computePercent = (value: number, goal: number) =>
  Number(((+value * 100) / +goal).toFixed(2));

export const assertPercentValue = (percent: number, goal?: number | null) => {
  if (goal === undefined || goal === null) return undefined;
  if (isNaN(percent)) return 0;
  return percent;
};
