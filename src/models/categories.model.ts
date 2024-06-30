import mongoose from 'mongoose';

const categoryDBSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Categories ||
  mongoose.model('Categories', categoryDBSchema);
