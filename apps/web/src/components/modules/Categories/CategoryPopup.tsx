import { useToggle } from '@moneytrack/web/hooks/@shared/useToggle';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { FormField } from '../../ui/form-field';
import { Input } from '../../ui/input';
import { useUpsertCategory } from '@moneytrack/web/hooks/board/useUpsertCategory';
import { UpdateCategory } from '@moneytrack/web/types/categories';
import { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { EmptyText } from '../../ui/empty';
import { useDropdownsStore } from '@moneytrack/web/store/dropdowns';

type CategoryPopup = PropsWithChildren<UpdateCategory>;

export const CategoryPopup = (props: CategoryPopup) => {
  const transactionTypes = useDropdownsStore((state) => state.transactionTypes);

  const { active, toggle } = useToggle({ defaultValue: false });
  const { onSubmit, register, errors, handleSubmit, isLoading, control } =
    useUpsertCategory({ togglePopup: toggle, ...props });

  const action: () => void = handleSubmit(onSubmit);

  return (
    <Dialog open={active} onOpenChange={toggle}>
      <DialogTrigger>{props.children}</DialogTrigger>

      <DialogContent className="[&_input]:![box-shadow:none]">
        <DialogHeader>
          <DialogTitle>{props.id ? 'Edit' : 'Create'} my category</DialogTitle>
          <DialogDescription>
            This action will allow you to update or create your category!
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-3" action={action}>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={props.transactionType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type..." />
                  </SelectTrigger>
                  <SelectContent
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
            id="addForm_category"
            label="Category"
            required
          >
            <Input
              {...register('category')}
              type="text"
              defaultValue={props.category}
              placeholder="Type your category"
            />
          </FormField>
          <Button className="w-full" type="submit" loading={isLoading}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
