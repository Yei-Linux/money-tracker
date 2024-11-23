import mongoose from 'mongoose';

const plansDBSchema = new mongoose.Schema(
  {
    type: {
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

    theme: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    callToActionText: {
      type: String,
      required: true,
    },
    benefits: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Plans || mongoose.model('Plans', plansDBSchema);
