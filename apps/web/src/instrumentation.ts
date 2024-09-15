import connectDB from '@moneytrack/shared/lib/mongoose';

export async function register() {
  await connectDB();
}
