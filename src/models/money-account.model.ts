import mongoose from 'mongoose';

interface MoneyAccount {
  _id: mongoose.Types.ObjectId;
  _v: string;
  money: number;
  user: mongoose.Types.ObjectId;
}

const moneyAccountDBSchema = new mongoose.Schema<MoneyAccount>(
  {
    money: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.MoneyAccounts ||
  mongoose.model('MoneyAccounts', moneyAccountDBSchema);
