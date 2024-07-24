import { type ClassValue, clsx } from 'clsx';
import type { TFilterKeys } from '@/store/transactions';
import { twMerge } from 'tailwind-merge';
import mongoose from 'mongoose';
import { TFilterKeysTransactionsAPI } from '@/types/transactions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformRecordArrayToFormData(
  recordArray: Record<string, string | Array<string>>
) {
  const formData = new FormData();

  Object.entries(recordArray).forEach(([key, values]) => {
    if (typeof values === 'string') {
      formData.append(key, values);
      return;
    }

    for (let value of values) {
      formData.append(key, value);
    }
  });

  return formData;
}

export function buildFilters(
  filters: Array<{
    key: TFilterKeysTransactionsAPI;
    value: mongoose.Types.ObjectId;
  }>
) {
  const group = filters.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: !acc?.[item.key]?.length
        ? [{ [item.key]: item.value }]
        : [...acc[item.key], { [item.key]: item.value }],
    }),
    {} as Record<
      TFilterKeysTransactionsAPI,
      Array<Record<TFilterKeysTransactionsAPI, string>>
    >
  );
  const $filters = Object.entries(group)
    .filter(([key, values]) => values.length > 0)
    .map(([key, values]) => ({
      $or: values,
    }));

  return $filters;
}
