import { db } from '../db';
import { eq, sql } from "drizzle-orm";
import {
  chatsTable,
  chatsToProjectsTable,
  messagesTable,
  projectsTable, usersTable,
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
      chats: sql`json_agg(json_build_object(
        'id', ${chatsTable.id},
        'name', ${chatsTable.name},
        'files', '[]'::json,
        'createdAt', ${chatsTable.createdAt},
        'messages', (
          SELECT json_agg(json_build_object(
            'id', ${messagesTable.id},
            'text', ${messagesTable.text},
            'author', json_build_object(
              'id', ${usersTable.id},
              'firstName', ${usersTable.firstName},
              'lastName', ${usersTable.lastName},
              'email', ${usersTable.email}
            ),
            'createdAt', ${messagesTable.createdAt}
          ))
          FROM ${messagesTable}
          LEFT JOIN ${usersTable} ON ${eq(messagesTable.authorId, usersTable.id)}
          WHERE ${messagesTable.chatId} = ${chatsTable.id}
      )
      ))`.as('chats'),
    })
    .from(projectsTable)
    .leftJoin(chatsToProjectsTable, eq(projectsTable.id, chatsToProjectsTable.projectId))
    .leftJoin(chatsTable, eq(chatsToProjectsTable.chatId, chatsTable.id))
    .leftJoin(usersToChatsTable, eq(chatsTable.id, usersToChatsTable.chatId))
    .where(eq(usersToChatsTable.userId, userId))
    .groupBy(projectsTable.id);
  }
}