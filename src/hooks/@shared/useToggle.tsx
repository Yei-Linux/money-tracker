import { useState } from 'react';

type UseToggle = {
  defaultValue?: boolean;
};

export type TTogleFn = () => void;

export const useToggle = ({ defaultValue }: UseToggle) => {
  const [active, setActive] = useState(!!defaultValue);

  const toggle: TTogleFn = () => setActive((prev) => !prev);

  return { toggle, active };
};
