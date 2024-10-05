'use client';

import { elementTestIds } from '@moneytrack/shared/constants';
import { Button } from '@moneytrack/web/components/ui/button';
import { EmptyState, EmptyText } from '@moneytrack/web/components/ui/empty';
import { FormField } from '@moneytrack/web/components/ui/form-field';
import { Input } from '@moneytrack/web/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@moneytrack/web/components/ui/select';
import { Textarea } from '@moneytrack/web/components/ui/textarea';
import { TTogleFn } from '@moneytrack/web/hooks/@shared/useToggle';
import { useCreateTransactionForm } from '@moneytrack/web/hooks/useCreateTransactionForm';
import { useDropdownsStore } from '@moneytrack/web/store/dropdowns';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

type TransactionForm = {
  toggle: TTogleFn;
};

export const TransactionForm: FC<TransactionForm> = ({ toggle }) => {
  const { register, onSubmit, handleSubmit, errors, control, isLoading } =
    useCreateTransactionForm({ onComplete: toggle });
  const categories = useDropdownsStore((state) => state.categories);
  const transactionTypes = useDropdownsStore((state) => state.transactionTypes);
  const action: () => void = handleSubmit(onSubmit);

  return (
    <form
      action={action}
      className="flex flex-col gap-7"
      data-testid={elementTestIds.TRANSACTION_FORM_ELEMENT}
    >
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
                <SelectTrigger
                  className="w-[180px]"
                  data-testid={
                    elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECT_ELEMENT
                  }
                >
                  <SelectValue placeholder="Select a type..." />
                </SelectTrigger>
                <SelectContent
                  data-testid={
                    elementTestIds.TRANSACTIONTYPE_TRANSACTION_SELECTLIST_ELEMENT
                  }
                  id="addForm_transactionType"
                  {...register('transactionType')}
                >
                  <SelectGroup>
                    <EmptyText>
                      {transactionTypes.map(({ _id, type }) => (
                        <SelectItem key={_id} value={_id}>
                          {type}
                        </SelectItem>
                      ))}
                    </EmptyText>
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
                <SelectTrigger
                  className="w-[180px]"
                  data-testid={
                    elementTestIds.CATEGORY_TRANSACTION_SELECT_ELEMENT
                  }
                >
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>

                <SelectContent
                  data-testid={
                    elementTestIds.CATEGORY_TRANSACTION_SELECTLIST_ELEMENT
                  }
                  id="addForm_category"
                  {...register('category')}
                >
                  <EmptyText>
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
                  </EmptyText>
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
            data-testid={elementTestIds.TITLE_TRANSACTION_INPUT_ELEMENT}
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
            data-testid={elementTestIds.DESCRIPTION_TRANSACTION_INPUT_ELEMENT}
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
            data-testid={elementTestIds.PRICE_TRANSACTION_INPUT_ELEMENT}
          />
        </FormField>
      </div>

      <Button
        data-testid={elementTestIds.ADD_FORM_TRANSACTION_BTN_ELEMENT}
        className="rounded-md p-2"
        type="submit"
        loading={isLoading}
      >
        Add Transaction
      </Button>
    </form>
  );
};
