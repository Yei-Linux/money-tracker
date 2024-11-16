'use client';

import { AutocompleteSelect } from '@moneytrack/web/components/ui/autocomplete-select';
import { Avatar, AvatarImage } from '@moneytrack/web/components/ui/avatar';
import { Button } from '@moneytrack/web/components/ui/button';
import { FormField } from '@moneytrack/web/components/ui/form-field';
import { Input } from '@moneytrack/web/components/ui/input';

import { useCountriesSelect } from '@moneytrack/web/hooks/useCountriesSelect';
import { useProfileForm } from '@moneytrack/web/hooks/useProfileForm';
import { avatarURL } from '@moneytrack/web/lib/utils';
import { GetMySettings } from '@moneytrack/web/types/my-settings';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

type ProfileForm = GetMySettings['profile'];

export const ProfileForm: FC<ProfileForm> = (props) => {
  const { countriesDropdown } = useCountriesSelect();
  const { register, onSubmit, handleSubmit, errors, isLoading, control } =
    useProfileForm({ defaultValues: props });
  const action: () => void = handleSubmit(onSubmit);

  const avatar = avatarURL(props.name, props.image);

  return (
    <form action={action} className="flex flex-col gap-7">
      <div className="flex justify-center items-center">
        <Avatar className="shadow-md !w-[100px] !h-[100px]">
          <AvatarImage src={avatar} />
        </Avatar>
      </div>

      <div className="flex flex-col gap-3 [&_button]:![box-shadow:none]  [&_input]:![box-shadow:none] [&_textarea]:![box-shadow:none]">
        <div className="grid md:grid-cols-2 gap-3">
          <FormField
            error={errors.name?.message}
            required
            id="profileform_name"
            label="Type your name"
          >
            <Input
              {...register('name')}
              id="profileform_name"
              type="text"
              placeholder="Type your name..."
            />
          </FormField>

          <FormField
            error={errors.email?.message}
            required
            id="profileform_email"
            label="Type your email"
          >
            <Input
              {...register('email')}
              readOnly
              id="profileform_email"
              placeholder="Type your email..."
            />
          </FormField>
        </div>

        <FormField
          error={errors.phone?.message}
          required
          id="profileform_phone"
          label="Type the phone"
        >
          <Input
            {...register('phone')}
            id="profileform_phone"
            placeholder="Type the phone..."
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-3">
          <FormField
            error={errors.country?.message}
            required
            id="profileform_country"
            label="Select a country"
          >
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <AutocompleteSelect
                  options={countriesDropdown}
                  value={field.value!}
                  onChange={field.onChange}
                />
              )}
            />
          </FormField>

          <FormField
            error={errors.address?.message}
            required
            id="profileform_address"
            label="Type the address"
          >
            <Input
              {...register('address')}
              id="profileform_address"
              placeholder="Type the address..."
            />
          </FormField>
        </div>
      </div>

      <Button className="rounded-md p-2" type="submit" loading={isLoading}>
        Save
      </Button>
    </form>
  );
};
