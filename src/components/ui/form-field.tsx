import { FC, PropsWithChildren } from 'react';

type TFormField = PropsWithChildren<{
  error?: string;
  id?: string;
  label?: string;
  required?: boolean;
}>;

export const FormField: FC<TFormField> = ({
  children,
  error,
  id,
  label,
  required,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {id && label && (
        <label className="text-sm font-semibold" htmlFor={id}>
          {required && <span className="text-danger">*</span>} {label}:
        </label>
      )}

      <div>
        {children}
        <span className="block text-danger text-xs h-[16px]">{error}</span>
      </div>
    </div>
  );
};
