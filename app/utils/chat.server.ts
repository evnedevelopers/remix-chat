import { chats } from "~/utils/mocks/chats";
import { IChat, IChatEntity, IForkChat, IMessageChat } from "~/utils/typedefs";
import { findChatProject } from "~/utils/project.server";
import { findChatMessages } from "~/utils/message.server";

export const findProjectChats = (projectId: string): IChat[] => {
  return chats.filter((chat) => chat.projectId === projectId)
    .map((chat) => {
      const messages = findChatMessages(chat.id);

      return {
        id: chat.id,
        name: chat.name,
        created_at: chat.created_at,
        waiting_user_response: chat.waiting_user_response,
        number_of_messages: messages.count || 0,
        messages: messages,
        files: [],
        is_file_context: false,
      }
    });
}

export const findUserChats = (userId: string): IChatEntity[] => {
  return chats.filter((chat) => chat.participantIds.includes(userId));
}

export const findMessageChat = (chatId?: string): IMessageChat | null => {
  const chat = chats.find((chat) => chat.id === chatId);

  if (!chat) return null;

  return {
    id: chat.id,
    name: chat.name,
    project: findChatProject(chat.projectId),
    created_at: chat.created_at,
  }
}

export const findForkChat = (chatId: string): IForkChat | null => {
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) return null;

  const project = findChatProject(chat.projectId);

  return {
    id: chat.id,
    name: chat.name,
    project: project,
    created_at: chat.created_at
  }
}
