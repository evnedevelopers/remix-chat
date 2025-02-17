import 'dotenv/config';
import { db } from "./index";
import {
  chatsTable,
  chatsToProjectsTable,
  messagesTable,
  projectsTable,
  usersTable,
  usersToChatsTable
} from "./schema";
import { BcryptTool } from "../tools/bcrypt.tool";

async function seed() {
  console.log('Seeding database...');

  const users = await db.insert(usersTable)
    .values([
      {
        firstName: 'First',
        lastName: 'User',
        email: 'test1@test.com',
        gender: "male",
        dateOfBirth: "2000-01-01",
        password: await BcryptTool.hash(process.env.DEFAULT_USER_PASSWORD!),
      },
      {
        firstName: 'Second',
        lastName: 'User',
        email: 'test2@test.com',
        gender: "female",
        password: await BcryptTool.hash(process.env.DEFAULT_USER_PASSWORD!),
        dateOfBirth: "1998-06-05",
      }
    ])
    .returning();

  const chat = await db.insert(chatsTable)
    .values([
      { name: 'Remix Chat' }
    ])
    .returning();

  const project = await db.insert(projectsTable)
    .values([
      {
        name: 'Remix Chat Project',
        description: 'Description for Remix Chat Project',
        iconDark: '/assets/darkLogo.png',
        iconLight: '/assets/lightLogo.png',
      },
    ])
    .returning();

  await db.insert(chatsToProjectsTable)
    .values([
      { chatId: chat[0].id, projectId: project[0].id },
    ]);

  await db.insert(usersToChatsTable)
    .values([
      { userId: users[0].id, chatId: chat[0].id },
      { userId: users[1].id, chatId: chat[0].id },
    ]);

  await db.insert(messagesTable)
    .values([
      {
        text: `Hello. It's a seeder message.`,
        chatId: chat[0].id,
        authorId: users[0].id,
      },
      {
        text: 'Nice 😀',
        chatId: chat[0].id,
        authorId: users[1].id,
      }
    ]);

  console.log('Seeding completed.');
}

// Run seeding
seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


