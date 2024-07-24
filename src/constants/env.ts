const AUTH = {
  PASSWORD_SALT: +(process.env.AUTH_PASSWORD_SALT || 10),
  TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? '',
};

const DB = {
  DB_URI: process.env.MONGO_URI ?? '',
};

export const envs = {
  ...AUTH,
  ...DB,
};
