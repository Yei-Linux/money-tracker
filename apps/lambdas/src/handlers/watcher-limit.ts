import connectDB from '@moneytrack/shared/lib/mongoose';

import { getCurrentDate } from '@moneytrack/shared/helpers';
import { userModel } from '@moneytrack/shared/models';
import { sendEmailWatchingExpenseLimit } from '@moneytrack/shared/use-cases';

export const getAllUsersBy = async () => {
  const users = await userModel.find().select({ _id: true, email: true });
  return users;
};

export const handler = async (event) => {
  try {
    await connectDB();

    const usersNotifiedByEmail = [];
    const allUsers = await getAllUsersBy();

    for (let { _id } of allUsers) {
      await sendEmailWatchingExpenseLimit(_id);
      usersNotifiedByEmail.push(_id);
      console.log(`Email sent to user ${_id}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: usersNotifiedByEmail,
        message: `Function executed at ${getCurrentDate()}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        data: [],
        message: `Error at ${getCurrentDate()}: ${error.message}`,
      }),
    };
  }
};
