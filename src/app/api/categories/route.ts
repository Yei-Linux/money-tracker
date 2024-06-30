import { parentCategoriesModel } from '@/models';
import { TCategories } from '@/types/categories';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
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
    console.log(error);
    return NextResponse.json({ message: 'Error getting categories' });
  }
};

export const revalidate = 10;
