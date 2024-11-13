import parentCategoriesModel from '@moneytrack/shared/models/parent-categories.model';
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

    return NextResponse.json({
      data: parentCategories ?? [],
      message: 'Categories retrieved',
    });
  } catch (error) {
    return catchApiError(error);
  }
};

export const revalidate = 10;
