import { FC } from 'react';

type TrendUpIcon = {
  fill?: string;
};

export const TrendUpIcon: FC<TrendUpIcon> = ({ fill = '#000000' }) => (
  <svg
    width="50px"
    height="50px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="352 144 464 144 464 256"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
    <path
      d="M48,368,169.37,246.63a32,32,0,0,1,45.26,0l50.74,50.74a32,32,0,0,0,45.26,0L448,160"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
);
