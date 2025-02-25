import { createSelector } from "reselect";

import { RootState } from "~/store";

const projectsSelectors = (state: RootState) => state.projects;

export const getIsProjectsFetching = createSelector(
  [projectsSelectors],
  (result) => {
    return result.isFetching;
  },
);

export const getIsFileFetching = createSelector(
  [projectsSelectors],
  (result) => {
    return result.isFileFetching;
  },
);

export const getIsProjectsAudioFetching = createSelector(
  [projectsSelectors],
  (result) => {
    return result.isAudioFetching;
  },
);

export const getProjectId = (name?: string) =>
  createSelector([projectsSelectors], (result) => {
    return result.projects.find((project) => project.name === name)?.id ?? 0;
  });

export const getProjectsMessages = (chatId?: number, name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (name && chatId && projects.length) {
      return (
        projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.id === chatId)?.messages ?? null
      );
    }

    return null;
  });

export const getIsWaiting = (chatId?: number) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && projects.length) {
      return projects.some((project) =>
        project.chats.some(
          (chat) => chat.id === chatId && chat.waitingUserResponse,
        ),
      );
    }

    return false;
  });

export const getWaitingProject = (chatId?: number) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && projects.length) {
      return projects.find((project) => {
        return project.chats.some(
          (chat) => chat.id === chatId && chat.waitingUserResponse,
        );
      });
    }

    return null;
  });

export const getOldestMessageId = (chatId?: number, name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (name && chatId && projects.length) {
      const projectMessages =
        projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.id === chatId)?.messages?.results ?? [];

      return projectMessages[projectMessages.length - 1].id;
    }

    return null;
  });

export const getNewestMessageId = (chatId?: number, name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (name && chatId && projects.length) {
      const projectMessages =
        projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.id === chatId)?.messages?.results ?? [];

      return projectMessages[0].id;
    }

    return null;
  });

export const getCurrentDescription = (name?: string) =>
  createSelector([projectsSelectors], (result) => {
    return (
      result.projects.find((project) => project.name === name)?.description ??
      ''
    );
  });

export const getGuidanceQuestion = createSelector(
  [projectsSelectors],
  (result) => {
    return result.guidanceQuestion;
  },
);

export const getEmptyChat = (name: string) =>
  createSelector([projectsSelectors], (result) => {
    if (name && result.projects.length) {
      return (
        result.projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.numberOfMessages === 0) ?? null
      );
    }

    return '';
  });

export const getCurrentProject = (name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (name && projects.length) {
      return projects.find((project) => project.name === name) ?? null;
    }

    return null;
  });

export const getChatData = (chatId?: number) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (!chatId) {
      return { currentYearId: null, currentMonthId: null, id: null };
    }

    const foundChat = projects
      .flatMap((project) => project.years)
      .flatMap((year) => {
        return year.months.flatMap((month) => {
          return month.chats;
        });
      })
      .find((chat) => chat.id === chatId);

    if (foundChat) {
      return {
        currentYearId: new Date(foundChat.createdAt).getFullYear(),
        currentMonthId: new Date(foundChat.createdAt).toLocaleString('en-US', {
          month: 'long',
        }),
        id: chatId,
      };
    }

    return { currentYearId: null, currentMonthId: null, id: null };
  });

export const getCurrentFile = (chatId?: number, name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && name) {
      const project = projects.find((project) => project.name === name);
      const chat = project?.chats.find((chat) => chat.id === chatId);

      return {
        file: chat?.files[0] ?? null,
        isFileContext: chat?.isFileContext ?? false,
      };
    }

    return {
      file: null,
      isFileContext: false,
    };
  });
