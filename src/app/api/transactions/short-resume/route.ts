import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth/auth';
import { getFilterPaginationTransactions } from '@/lib/transactions';
import { buildAdvancedFiltersFromTransactions } from '@/lib/utils';
import { getAllSimpleTransactionsRepository } from '@/repository/transactions';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const { pagination, filters } = getFilterPaginationTransactions(
      req,
      userId
    );

    const filtersMatchCondition = {
      $and: !!filters.length
        ? buildAdvancedFiltersFromTransactions(filters)
        : [],
    };

    const { transactions, nextCursor } =
      await getAllSimpleTransactionsRepository({
        filters: filtersMatchCondition,
        ...pagination,
      });

    return NextResponse.json({
      data: { transactions, nextCursor },
      message: 'Transactions retrieved successfull',
    });
  } catch (error) {
    console.log(error);
    return catchApiError(error);
  }
};
