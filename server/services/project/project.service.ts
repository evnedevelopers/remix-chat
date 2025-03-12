import { db } from '../db';
import { desc, eq, sql } from "drizzle-orm";
import {
  chatsTable,
  chatsToProjectsTable, messagesActionsTable,
  messagesTable,
  projectsTable,
  savedMessagesTable,
  usersTable,
  usersToChatsTable
} from "../db/schema";

export class ProjectService {
  static findUserProjects(userId: number) {
    const chatMessagesTable = this.getChatMessagesTable()
      .where(eq(messagesTable.chatId, chatsTable.id))
      .limit(20)
      .as('latest_messages');

    return db.select({
      id: projectsTable.id,
      name: projectsTable.name,
      description: projectsTable.description,
      iconDark: projectsTable.iconDark,
      iconLight: projectsTable.iconLight,
      chats: sql`
        json_agg(
          json_build_object(
            'id', ${chatsTable.id},
            'name', ${chatsTable.name},
            'files', '[]'::json,
            'createdAt', ${chatsTable.createdAt},
            'messages', json_build_object(
              'status', TRUE,
              'count', (
                SELECT COUNT(${messagesTable}.*)
                FROM ${messagesTable}
                WHERE ${messagesTable.chatId} = ${chatsTable.id}
              ),
              'results', (
                SELECT json_agg(
                  json_build_object(
                    'id', latest_messages.id,
                    'text', latest_messages.text,
                    'files', '[]'::json,
                    'images', '[]'::json,
                    'author', latest_messages.author,
                    'savedAt', latest_messages."savedAt",
                    'createdAt', latest_messages.created_at
                  )
                )
                FROM ${chatMessagesTable}
              )
            )
          )
        )
      `
    })
    .from(projectsTable)
    .leftJoin(chatsToProjectsTable, eq(projectsTable.id, chatsToProjectsTable.projectId))
    .leftJoin(chatsTable, eq(chatsToProjectsTable.chatId, chatsTable.id))
    .leftJoin(usersToChatsTable, eq(chatsTable.id, usersToChatsTable.chatId))
    .where(eq(usersToChatsTable.userId, userId))
    .groupBy(projectsTable.id);
  }

  static async findUserChatMessages({
    userId,
    chatId
  }: {
    userId: number,
    chatId: number
  }) {
    await this.findUserChat({ userId, chatId });
    const messages = await this.findChatMessages(chatId);

    if (!messages.length) return { results: [], status: true, count: 0 };

    return messages[0];
  }

  static async findUserChat({
    userId,
    chatId
  } : {
    chatId: number,
    userId: number
  }) {
    const chat = await db.query.chatsTable.findMany({
      where: eq(chatsTable.id, chatId),
      with: {
        participants: {
          where: eq(usersToChatsTable.userId, userId),
        }
      }
    });

    if (!chat) {
      throw new Response("Unauthorized", { status: 403 });
    }

    return chat;
  }

  static async findChatMessages(chatId: number) {
    const chatMessagesTable = this.getChatMessagesTable()
      .where(eq(messagesTable.chatId, chatId))
      .limit(20)
      .as('chat_messages');

    return db.select({
      status: sql`TRUE`,
      count: sql`COUNT(${messagesTable}.id)::INTEGER`,
      results: sql`
        (
          SELECT json_agg(
            json_build_object(
              'id', chat_messages.id,
              'text', chat_messages.text,
              'files', '[]'::json,
              'images', '[]'::json,
              'author', chat_messages.author,
              'savedAt', chat_messages."savedAt",
              'messageRate', chat_messages."messageRate",
              'createdAt', chat_messages.created_at
            )
          )
          FROM ${chatMessagesTable}
        )
      `
    })
    .from(messagesTable)
    .where(eq(messagesTable.chatId, chatId))
    .groupBy(messagesTable.chatId);
  }

  static getChatMessagesTable() {
    return db
      .select({
        id: messagesTable.id,
        text: messagesTable.text,
        createdAt: messagesTable.createdAt,
        files: sql`'[]'::json`.as('files'),
        images: sql`'[]'::json`.as('images'),
        author: sql`
          json_build_object(
            'id', ${usersTable.id},
            'firstName', ${usersTable.firstName},
            'lastName', ${usersTable.lastName}
          )
        `.as('author'),
        savedAt: sql`COALESCE((
          SELECT json_agg(saved.savedAt)
          FROM (
            SELECT json_build_object(
              'id', ${savedMessagesTable}.id,
              'authorId', ${savedMessagesTable}.author_id,
              'createdAt', ${savedMessagesTable}.created_at
            ) as savedAt
            FROM ${savedMessagesTable}
            WHERE ${messagesTable.id} = ${savedMessagesTable}.message_id
            ORDER BY ${savedMessagesTable}.created_at DESC
          ) as saved
        ), '[]'::json)`.as('savedAt'),
        messageRate: sql`COALESCE((
          SELECT json_agg(action.rate)
          FROM (
            SELECT json_build_object(
              'id', ${messagesActionsTable}.id,
              'authorId', ${messagesActionsTable}.author_id,
              'action', ${messagesActionsTable}.action
            ) as rate
            FROM ${messagesActionsTable}
            WHERE ${messagesTable.id} = ${messagesActionsTable}.message_id
          ) as action
        ), '[]'::json)`.as('messageRate'),
      })
      .from(messagesTable)
      .leftJoin(usersTable, eq(messagesTable.authorId, usersTable.id))
      .orderBy(desc(messagesTable.createdAt), desc(messagesTable.id));
  }
}