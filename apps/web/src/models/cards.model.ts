import mongoose from 'mongoose';

const cardsDBSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    mask: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Cards || mongoose.model('Cards', cardsDBSchema);
