'use client';

import { cn } from '@moneytrack/web/lib/utils';
import { useAuthStore } from '@moneytrack/web/store/auth';

type TSpinner = {
  hasSpinner?: boolean;
};

export const Spinner = ({ hasSpinner }: TSpinner) => {
  const isLoading = useAuthStore((store) => store.isLoading);

  if (!hasSpinner) return <></>;

  return (
    <div
      className={cn(
        'fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-xl z-[99]',
        {
          hidden: !isLoading,
        }
      )}
    >
      <div className="rounded-full overflow-hidden">
        <img src="/assets/pet.gif" width={150} height={150} />
      </div>
    </div>
  );
};
