import { compare } from 'bcrypt';

export class Crypt {
  static async compare(hashedPassword: string, password: string) {
    const isEquals = await compare(password, hashedPassword);
    return isEquals;
  }
}
