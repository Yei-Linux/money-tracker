import dbConnect from '../../src/lib/db/mongoose';
import transactionTypesModel from '../../src/models/transaction-types.model';

import { transactionTypesSeeder } from './transaction-types';

const buildUpsert = (doc: { _id: string } & Record<string, any>) => ({
  updateOne: {
    filter: { _id: doc._id },
    update: doc,
    upsert: true,
  },
});

const executeSeeders = async () => {
  try {
    //TODO: Remove this one and use the one of shared lib
    await dbConnect();

    const transactionTypes = transactionTypesSeeder.map(buildUpsert);

    transactionTypesModel.bulkWrite(transactionTypes);
    console.log('Operation completed!');
  } catch (error) {
    console.log('Operation stopped by an error');
  }
};

executeSeeders();
