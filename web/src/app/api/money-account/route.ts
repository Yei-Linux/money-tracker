import { catchApiError } from "@/lib/api-error-handler";
import { getUserIdFromReq } from "@/lib/auth/auth";
import { getSettingsMoneyAccount } from "@/use-cases";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = getUserIdFromReq(req);
    const response = await getSettingsMoneyAccount(user);

    return NextResponse.json({
      data: response,
      message: "This is your money account",
    });
  } catch (error) {
    return catchApiError(error);
  }
};
