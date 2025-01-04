import { messages } from "~/utils/mocks/messages";

export const findChatMessages = (chatId?: string) => {
  if (!chatId) return [];

  return messages.filter((message) => message.chatId === chatId);
}