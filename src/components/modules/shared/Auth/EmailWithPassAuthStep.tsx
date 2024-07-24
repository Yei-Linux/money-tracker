import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { TAuthZodSchema } from '@/validators/common.validator';
import { useFormContext } from 'react-hook-form';

export const EmailWithPassAuthStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TAuthZodSchema>();

  return (
    <div className="flex flex-col gap-3">
      <FormField error={errors.email?.message}>
        <Input {...register('email')} type="email" />
      </FormField>

      <FormField error={errors.password?.message}>
        <Input {...register('password')} type="password" />
      </FormField>
    </div>
  );
};
