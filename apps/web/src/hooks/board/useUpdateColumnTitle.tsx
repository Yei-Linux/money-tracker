import { updateColumnTitleServerAction } from '@moneytrack/web/server-actions/categories/board/update-column';
import { UpdateParentCategory } from '@moneytrack/web/types/categories';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

type UseUpdateColumnTitle = { defaultTitle: string };

export const useUpdateColumnTitle = ({
  defaultTitle,
}: UseUpdateColumnTitle) => {
  const [title, setTitle] = useState(defaultTitle);
  const [prevTitle, setPrevTitle] = useState(defaultTitle);
  const [isLoading, startTransition] = useTransition();

  const onSubmit = async (data: UpdateParentCategory) => {
    if (title === prevTitle) return;

    startTransition(async () => {
      try {
        await updateColumnTitleServerAction(data);
        setPrevTitle(title);
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  const updateTitle = (value: string) => setTitle(value);

  return { isLoading, onSubmit, title, updateTitle };
};
