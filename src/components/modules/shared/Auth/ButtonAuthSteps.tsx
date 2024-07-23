import { Button } from '@/components/ui/button';
import { FC } from 'react';

type ButtonAuthSteps = {
  type: 'continue' | 'final';
};

export const ButtonAuthSteps: FC<ButtonAuthSteps> = ({ type }) => {
  const buttonType = type === 'continue' ? 'button' : 'submit';
  const buttonText = type === 'continue' ? 'Continue' : 'Submit';

  return (
    <footer className="flex justify-center p-3 w-full">
      <Button className="w-full" type={buttonType}>
        {buttonText}
      </Button>
    </footer>
  );
};
