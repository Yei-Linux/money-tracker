import { useCountries } from 'use-react-countries';

export const useCountriesSelect = () => {
  const { countries } = useCountries();

  const countriesDropdown = countries
    .filter((item) => !!item.countryCallingCode && !!item.emoji)
    .map(({ name, emoji }) => ({
      value: name,
      label: `${emoji} ${name}`,
    }))
    .filter((item) => !!item.value);

  return { countriesDropdown };
};
