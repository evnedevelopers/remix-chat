import { db } from '../db';
import { desc, eq, sql } from "drizzle-orm";
import {
  chatsTable,
  chatsToProjectsTable,
  messagesTable,
  projectsTable,
  usersTable,
  usersToChatsTable
} from "../db/schema";

export class ProjectService {
  static findUserProjects(userId: number) {
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
                    'createdAt', latest_messages.created_at
                  )
                )
                FROM (
                  SELECT 
                    ${messagesTable}.*, 
                    json_build_object(
                      'id', ${usersTable.id},
                      'firstName', ${usersTable.firstName},
                      'lastName', ${usersTable.lastName}
                    ) AS author
                  FROM ${messagesTable}
                  LEFT JOIN ${usersTable} ON ${messagesTable.authorId} = ${usersTable.id}
                  WHERE ${messagesTable.chatId} = ${chatsTable.id}
                  ORDER BY ${messagesTable.createdAt} DESC
                  LIMIT 20
                ) AS latest_messages
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

    return messages.map((message) => {
      return {
        ...message,
        results: [ ...message.results as { createdAt: string }[] ].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      }
    })[0];
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
    const chatMessagesTable = db
      .select({
        id: messagesTable.id,
        text: messagesTable.text,
        createdAt: messagesTable.createdAt,
        files: sql`'[]'::json`,
        images: sql`'[]'::json`,
        author: sql`
          json_build_object(
            'id', ${usersTable.id},
            'firstName', ${usersTable.firstName},
            'lastName', ${usersTable.lastName}
          ) as author
        `
      })
      .from(messagesTable)
      .leftJoin(usersTable, eq(messagesTable.authorId, usersTable.id))
      .where(eq(messagesTable.chatId, chatId))
      .orderBy(desc(messagesTable.createdAt))
      .limit(20)
      .as('chat_messages')

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
}