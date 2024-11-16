declare module 'use-react-countries' {
  type Countries = Array<{
    name: string;
    capital: string;
    area: number;
    coordinates: [number, number];
    currencies: Array<{
      name: string;
      symbol: string;
    }>;
    languages: string[];
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    postalCode: {
      format: string;
      regex: string;
    };
    flags: {
      png: string;
      svg: string;
    };
    population: number;
    emoji: string;
    countryCallingCode: string;
  }>;

  export function useCountries(): {
    countries: Countries;
    setCountries: React.Dispatch<React.SetStateAction<Countries>>;
  };
}
