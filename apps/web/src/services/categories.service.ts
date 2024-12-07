import {
  CategoriesBoardType,
  TCategories,
} from '@moneytrack/web/types/categories';
import { getMonthQueryParam } from '../utils/transactions';

export const getMyCategoriesBoardService = async (
  cookie = ''
): Promise<CategoriesBoardType | null> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/categories/board`, {
      headers: {
        cookie,
      },
    });
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return null;
  }
};

export const getCategoriesService = async (
  cookie = ''
): Promise<TCategories> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/categories`, {
      headers: {
        cookie,
      },
    });
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return [];
  }
};

export const getMyCategoriesService = async (
  monthDate: Date
): Promise<TCategories> => {
  try {
    const promise = await fetch(
      `/api/categories/me?${getMonthQueryParam(monthDate)}`
    );
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return [];
  }
};
