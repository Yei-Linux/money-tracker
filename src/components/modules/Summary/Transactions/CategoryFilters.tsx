import * as React from 'react';

import { useTransactionStore } from '@/store/transactions';
import { MultiSelect } from '@/components/ui/multiselect';
import { useDropdownsStore } from '@/store/dropdowns';

export function CategoryFilters() {
  const updateFiltersByKey = useTransactionStore(
    (store) => store.updateFiltersByKey
  );
  const filters = useTransactionStore((store) => store.filters);
  const selectedFilters = filters['category'];

  const categories = useDropdownsStore((store) => store.categories);
  const multiselectOptions = categories
    .map((category) => category.categories ?? [])
    .flat()
    .map(({ _id, category }) => ({
      value: _id,
      label: category,
    }));

  return (
    <MultiSelect
      options={multiselectOptions}
      onValueChange={(values) => updateFiltersByKey('category', values)}
      defaultValue={selectedFilters}
      placeholder="Category"
      variant="inverted"
      maxCount={3}
      className="!border-none !rounded-full bg-muted hover:!bg-muted"
    />
  );
}
