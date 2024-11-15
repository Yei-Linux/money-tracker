import { removeCategoryServerAction } from '@moneytrack/web/server-actions/categories/board/remove-category';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export const useRemoveCategory = () => {
  const [isLoading, startTransition] = useTransition();

  const onSubmit = async (id: string) => {
    startTransition(async () => {
      try {
        await removeCategoryServerAction(id);

        window.location.reload();
        toast.success('Category Removed successfully');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, onSubmit };
};
