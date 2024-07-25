import { catchApiError } from '@/lib/api-error-handler';
import { transactionTypesModel } from '@/models';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const transactionTypes = await transactionTypesModel.find().select({
      _id: true,
      type: true,
    });

    return NextResponse.json({
      data: transactionTypes ?? [],
      message: 'Transaction Types retrieved successfull',
    });
  } catch (error) {
    return catchApiError(error);
  }
};
