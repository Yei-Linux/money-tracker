'use client';

import { useAuthStore } from '@moneytrack/web/store/auth';
import { MonthPicker } from '../../ui/month-picker';
import { useDropdownsStore } from '@moneytrack/web/store/dropdowns';

export const MonthDropdown = () => {
  const month = useDropdownsStore((store) => store.month);
  const setMonth = useDropdownsStore((store) => store.setMonth);
  const session = useAuthStore((store) => store.session);

  return (
    <>
      {session && (
        <MonthPicker
          currentMonth={month}
          onMonthChange={(value) => setMonth(value)}
        />
      )}
    </>
  );
};
