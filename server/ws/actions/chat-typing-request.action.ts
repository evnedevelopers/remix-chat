import { WsBaseMessageAction } from "./ws-base-socket-action";

type ChatTypingActionData = {
  chatId: number;
  authorId: number;
  isTyping: boolean;
}

export class ChatTypingRequestAction extends WsBaseMessageAction<ChatTypingActionData> {
  private chatTyping: Map<number, number[]> = new Map();

  async handle() {
    const { chatId, ...other } = this.data;

    const typingIds = ChatTypingRequestAction.refreshTypingIds(
      other,
      this.chatTyping.get(chatId),
    );
    this.chatTyping.set(chatId, typingIds);

    this.io.to(chatId.toString()).emit('userTyping', { chatId, typingIds });

    return typingIds;
  }

  private static refreshTypingIds(
    { isTyping, authorId }: Omit<ChatTypingActionData, 'chatId'>,
    typingIds: number[] = [],
  ) {
    if (isTyping) {
      if (!typingIds.includes(authorId)) typingIds.push(authorId);

      return typingIds;
    }

    return typingIds.filter((id) => id !== authorId);
  }
}