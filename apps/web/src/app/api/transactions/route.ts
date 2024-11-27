import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { getUserIdFromReq } from '@moneytrack/web/lib/auth/auth';
import { getFilterPaginationTransactions } from '@moneytrack/web/helpers/transactions';
import { buildAdvancedFiltersFromTransactions } from '@moneytrack/web/lib/utils';
import { getAllTransactionsRepository } from '@moneytrack/web/repository/transactions';
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

export const revalidate = 10;
