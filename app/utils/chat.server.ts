import { chats } from "~/utils/mocks/chats";
import { users } from "~/utils/mocks/users";

export const findUserChat = (userId: string) => {
  const chat = chats.find((chat) => chat.participants.includes(userId));

  return {
    ...chat,
    participants: chat?.participants
      .map((participantId) =>
        users.find(({ id }) => id === participantId)
      )
  }
}