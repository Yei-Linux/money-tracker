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
  });

  return { profile };
};
