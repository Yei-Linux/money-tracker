import mongoose from 'mongoose';

interface HistoryMoneySettings {
  _id: mongoose.Types.ObjectId;
  _v: string;

  moneyAccount: mongoose.Types.ObjectId;
  expenseLimit: number | null;
  incomeGoal: number | null;
}

const historyMoneySettings = new mongoose.Schema<HistoryMoneySettings>(
  {
    moneyAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MoneyAccounts',
    },
    expenseLimit: { type: Number, default: null },
    incomeGoal: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.['HistoryMoneySettingss'] ||
  mongoose.model('HistoryMoneySettingss', historyMoneySettings);
