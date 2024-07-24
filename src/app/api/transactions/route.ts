import { DEFAULT_LIMIT } from '@/constants';
import { getUserIdFromReq } from '@/lib/auth';
import { buildFilters } from '@/lib/utils';
import { getAllTransactionsRepository } from '@/repository/transactions';
import { TFilterKeysTransactionsAPI } from '@/types/transactions';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const pagination = {
      limit: DEFAULT_LIMIT,
      skip: 0,
    };
    const filters = [];

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    for (let [key, value] of searchParams) {
      if (['limit', 'skip'].includes(key)) {
        pagination[key as 'limit' | 'skip'] = +value;
        continue;
      }
      filters.push({
        key: key as TFilterKeysTransactionsAPI,
        value: new mongoose.Types.ObjectId(value),
      });
    }

    filters.push({
      key: 'user' as const,
      value: new mongoose.Types.ObjectId(userId),
    });

    const filtersMatchCondition = !!filters.length
      ? [
          {
            $match: {
              $and: buildFilters(filters),
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
    return NextResponse.json({
      data: {},
      message: 'There was an error',
    });
  }
};
