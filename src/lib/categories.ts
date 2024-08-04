import { TCategories } from '@/types/categories';

export const getFlatCategories = (categories: TCategories) =>
  categories.map((category) => category.categories ?? []).flat();
