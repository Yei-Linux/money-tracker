import mongoose from 'mongoose';

const parentCategoryDBSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

parentCategoryDBSchema.virtual('categories', {
  localField: '_id',
  ref: 'Categories',
  foreignField: 'parentCategory',
});

export default mongoose.models.ParentCategories ||
  mongoose.model('ParentCategories', parentCategoryDBSchema);
