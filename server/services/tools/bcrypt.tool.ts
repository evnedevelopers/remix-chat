import * as bcrypt from 'bcrypt';

export class BcryptTool {
  static async hash(password: string): Promise<string> {
    const saltRounds = bcrypt.genSaltSync(10);

    return await bcrypt.hash(password, saltRounds);
  }

  static async compare(data: string, encrypted?: string): Promise<boolean> {
    if (encrypted === undefined) return false;

    return bcrypt.compare(data, encrypted);
  }
}