import mongoose from 'mongoose';

interface MoneyAccount {
  _id: mongoose.Types.ObjectId;
  _v: string;

  money: number;
  user: mongoose.Types.ObjectId;
  watcherLimit: boolean;
}

const moneyAccountDBSchema = new mongoose.Schema<MoneyAccount>(
  {
    money: { type: Number, required: true, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    watcherLimit: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.['MoneyAccounts'] ||
  mongoose.model('MoneyAccounts', moneyAccountDBSchema);
