import { eq } from "drizzle-orm";
import { db } from '../db';
import { usersTable } from "../db/schema";

export class UserService {
  static async findById(id: number) {
    return db.query.usersTable.findFirst({
      where: eq(usersTable.id, id)
    })
  }

  static async findByEmail(email: string) {
    return db.query.usersTable.findFirst({
      where: eq(usersTable.email, email)
    })
  }
}