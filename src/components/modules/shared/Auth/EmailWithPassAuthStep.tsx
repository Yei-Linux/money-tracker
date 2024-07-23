import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';

export const EmailWithPassAuthStep = () => {
  return (
    <div className="flex flex-col gap-3">
      <FormField>
        <Input type="email" />
      </FormField>

      <FormField>
        <Input type="password" />
      </FormField>
    </div>
  );
};
