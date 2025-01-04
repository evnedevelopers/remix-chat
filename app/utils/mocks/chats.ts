import { IChat } from "~/utils/typedefs";
import { users } from "~/utils/mocks/users";

export const chats: IChat[] = [
  {
    id: '1',
    name: 'Remix Chat',
    participants: [users[0].id, users[1].id],
  }
];