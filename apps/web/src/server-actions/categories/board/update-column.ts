'use server';

import { parentCategoriesModel } from '@moneytrack/shared/models';
import { CategoryError } from '@moneytrack/web/errors/CategoryError';
import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';
import { getAuthSessionInServerAction } from '@moneytrack/web/lib/auth/auth-session-handler';
import { UpdateParentCategory } from '@moneytrack/web/types/categories';

export const updateColumnTitleServerAction = async ({
  id,
  title,
}: UpdateParentCategory) => {
  try {
    if (!title) {
      throw new InvalidFieldFormError(
        `There was an error: Title must not be empty`
      );
    }
    const user = await getAuthSessionInServerAction();

    const parent = await parentCategoriesModel.findOne({
      _id: id,
      user,
    });
    if (!parent) throw new Error('This is not your category');

    await parentCategoriesModel.updateOne({ _id: id }, { category: title });
  } catch (error) {
    throw new CategoryError((error as Error).message);
  }
};
