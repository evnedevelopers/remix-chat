import { projects } from "~/utils/mocks/projects";

export const findUserProjects = (userId: string) => {
  return projects.filter((project) =>
    project.chats.find((chat) =>
      chat.participants.includes(userId)
    )
  );
}