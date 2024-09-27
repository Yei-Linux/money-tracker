import { FormField } from '@moneytrack/web/components/ui/form-field';
import { Input } from '@moneytrack/web/components/ui/input';
import { TAuthZodSchema } from '@moneytrack/web/validators/common.validator';
import { useFormContext } from 'react-hook-form';

export const EmailWithPassAuthStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TAuthZodSchema>();

  return (
    <div className="flex flex-col gap-3">
      <FormField error={errors.email?.message}>
        <Input {...register('email')} placeholder="Email" type="email" />
      </FormField>

      <FormField error={errors.password?.message}>
        <Input
          {...register('password')}
          placeholder="Password"
          type="password"
        />
      </FormField>
    </div>
  );
};
