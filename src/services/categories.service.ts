import { TCategories } from '@/types/categories';

export const getCategories = async (): Promise<TCategories> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/categories`);
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return [];
  }
};
