import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth/auth';
import { transactionsModel } from '@/models';
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
    catchApiError(error);
  }
};
