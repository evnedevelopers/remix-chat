import { projects } from "~/utils/mocks/projects";
import { findProjectChats, findUserChats } from "~/utils/chat.server";
import { IMessageChatProject, IMessageProject, IProjects } from "~/utils/typedefs";

export const findUserProjects = (userId: string): IProjects[] => {
  const chats = findUserChats(userId);

  return projects.filter(({ id }) =>
    chats.find(chat => chat.projectId === id)
  ).map((project) => {
    return {
      ...project,
      chats: findProjectChats(project.id),
      years: [],
      guidances: []
    }
  });
}

export const findChatProject = (projectId: string): IMessageChatProject | null => {
  const project = projects.find((project) => project.id === projectId);
  if (!project) return null;

  return {
    id: project.id,
    name: project.name,
  }
}

export const findMessageProject = (projectId?: string): IMessageProject | null => {
  const project = projects.find((project) => project.id === projectId);
  if (!project) return null;

  return {
    id: project.id,
    name: project.name,
    icon_light: project.icon_light,
    icon_dark: project.icon_dark,
  }
}