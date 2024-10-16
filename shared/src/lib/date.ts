import { format, toDate, startOfMonth, endOfMonth } from 'date-fns';

export const formatDateByDayNumber = (date: string) =>
  format(toDate(date), 'MMMM D, YYYY h:mm A');

export const getCurrentMonth = () => format(new Date(), 'LLLL');

export const getStartEndDateByMonth = (monthDate: Date) => {
  const startDate = startOfMonth(monthDate);
  const endDate = endOfMonth(monthDate);

  return { startDate, endDate };
};
