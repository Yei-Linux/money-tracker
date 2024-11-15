'use server';

import { categoriesModel, transactionsModel } from '@moneytrack/shared/models';
import { CategoryError } from '@moneytrack/web/errors/CategoryError';
import { InvalidFieldFormError } from '@moneytrack/web/errors/InvalidFieldFormError';

export const removeCategoryServerAction = async (id: string) => {
  try {
    if (!id) {
      throw new InvalidFieldFormError(`There was an error: Id is required`);
    }

    const hasForeignRelationWithAnyTransaction =
      await transactionsModel.findOne({ category: id });
    if (hasForeignRelationWithAnyTransaction) {
      throw new InvalidFieldFormError(
        `There was an error: You have used this category in one of your transactions`
      );
    }

    await categoriesModel.deleteOne({ _id: id });
  } catch (error) {
    throw new CategoryError((error as Error).message);
  }
};
