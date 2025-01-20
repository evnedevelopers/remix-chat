import { IMessageEntity } from "~/utils/typedefs";
import { users } from "~/utils/mocks/users";
import { chats } from "~/utils/mocks/chats";
import {projects} from "~/utils/mocks/projects";

export const messages: IMessageEntity[] = [
  {
    id: '1',
    text: 'Hello 😀',
    author: users[0].id,
    chatId: chats[0].id,
    projectId: projects[0].id,
    created_at: new Date(Date.now() - 60 * 1000).toLocaleString(),
    message_rate: null,
    saved_at: null,
    show_create_chat_message: false,
  },
  {
    id: '2',
    text: '🫡',
    chatId: chats[0].id,
    author: users[1].id,
    projectId: projects[0].id,
    created_at: new Date(Date.now() - 60 * 2000).toLocaleString(),
    message_rate: null,
    saved_at: null,
    show_create_chat_message: false,
  }
]