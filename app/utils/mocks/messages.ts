import { IMessage } from "~/utils/typedefs";
import { users } from "~/utils/mocks/users";
import { chats } from "~/utils/mocks/chats";

export const messages: IMessage[] = [
  {
    id: '1',
    text: 'Hello 😀',
    authorId: users[0].id,
    chatId: chats[0].id,
    createdAt: new Date(Date.now() - 60 * 1000).toLocaleString(),
  },
  {
    id: '2',
    text: '🫡',
    chatId: chats[0].id,
    authorId: users[1].id,
    createdAt: new Date(Date.now() - 60 * 2000).toLocaleString(),
  }
]