import { catchApiError } from '@/lib/api-error-handler';
import { getUserIdFromReq } from '@/lib/auth/auth';
import { getFilterPaginationTransactions } from '@/lib/transactions';
import { buildAdvancedFiltersFromTransactions } from '@/lib/utils';
import { getAllTransactionsRepository } from '@/repository/transactions';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const { pagination, filters } = getFilterPaginationTransactions(
      req,
      userId
    );

    const filtersMatchCondition = !!filters.length
      ? [
          {
            $match: {
              $and: buildAdvancedFiltersFromTransactions(filters),
            },
          },
        ]
      : [];

    const { transactions, nextCursor } = await getAllTransactionsRepository({
      filters: filtersMatchCondition,
      ...pagination,
    });

    const transactionsResponse = transactions.reduce(
      (acc, transaction) => ({
        ...acc,
        [transaction._id]: transaction.transactions,
      }),
      {}
    );

    return NextResponse.json({
      data: { transactions: transactionsResponse ?? {}, nextCursor },
      message: 'Transactions retrieved successfull',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
