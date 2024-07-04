import * as React from 'react';

import { useTransactionStore } from '@/store/transactions';
import { MultiSelect } from '@/components/ui/multiselect';

export function TransactionTypeFilters() {
  const updateFiltersByKey = useTransactionStore(
    (store) => store.updateFiltersByKey
  );
  const filters = useTransactionStore((store) => store.filters);
  const selectedFilters = filters['transactionType'];

  const transactionTypes = useTransactionStore(
    (store) => store.transactionTypes
  );
  const multiselectOptions = transactionTypes.map(({ _id, type }) => ({
    value: _id,
    label: type,
  }));

  return (
    <MultiSelect
      options={multiselectOptions}
      onValueChange={(values) => updateFiltersByKey('transactionType', values)}
      defaultValue={selectedFilters}
      placeholder="Type"
      variant="inverted"
      maxCount={3}
      className="!border-none !rounded-full bg-white hover:!bg-white"
    />
  );
}
