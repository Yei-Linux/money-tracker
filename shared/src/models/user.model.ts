import mongoose from 'mongoose';

import { Crypt } from '../helpers';
import moneyAccountModel from './money-account.model';
import { categoriesInitialByUser } from '../constants/init-categories';
import parentCategoriesModel from './parent-categories.model';
import categoriesModel from './categories.model';

interface User {
  _id: mongoose.Types.ObjectId;
  __v: string;
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  password: string | null;
}

const userDBSchema = new mongoose.Schema<User>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minlength: 8 },
    phone: { type: String },
    emailVerified: { type: Date, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

userDBSchema.pre('save', async function (next) {
  const user = this;
  if (!user?.password) {
    return next();
  }

  try {
    const passwordHashed = await Crypt.hash(user.password);
    user.password = passwordHashed;

    next();
  } catch (error) {
    return next(Error((error as Error).message));
  }
});

userDBSchema.post('save', async function (userCreated, next) {
  try {
    await moneyAccountModel.create({
      money: 0,
      user: userCreated._id,
    });

    for (const { category, children } of categoriesInitialByUser) {
      const parentCategory = await parentCategoriesModel.create({
        category,
        user: userCreated._id,
      });
      if (!children.length) continue;

      const childrens = children.map((item) => ({
        ...item,
        parentCategory: parentCategory._id,
      }));
      await categoriesModel.insertMany(childrens);
    }

    next();
  } catch (error) {
    const errorMessage = (error as Error).message;
    return next(Error(errorMessage));
  }
});

export default mongoose?.models?.['Users'] ||
  mongoose.model('Users', userDBSchema);
