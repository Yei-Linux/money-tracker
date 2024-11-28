import { TProfileSchema } from '../validators/profile.validator';

export type GetMySettings = {
  profile: Omit<TProfileSchema, 'image'> & {
    image: string | null;
    plan?: string;
  };
};

export type GetMyPaymentSettings = {
  _id: string;
  plan: {
    _id: string;
    description: string;
    price: number;
    type: string;
  };
};
