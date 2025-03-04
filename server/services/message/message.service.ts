import { db } from "../db";
import { 
  messagesTable,
  savedMessagesTable,
  usersTable
} from "../db/schema";
import { eq } from "drizzle-orm";

export class MessageService {
  static async create({
    text,
    authorId,
    chatId
  }: {
    text: string;
    authorId: number;
    chatId: number;
  }) {
    const [newMessage] = await db
      .insert(messagesTable)
      .values({
        text,
        authorId,
        chatId,
      })
      .returning({
        id: messagesTable.id,
        text: messagesTable.text,
        createdAt: messagesTable.createdAt,
      });

    const [author] = await db.select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName
      })
      .from(usersTable)
      .where(eq(usersTable.id, authorId));

    return {
      ...newMessage,
      files: [],
      images: [],
      author: author || null
    };
  }

  static markAsSaved({
    authorId,
    messageId,
  }: {
    authorId: number;
    messageId: number;
  }) {
    return db.insert(savedMessagesTable).values({ authorId, messageId }).returning();
  }
}