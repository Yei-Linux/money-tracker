import { TCategories } from '@moneytrack/web/types/categories';

export const getFlatCategories = (categories: TCategories) =>
  categories.map((category) => category.categories ?? []).flat();
