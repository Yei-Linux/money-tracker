import { DEFAULT_LIMIT } from '@/constants';
import { buildFilters } from '@/lib/utils';
import { getAllTransactionsRepository } from '@/repository/transactions';
import { TFilterKeys } from '@/store/transactions';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
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
      key: key as TFilterKeys,
      value: new mongoose.Types.ObjectId(value),
    });
  }

  const filtersMatchCondition = !!filters.length
    ? [
        {
          $match: {
            $and: buildFilters(filters),
          },
        },
      ]
    : [];

  try {
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
