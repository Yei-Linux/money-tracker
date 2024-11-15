'use server';

import {
  categoriesModel,
  parentCategoriesModel,
} from '@moneytrack/shared/models';
import { CategoryError } from '@moneytrack/web/errors/CategoryError';
import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { UpdateCategory } from '@moneytrack/web/types/categories';
import { CategoryZodSchema } from '@moneytrack/web/validators/category.validator';

export const upsertCategoryServerAction = async (data: UpdateCategory) => {
  try {
    const validation = CategoryZodSchema.safeParse({
      category: data.category,
      transactionType: data.transactionType,
    });
    if (!validation.success) {
      throw new InvalidFieldFormError(
        `There was an error: ${validation.error.issues}`
      );
    }
    const user = await getAuthSessionInServerAction();

    const parent = await parentCategoriesModel.findOne({
      _id: data.parentCategory,
      user,
    });
    if (!parent) throw new Error('This is not your category');

    if (data.id) {
      await categoriesModel.updateOne(
        { _id: data.id },
        { category: data.category, transactionType: data.transactionType }
      );
    } else {
      await categoriesModel.create({
        category: data.category,
        transactionType: data.transactionType,
        parentCategory: data.parentCategory,
      });
    }
  } catch (error) {
    throw new CategoryError((error as Error).message);
  }
};
