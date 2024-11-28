import { GetMyPaymentSettings, GetMySettings } from '../types/my-settings';

export const getSettingsProfile = async (
  cookie = ''
): Promise<GetMySettings | null> => {
  try {
    const promise = await fetch(`${process.env.URL}/api/settings/profile`, {
      headers: {
        cookie,
      },
    });
    const json = await promise.json();
    return json.data;
  } catch (error) {
    return null;
  }
};

export const getPaymentSettings =
  async (): Promise<GetMyPaymentSettings | null> => {
    try {
      const promise = await fetch(`/api/settings/payment`);
      const json = await promise.json();
      return json.data;
    } catch (error) {
      return null;
    }
  };
