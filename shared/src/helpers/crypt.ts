import { compare, hash } from 'bcryptjs';

export class Crypt {
  static async compare(hashedPassword: string, password: string) {
    const isEquals = await compare(password, hashedPassword);
    return isEquals;
  }

  static async hash(password: string) {
    return await hash(password, process.env['PASSWORD_SALT']!);
  }
}
