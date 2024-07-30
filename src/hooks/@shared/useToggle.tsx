import { useState } from 'react';

type UseToggle = {
  defaultValue?: boolean;
};

export const useToggle = ({ defaultValue }: UseToggle) => {
  const [active, setActive] = useState(!!defaultValue);

  const toggle = () => setActive((prev) => !prev);

  return { toggle, active };
};
