import * as bcrypt from 'bcrypt';

export class BcryptTool {
  static async hash(password: string): Promise<string> {
    const saltRounds = bcrypt.genSaltSync(10);

    return await bcrypt.hash(password, saltRounds);
  }

  static async compare(data: string, encryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(data, encryptedPassword);
  }
}