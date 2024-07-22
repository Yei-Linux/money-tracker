import connect from '@/lib/db/mongoose';

export async function register() {
  await connect();
}
