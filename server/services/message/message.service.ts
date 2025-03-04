import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { 
  messagesTable,
  savedMessagesTable,
  usersTable
} from "../db/schema";
import { ProjectService } from "../project/project.service";

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

  static async findOrMarkAsSaved({
    authorId,
    messageId,
  }: {
    authorId: number;
    messageId: number;
  }) {
    const [savedAt] = await db
      .select({
        id: savedMessagesTable.id,
        authorId: savedMessagesTable.authorId,
        createdAt: savedMessagesTable.createdAt,
      })
      .from(savedMessagesTable)
      .where(and(
        eq(savedMessagesTable.authorId, authorId),
        eq(savedMessagesTable.messageId, messageId)
      ))
      .limit(1);

    if (savedAt) return [savedAt];

    return db
      .insert(savedMessagesTable)
      .values({ authorId, messageId })
      .returning({
        id: savedMessagesTable.id,
        authorId: savedMessagesTable.authorId,
        createdAt: savedMessagesTable.createdAt
      });
  }

  static unmarkSaved({
    authorId,
    messageId,
  }: {
    authorId: number;
    messageId: number;
  }) {
    return db.delete(savedMessagesTable).where(
      and(
        eq(savedMessagesTable.authorId, authorId),
        eq(savedMessagesTable.messageId, messageId)
      )
    );
  }

  static async getUserMessage(userId: number, messageId: number) {
    const table = ProjectService.getChatMessagesTable().as('chat_messages');

    const [message] = await db
      .select({
        id: table.id,
        text: table.text,
        createdAt: table.createdAt,
        files: table.files,
        images: table.images,
        author: table.author,
        savedAt: table.savedAt,
      })
      .from(table)
      .where(eq(table.id, messageId))
      .limit(1);

    if ((message?.author as { id: number }).id !== userId) {
      throw new Response("Forbidden", { status: 403 });
    }

    return message || null;
  }
}