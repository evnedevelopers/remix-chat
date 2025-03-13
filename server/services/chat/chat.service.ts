import { db } from "../db";
import { chatsTable, usersToChatsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";

export class ChatService {
  static async isUserChat(userId: number, chatId: number) {
    const result = await db
      .select()
      .from(usersToChatsTable)
      .where(
        and(
          eq(usersToChatsTable.userId, userId),
          eq(usersToChatsTable.chatId, chatId)
        )
      )
      .limit(1);

    return !!result.length;
  }

  static async updateChatName(chatId: number, name: string) {
    return db.update(chatsTable).set({ name }).where(eq(chatsTable.id, chatId));
  }
}