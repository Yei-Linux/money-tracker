import { catchApiError } from '@/lib/api-error-handler';
import { parentCategoriesModel } from '@/models';
import { TCategories } from '@/types/categories';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const parentCategories: TCategories = await parentCategoriesModel
      .find()
      .select({
        _id: true,
        category: true,
      })
      .populate('categories', '_id category');

    return NextResponse.json({
      data: parentCategories ?? [],
      message: 'Categories retrieved',
    });
  } catch (error) {
    return catchApiError(error);
  }
};

export const revalidate = 10;
