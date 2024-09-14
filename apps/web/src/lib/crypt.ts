import { envs } from '@moneytrack/web/constants/env';
import bcrypt from 'bcryptjs';

export class Crypt {
  static async compare(hashedPassword: string, password: string) {
    const isEquals = await bcrypt.compare(password, hashedPassword);
    return isEquals;
  }

  static async hash(password: string) {
    return await bcrypt.hash(password, envs.PASSWORD_SALT);
  }
}
