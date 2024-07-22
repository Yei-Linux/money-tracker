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
}

const userDBSchema = new mongoose.Schema<User>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.Users || mongoose.model('Users', userDBSchema);
