import { cn } from '@moneytrack/web/lib/utils';
import { TPricingPlan } from '@moneytrack/web/types/payment';
import { FC, PropsWithChildren } from 'react';
import { PlanButtonAction } from './PlanButtonAction';
import { isValidPricing } from '@moneytrack/web/helpers/payment';

type PlanItem = {
  item: string;
};

const PlanItem: FC<PlanItem> = ({ item }) => <li>{item}</li>;

type Plan = PropsWithChildren<Omit<TPricingPlan, 'benefits'>> & {
  onSubmit?: () => void;
  currentPlanId?: string;
};

type PlanCompound = {
  Item: typeof PlanItem;
};

export const Plan: FC<Plan> & PlanCompound = ({
  _id,
  image,
  type,
  price,
  description,
  children,
  callToActionText,
  theme,
  currentPlanId,
  disable,
}) => {
  const themes = {
    dark: {
      container: 'bg-black text-white',
      button: 'bg-white hover:bg-white text-black',
    },
    light: { button: 'bg-black text-white', container: 'bg-white text-black' },
  };

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
          {isValidPricing(price) ? `$${price}` : 'Coming Soon'}
        </h4>
      </div>

      <p className="text-sm">{description}</p>

      <ul className="text-sm">{children}</ul>

      <PlanButtonAction
        className={themes[theme].button}
        currentPlanId={currentPlanId}
        callToActionText={callToActionText}
        plan={{ price, type, _id, disable }}
      />
    </div>
  );
};

Plan.Item = PlanItem;