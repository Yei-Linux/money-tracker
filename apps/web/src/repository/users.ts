import userModel from '@moneytrack/web/models/auth/user.model';

export const getAllUsersBy = async () => {
  const users = await userModel.find().select({ _id: true, email: true });
  return users;
};
