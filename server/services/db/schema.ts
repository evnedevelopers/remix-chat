import { integer, pgTable, timestamp, varchar, text, primaryKey, pgEnum, date } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('firstname', { length: 255 }).notNull(),
  lastName: varchar('lastname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text().notNull(),
  gender: genderEnum("gender").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  photo: varchar({ length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const chatsTable = pgTable("chats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 160 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const usersToChatsTable = pgTable('users_to_chats', {
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  chatId: integer('chat_id')
    .notNull()
    .references(() => chatsTable.id),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  chats: many(usersToChatsTable),
  messages: many(messagesTable)
}));

export const chatsRelations = relations(chatsTable, ({ many }) => ({
  messages: many(messagesTable),
  projects: many(chatsToProjectsTable),
  participants: many(usersToChatsTable),
}));

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  chatId: integer('chat_id'),
  authorId: integer('author_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  chat: one(chatsTable, {
    fields: [messagesTable.chatId],
    references: [chatsTable.id],
  }),
  author: one(usersTable, {
    fields: [messagesTable.authorId],
    references: [usersTable.id],
  })
}));

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 160 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  iconDark: varchar('icon_dark', { length: 255 }).notNull(),
  iconLight: varchar('icon_light', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const chatsToProjectsTable = pgTable(
  'chats_to_projects',
  {
    chatId: integer()
      .notNull()
      .references(() => chatsTable.id),
    projectId: integer()
      .notNull()
      .references(() => projectsTable.id),
  },
  (t) => [
    primaryKey({ columns: [t.chatId, t.projectId] })
  ],
);

export const projectRelations = relations(projectsTable, ({ many }) => ({
  chats: many(chatsToProjectsTable),
}));


