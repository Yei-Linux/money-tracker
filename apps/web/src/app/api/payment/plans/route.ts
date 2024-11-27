import { catchApiError } from '@moneytrack/web/lib/api-error-handler';
import { plansModel } from '@moneytrack/web/models';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const plans = await plansModel.find();

    return NextResponse.json({
      data: plans ?? [],
      message: 'Plans retrieved successfull',
    });
  } catch (error) {
    return catchApiError(error);
  }
};

export const revalidate = 10;
