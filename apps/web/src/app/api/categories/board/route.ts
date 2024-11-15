import { parentCategoriesModel } from '@moneytrack/shared/models';
import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { TCategories } from '@moneytrack/web/types/categories';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);

    const parentCategories: TCategories = await parentCategoriesModel
      .find({
        user,
      })
      .select({
        _id: true,
        category: true,
      })
      .populate('categories', '_id category transactionType');

    const parentCategoriesColumns = parentCategories.reduce(
      (acc, item: TCategories[number]) => {
        if (!item.id) return acc;

        return {
          ...acc,
          [item.id]: {
            id: item.id,
            title: item.category,
            itemsOrder: item.categories?.map(({ id }) => id),
          },
        };
      },
      {}
    );

    const categories = parentCategories
      .map(({ categories }) => categories ?? [])
      .flat()
      .reduce((acc, item: TCategories[number]) => {
        return {
          ...acc,
          [item._id]: {
            id: item._id,
            title: item.category,
            transactionType: item.transactionType,
          },
        };
      }, {});

    return NextResponse.json({
      data: { parentCategoriesColumns, categories },
      message: 'Categories retrieved',
    });
  } catch (error) {
    return catchApiError(error);
  }
};

export const revalidate = 10;
