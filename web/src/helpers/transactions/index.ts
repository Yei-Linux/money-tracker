import { DEFAULT_LIMIT } from "@/constants";
import { TFilterKeysTransactionsAPI } from "@/types/transactions";
import mongoose from "mongoose";

export const getFilterPaginationTransactions = (
  req: NextRequest,
  userId: string
) => {
  const pagination = {
    limit: DEFAULT_LIMIT,
    skip: 0,
  };
  const filters = [];
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const ifIsEitherLimitOrSkipDontAddToFiltersJustToPagination = (key: string) =>
    ["limit", "skip"].includes(key);

  for (let [key, value] of searchParams) {
    if (ifIsEitherLimitOrSkipDontAddToFiltersJustToPagination(key)) {
      pagination[key as "limit" | "skip"] = +value;
      continue;
    }
    filters.push({
      key: key as TFilterKeysTransactionsAPI,
      value: new mongoose.Types.ObjectId(value),
    });
  }

  filters.push({
    key: "user" as const,
    value: new mongoose.Types.ObjectId(userId),
  });

  return { pagination, filters };
};
