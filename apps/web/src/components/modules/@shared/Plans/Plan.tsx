import { Button } from '@moneytrack/web/components/ui/button';
import { cn } from '@moneytrack/web/lib/utils';
import { TPricingPlan } from '@moneytrack/web/types/payment';
import { FC, PropsWithChildren } from 'react';

type PlanItem = {
  item: string;
};

const PlanItem: FC<PlanItem> = ({ item }) => <li>{item}</li>;

type Plan = PropsWithChildren<Omit<TPricingPlan, 'benefits'>> & {
  onSubmit?: () => void;
};

type PlanCompound = {
  Item: typeof PlanItem;
};

export const Plan: FC<Plan> & PlanCompound = ({
  image,
  type,
  price,
  description,
  children,
  callToActionText,
  theme,
  onSubmit,
}) => {
  const themes = {
    dark: {
      container: 'bg-black text-white',
      button: 'bg-white hover:bg-white text-black',
    },
    light: { button: 'bg-black text-white', container: 'bg-white text-black' },
  };
  const isValidPricing = !isNaN(+price) && +price > 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-7 px-4 py-14 rounded-xl items-center shadow-md',
        themes[theme].container
      )}
    >
      <img src={image} alt="plan" width={100} />

      <div className="flex flex-col items-center">
        <p className="font-bold text-2xl font-snicker">{type}</p>
        <h4 className="font-bold text-4xl">
          {isValidPricing && '$'}
          {isValidPricing ? price : 'Coming Soon'}
        </h4>
      </div>

      <p className="text-sm">{description}</p>

      <ul className="text-sm">{children}</ul>

      <Button
        className={cn('rounded-full', themes[theme].button)}
        onClick={onSubmit}
      >
        {callToActionText}
      </Button>
    </div>
  );
};

Plan.Item = PlanItem;
