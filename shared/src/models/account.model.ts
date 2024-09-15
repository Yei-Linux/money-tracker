import mongoose from 'mongoose';

interface Account {
  _id: mongoose.Types.ObjectId;
  __v: string;
  id: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string;
  id_token: string;
  userId: mongoose.Types.ObjectId;
  oauth_token_secret: string;
  oauth_token: string;
  session_state: string;
}

const accountDBSchema = new mongoose.Schema<Account>({
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  oauth_token_secret: { type: String },
  oauth_token: { type: String },
  session_state: { type: String },
});

export default mongoose?.models?.['Accounts'] ||
  mongoose.model('Accounts', accountDBSchema);
