import { catchApiError } from "@/lib/api-error-handler";
import { getUserIdFromReq } from "@/lib/auth/auth";
import { getStatsOfMonth } from "@/repository/stats";
import { getStats } from "@/use-cases/transactions";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = getUserIdFromReq(req);
    const transactionsStats = await getStatsOfMonth(userId);

    const totalStats = transactionsStats.reduce((acc, item) => {
      return acc + item.value;
    }, 0);

    const completedStats = getStats(transactionsStats, totalStats);

    return NextResponse.json({
      data: completedStats,
      message: "Transactions Stats",
    });
  } catch (error) {
    return catchApiError(error);
  }
};
