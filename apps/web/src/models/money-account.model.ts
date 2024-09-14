import mongoose from 'mongoose';

interface MoneyAccount {
  _id: mongoose.Types.ObjectId;
  _v: string;

  money: number;
  incomes: number;
  expenses: number;

  user: mongoose.Types.ObjectId;
  expenseLimit: number | null;
  incomeGoal: number | null;
  watcherLimit: boolean;
}

const moneyAccountDBSchema = new mongoose.Schema<MoneyAccount>(
  {
    money: { type: Number, required: true, default: 0 },
    expenses: { type: Number, default: 0 },
    incomes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    expenseLimit: { type: Number, default: null },
    incomeGoal: { type: Number, default: null },
    watcherLimit: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.MoneyAccounts ||
  mongoose.model('MoneyAccounts', moneyAccountDBSchema);
