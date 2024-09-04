import { moneyAccountModel } from "@/models";
import mongoose from "mongoose";

export const createMoneyAccountIfIsNewUser = async (userId: string) => {
  try {
    const moneyAccount = await moneyAccountModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
    if (moneyAccount) return;

    await moneyAccountModel.create({
      money: 0,
      user: userId,
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};
