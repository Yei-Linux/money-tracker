import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { transactionsModel } from '@moneytrack/web/models';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);

    const transactionCategories = await transactionsModel
      .find({
        user,
      })
      .select({ category: true })
      .populate('category', '_id category');

    const myCategories = transactionCategories
      .map(({ category }) => category)
      .reduce((acc, item) => {
        return acc.find((cat: any) => cat._id === item._id)
          ? acc
          : [...acc, item];
      }, []);

    return NextResponse.json({
      data: myCategories,
      message: 'My categories retrieved successfuly',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
