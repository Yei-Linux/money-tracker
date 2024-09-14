import { TCategories } from '@moneytrack/web/types/categories';

export const getCategoriesService = async (): Promise<TCategories> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/categories`);
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return [];
  }
};

export const getMyCategoriesService = async (
  cookie = ''
): Promise<TCategories> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/categories/me`, {
      headers: { cookie },
    });
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return [];
  }
};
