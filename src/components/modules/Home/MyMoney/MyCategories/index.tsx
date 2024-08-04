'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollContainer } from '@/components/ui/scroll-container';
import { getFlatCategories } from '@/lib/categories';
import { useDropdownsStore } from '@/store/dropdowns';

export const MyCategories = () => {
  const categories = useDropdownsStore((store) => store.categories);
  const categoriesFlat = getFlatCategories(categories);

  return (
    <ScrollContainer>
      {categoriesFlat.map(({ category }) => (
        <Badge variant="secondary" className="shadow-md">
          {category}
        </Badge>
      ))}
    </ScrollContainer>
  );
};
