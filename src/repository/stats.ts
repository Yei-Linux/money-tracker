import { firstDayOfMonth } from "@/lib/date";
import { transactionsModel } from "@/models";
import { TTransactionStats } from "@/types/transaction-stats";
import mongoose from "mongoose";

export const getStatsOfMonth = async (
  userId: string
): Promise<TTransactionStats> => {
  return await transactionsModel.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(firstDayOfMonth()) },
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "transactiontypes",
        localField: "transactionType",
        foreignField: "_id",
        as: "transactionTypeDetails",
      },
    },
    {
      $unwind: "$transactionTypeDetails",
    },
    {
      $group: {
        _id: {
          id: "$transactionTypeDetails._id",
          type: "$transactionTypeDetails.type",
          theme: "$transactionTypeDetails.theme",
        },
        total: { $sum: "$price" },
        length: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: "$_id.id",
        type: "$_id.type",
        value: "$total",
        theme: "$_id.theme",
        length: "$length",
      },
    },
  ]);
};
