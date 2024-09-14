import { getCurrentDate } from '@moneytrack/shared/helpers';

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Serverless!' + getCurrentDate(),
    }),
  };
};
