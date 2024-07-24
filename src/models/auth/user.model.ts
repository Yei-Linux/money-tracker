import { Crypt } from '@/lib/crypt';
import mongoose from 'mongoose';

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

export default mongoose?.models?.Users || mongoose.model('Users', userDBSchema);
