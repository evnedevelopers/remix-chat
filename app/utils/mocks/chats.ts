import { IChatEntity } from "~/utils/typedefs";
import { users } from "~/utils/mocks/users";
import { projects } from "~/utils/mocks/projects";

export const chats: IChatEntity[] = [
  {
    id: '1',
    name: 'Remix Chat',
    created_at: new Date(Date.now() - 3600).toISOString(),
    participantIds: [users[0].id, users[1].id],
    projectId: projects[0].id,
    waiting_user_response: false,
  }
];