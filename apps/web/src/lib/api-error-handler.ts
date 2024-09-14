import { ServerError } from '@moneytrack/web/errors/ServerError';

export const catchApiError = (error: unknown) => {
  const isInstanceOf = error instanceof ServerError;
  const message = (error as Error).message;

  return new Response(
    JSON.stringify({
      message: isInstanceOf ? message : 'There was an unexpected error',
    }),
    {
      status: 500,
    }
  );
};
