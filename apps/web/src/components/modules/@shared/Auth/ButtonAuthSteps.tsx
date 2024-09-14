import { Button } from '@moneytrack/web/components/ui/button';
import { VoidMethod } from '@moneytrack/web/types/factories';
import { FC } from 'react';

type ButtonAuthSteps = {
  type: 'continue' | 'final';
  isLoading?: boolean;
  onNext?: VoidMethod;
  onPrev?: VoidMethod;
  hasBackButton?: boolean;
};

export const ButtonAuthSteps: FC<ButtonAuthSteps> = ({
  type,
  isLoading,
  onNext,
  onPrev,
  hasBackButton = false,
}) => {
  const buttonType = type === 'continue' ? 'button' : 'submit';
  const buttonText = type === 'continue' ? 'Continue' : 'Submit';

  return (
    <footer className="flex justify-center p-3 w-full gap-3">
      {hasBackButton && (
        <Button
          variant="secondary"
          onClick={onPrev}
          className="w-full"
          type="button"
        >
          Back
        </Button>
      )}
      <Button
        onClick={onNext}
        className="w-full"
        type={buttonType}
        loading={isLoading}
      >
        {buttonText}
      </Button>
    </footer>
  );
};
