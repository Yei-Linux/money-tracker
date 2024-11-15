'use server';

import {
  categoriesModel,
  parentCategoriesModel,
} from '@moneytrack/shared/models';
import { CategoryError } from '@moneytrack/web/errors/CategoryError';
import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';

export const updateDraggingCategoryServerAction = async (
  categoryId: string,
  newParentCategory: string
) => {
  try {
    if (!categoryId || !newParentCategory) {
      throw new InvalidFieldFormError(
        `There was an error: Fields are required`
      );
    }
    const user = await getAuthSessionInServerAction();

    const parent = await parentCategoriesModel.findOne({
      _id: newParentCategory,
      user,
    });
    if (!parent) throw new Error('This is not your category');

    const category = await categoriesModel.findOne({ _id: categoryId });
    if (!category) throw new Error('Category not found');

    await categoriesModel.updateOne(
      { _id: categoryId },
      { parentCategory: newParentCategory }
    );
  } catch (error) {
    throw new CategoryError((error as Error).message);
  }
};
