import mongoose from 'mongoose';

interface VerificationToken {
  _id: mongoose.Types.ObjectId;
  __v: string;
  token: string;
  expires: Date;
  identifier: string;
}
const verificationTokenDBSchema = new mongoose.Schema<VerificationToken>(
  {
    token: { type: String },
    expires: { type: Date },
    identifier: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.VericationTokens ||
  mongoose.model('VericationTokens', verificationTokenDBSchema);
