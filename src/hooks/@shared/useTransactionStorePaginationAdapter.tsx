import { TTransactionStore } from "@/store/@shared";
import { StoreApi, UseBoundStore } from "zustand";

type UseTransactionStorePaginationAdapter = {
  useStore: UseBoundStore<StoreApi<TTransactionStore>>;
};

export const useTransactionStorePaginationAdapter = ({
  useStore,
}: UseTransactionStorePaginationAdapter) => {
  const skip = useStore((store) => store.skip);
  const limit = useStore((store) => store.limit);
  const filters = useStore((store) => store.filters);

  return { skip, limit, filters };
};
