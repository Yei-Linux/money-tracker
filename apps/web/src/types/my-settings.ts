import { TProfileSchema } from '../validators/profile.validator';

export type GetMySettings = {
  profile: Omit<TProfileSchema, 'image'> & { image: string | null };
};
