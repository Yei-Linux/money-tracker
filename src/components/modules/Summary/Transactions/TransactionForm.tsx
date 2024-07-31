'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTransactionForm } from '@/hooks/useCreateTransactionForm';
import { useTransactionStore } from '@/store/transactions';
import { Controller } from 'react-hook-form';

export const TransactionForm = () => {
  const { register, onSubmit, handleSubmit, errors, control } =
    useCreateTransactionForm();
  const categories = useTransactionStore((state) => state.categories);
  const transactionTypes = useTransactionStore(
    (state) => state.transactionTypes
  );
  const action: () => void = handleSubmit(onSubmit);

  return (
    <form action={action} className="flex flex-col gap-7">
      <div className="flex flex-col gap-3 [&_button]:![box-shadow:none]  [&_input]:![box-shadow:none] [&_textarea]:![box-shadow:none]">
        <FormField
          error={errors.transactionType?.message}
          required
          id="addForm_transactionType"
          label="Select a Type"
        >
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type..." />
                </SelectTrigger>
                <SelectContent
                  id="addForm_transactionType"
                  {...register('transactionType')}
                >
                  <SelectGroup>
                    <SelectLabel>Transaction Type</SelectLabel>
                    {transactionTypes.map(({ _id, type }) => (
                      <SelectItem key={_id} value={_id}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          error={errors.category?.message}
          required
          id="addForm_category"
          label="Select a Category"
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>

                <SelectContent id="addForm_category" {...register('category')}>
                  {categories.map(({ category, categories, _id }) => (
                    <SelectGroup key={_id}>
                      <SelectLabel>{category}</SelectLabel>
                      {categories?.map(({ category, _id }) => (
                        <SelectItem key={_id} value={_id}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          error={errors.title?.message}
          required
          id="addForm_title"
          label="Type your title"
        >
          <Input
            {...register('title')}
            id="addForm_title"
            type="text"
            placeholder="Type your title..."
          />
        </FormField>

        <FormField
          error={errors.description?.message}
          required
          id="addForm_description"
          label="Type your description"
        >
          <Textarea
            {...register('description')}
            id="addForm_description"
            placeholder="Type your description..."
          />
        </FormField>

        <FormField
          error={errors.price?.message}
          required
          id="addForm_price"
          label="Type the price"
        >
          <Input
            {...register('price')}
            id="addForm_price"
            type="number"
            placeholder="Type the price..."
          />
        </FormField>
      </div>

      <Button className="rounded-md p-2" type="submit">
        Add Transaction
      </Button>
    </form>
  );
};
