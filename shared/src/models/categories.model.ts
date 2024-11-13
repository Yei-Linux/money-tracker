import mongoose from 'mongoose';

const categoryDBSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParentCategories',
    },
    transactionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransactionTypes',
    },
  },
  { timestamps: true }
);

export default mongoose.models?.['Categories'] ||
  mongoose.model('Categories', categoryDBSchema);
