import mongoose from 'mongoose';

const transactionDBSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const transactionDBModel = mongoose.model('Transactions', transactionDBSchema);

export default mongoose.models.Transactions || transactionDBModel;
