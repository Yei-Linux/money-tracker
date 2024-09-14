import { Breakpoints } from '@moneytrack/web/constants';

export const getCorrectDevice = (width: number) => {
  if (width <= Breakpoints.phone) {
    return 'phone';
  }
  if (width <= Breakpoints.tablet) {
    return 'tablet';
  }
  return 'desktop';
};
