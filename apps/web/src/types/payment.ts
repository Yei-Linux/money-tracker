export type TPricingPlan = {
  image: string;
  type: string;
  price: number;
  description: string;
  callToActionText: string;
  theme: 'dark' | 'light';

  benefits: Array<string>;
};

export type TPricingPlans = Array<TPricingPlan>;
