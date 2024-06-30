import categoriesModel from '@/models/categories.model';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const categories = await categoriesModel.find();
    return NextResponse.json({
      data: categories ?? [],
      message: 'Categories retrieved',
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error getting categories' });
  }
};

export const revalidate = 10;
