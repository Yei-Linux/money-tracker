import dbConnect from '../../src/lib/db';
import categoriesModel from '../../src/models/categories.model';
import transactionTypesModel from '../../src/models/transaction-types.model';
import parentCategoriesModel from '../../src/models/parent-categories.model';

import { transactionTypesSeeder } from './transaction-types';
import { parentCategoriesSeeder } from './parent-categories';
import { categoriesSeeder } from './categories';

const buildUpsert = (doc: { _id: string } & Record<string, any>) => ({
  updateOne: {
    filter: { _id: doc._id },
    update: doc,
    upsert: true,
  },
});

const executeSeeders = async () => {
  try {
    await dbConnect();

    const transactionTypes = transactionTypesSeeder.map(buildUpsert);
    const parentCategories = parentCategoriesSeeder.map(buildUpsert);
    const categories = categoriesSeeder.map(buildUpsert);

    transactionTypesModel.bulkWrite(transactionTypes);
    parentCategoriesModel.bulkWrite(parentCategories);
    categoriesModel.bulkWrite(categories);
    console.log('Operation completed!');
  } catch (error) {
    console.log('Operation stopped by an error');
  }
};

executeSeeders();
