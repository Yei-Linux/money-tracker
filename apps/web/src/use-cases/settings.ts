import { userModel } from '@moneytrack/shared/models';
import { GetMySettings } from '../types/my-settings';

export const getMySettings = async (user: string): Promise<GetMySettings> => {
  const profile = await userModel.findOne({ _id: user }).select({
    email: true,
    name: true,
    phone: true,
    image: true,
    country: true,
    address: true,
    plan: true,
  });

  return { profile };
};

export const getMyPaymentSettings = async (user: string) => {
  const payment = await userModel
    .findOne({ _id: user })
    .select({
      plan: true,
    })
    .populate('plan', '_id type description price');

  return payment;
};
