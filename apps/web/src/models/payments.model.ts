import mongoose from 'mongoose';

const paymentsDBSchema = new mongoose.Schema(
  {
    transaction: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plans',
    },
    pricing: {
      type: Number,
      required: true,
    },
    cardMask: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payments ||
  mongoose.model('Payments', paymentsDBSchema);
