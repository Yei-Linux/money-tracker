import connect from '@moneytrack/web/lib/db/mongoose';

export async function register() {
  await connect();
}
