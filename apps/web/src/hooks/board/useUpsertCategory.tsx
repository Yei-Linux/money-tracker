import { zodResolver } from '@hookform/resolvers/zod';
import { toastMessages } from '@moneytrack/shared/constants';
import { upsertCategoryServerAction } from '@moneytrack/web/server-actions/categories/board/upsert-category';
import { UpdateCategory } from '@moneytrack/web/types/categories';
import {
  CategoryZodSchema,
  TCategorySchema,
} from '@moneytrack/web/validators/category.validator';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type UseUpsertCategory = {
  togglePopup: () => void;
} & UpdateCategory;

export const useUpsertCategory = ({
  togglePopup,
  category,
  transactionType,
  id,
  parentCategory,
}: UseUpsertCategory) => {
  const { refresh } = useRouter();
  const [isLoading, startTransition] = useTransition();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategorySchema>({
    defaultValues: { category, transactionType },
    resolver: zodResolver(CategoryZodSchema),
  });

  const onSubmit = async (data: TCategorySchema) => {
    startTransition(async () => {
      try {
        await upsertCategoryServerAction({ ...data, id, parentCategory });

        togglePopup();
        refresh();
        toast.success(toastMessages.SET_CATEGORY_SUCCESS);
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return { isLoading, register, handleSubmit, errors, onSubmit, control };
};
