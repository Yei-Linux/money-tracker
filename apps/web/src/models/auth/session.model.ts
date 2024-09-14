import mongoose from 'mongoose';

interface Session {
  _id: mongoose.Types.ObjectId;
  __v: string;
  id: string;
  expires: Date;
  sessionToken: string;
  userId: mongoose.Types.ObjectId;
}

const sessionDBSchema = new mongoose.Schema<Session>({
  expires: { type: Date },
  sessionToken: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose?.models?.Sessions ||
  mongoose.model('Sessions', sessionDBSchema);
