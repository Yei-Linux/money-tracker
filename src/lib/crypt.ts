import bcrypt from 'bcryptjs';

export class Crypt {
  static async compare(hashedPassword: string, password: string) {
    const isEquals = await bcrypt.compare(password, hashedPassword);
    return isEquals;
  }
}
