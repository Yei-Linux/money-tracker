export type TPricingPlan = {
  _id: string;
  image: string;
  type: string;
  price: number;
  description: string;
  callToActionText: string;
  theme: 'dark' | 'light';

  disable: boolean;
  benefits: Array<string>;
};

export type TPricingPlans = Array<TPricingPlan>;

export type PaymentWebhookPayload = {
  data: { id: string };
  type: string;
  id: string;
};
