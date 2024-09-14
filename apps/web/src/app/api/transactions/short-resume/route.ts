import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getFilterPaginationTransactions } from '@moneytrack/web/helpers/transactions';
import { buildAdvancedFiltersFromTransactions } from '@moneytrack/web/lib/utils';
import { getAllSimpleTransactionsRepository } from '@moneytrack/web/repository/transactions';
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
    return catchApiError(error);
  }
};
