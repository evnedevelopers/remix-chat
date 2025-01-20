import { messages } from "~/utils/mocks/messages";
import { IMessage, IMessages } from "~/utils/typedefs";
import { findMessageChat } from "~/utils/chat.server";
import { findMessageProject } from "~/utils/project.server";

export const findChatMessages = (chatId: string): IMessages => {
  const chatMessages: IMessage[] = messages.filter((message) =>
    message.chatId === chatId
  ).map((message) => {
    return {
      ...message,
      project: findMessageProject(message.projectId),
      chat: findMessageChat(message.chatId),
      fork_chat: null,
      images: [],
      files: []
    }
  });

  return {
    status: true,
    count: chatMessages.length,
    results: chatMessages,
  }
}