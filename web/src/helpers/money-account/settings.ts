export const computePercent = (value: number, goal: number) => {
  const lazyPercent = Number(((+value * 100) / +goal).toFixed(2));

  return Math.min(100, Math.max(0, lazyPercent));
};

export const assertPercentValue = (percent: number, goal?: number | null) => {
  if (goal === undefined || goal === null) return undefined;
  if (isNaN(percent)) return 0;
  return percent;
};
