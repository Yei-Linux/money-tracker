import { FormField } from '@moneytrack/web/components/ui/form-field';
import { Input } from '@moneytrack/web/components/ui/input';
import { TSignUpSchema } from '@moneytrack/web/validators/sign-up.validator';
import { useFormContext } from 'react-hook-form';

export const PersonalInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpSchema>();

  return (
    <div className="flex flex-col gap-3">
      <FormField error={errors.name?.message}>
        <Input {...register('name')} type="text" />
      </FormField>

      <FormField error={errors.phone?.message}>
        <Input {...register('phone')} type="text" />
      </FormField>
    </div>
  );
};
