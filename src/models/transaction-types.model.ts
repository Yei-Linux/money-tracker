import mongoose from 'mongoose';

const transactionTypeDBSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TransactionTypes ||
  mongoose.model('TransactionTypes', transactionTypeDBSchema);
