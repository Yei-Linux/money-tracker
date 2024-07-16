const AUTH = {
  SECRET: process.env.AUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? '',
};

export const envs = {
  ...AUTH,
};
