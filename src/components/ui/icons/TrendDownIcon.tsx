import { FC } from 'react';

type TrendDownIcon = {
  fill?: string;
};

export const TrendDownIcon: FC<TrendDownIcon> = ({ fill = '#000000' }) => (
  <svg
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.85123 8.10628L0.437012 9.52049L7.50808 16.5916L13.872 10.2276L18.1147 14.4702L16.3723 16.2126L23.0644 18.0058L21.2713 11.3136L19.5289 13.056L13.872 7.39917L7.50808 13.7631L1.85123 8.10628Z"
      fill={fill}
    />
  </svg>
);
