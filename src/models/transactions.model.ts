import mongoose from 'mongoose';

const transactionDBSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    transactionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransactionTypes',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transactions ||
  mongoose.model('Transactions', transactionDBSchema);
