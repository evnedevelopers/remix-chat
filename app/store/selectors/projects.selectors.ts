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

export const getIsPromptFetching = createSelector(
  [projectsSelectors],
  (result) => {
    return result.isPromptFetching;
  },
);

export const getProjects = createSelector([projectsSelectors], (result) => {
  return result.projects;
});

export const getProject = (id: string) =>
  createSelector([projectsSelectors], (result) => {
    return result.projects.find((project) => project.id === id) ?? null;
  });

export const getProjectIcon = (name?: string) =>
  createSelector([projectsSelectors], (result) => {
    return result.projects.find((project) => project.name === name);
  });

export const getProjectId = (name?: string) =>
  createSelector([projectsSelectors], (result) => {
    return result.projects.find((project) => project.name === name)?.id ?? '';
  });

export const getProjectsMessages = (chatId?: string, name?: string) =>
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

export const getIsWaiting = (chatId?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && projects.length) {
      return projects.some((project) =>
        project.chats.some(
          (chat) => chat.id === chatId && chat.waiting_user_response,
        ),
      );
    }

    return false;
  });

export const getWaitingProject = (chatId?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && projects.length) {
      return projects.find((project) => {
        return project.chats.some(
          (chat) => chat.id === chatId && chat.waiting_user_response,
        );
      });
    }

    return null;
  });

export const getProjectsMessagesByChatId = (chatId?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && projects.length) {
      return (
        projects
          .find((project) => project.chats.some((chat) => chat.id === chatId))
          ?.chats.find((chat) => chat.id === chatId)?.messages ?? null
      );
    }

    return null;
  });

export const getOldestMessageId = (chatId?: string, name?: string) =>
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

export const getNewestMessageId = (chatId?: string, name?: string) =>
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

export const getCurrentGuidance = (name?: string) =>
  createSelector([projectsSelectors], (result) => {
    return (
      result.projects.find((project) => project.name === name)?.guidances ?? []
    );
  });

export const getGuidanceQuestion = createSelector(
  [projectsSelectors],
  (result) => {
    return result.guidanceQuestion;
  },
);

export const getChatName = (name?: string, chatId?: string) =>
  createSelector([projectsSelectors], (result) => {
    if (name && chatId && result.projects.length) {
      return (
        result.projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.id === chatId)?.name ?? ''
      );
    }

    return '';
  });

export const getProjectName = (id?: string) =>
  createSelector([projectsSelectors], (result) => {
    if (id && result.projects.length) {
      return result.projects.find((project) => project.id === id)?.name ?? '';
    }

    return '';
  });

export const getEmptyChat = (name: string) =>
  createSelector([projectsSelectors], (result) => {
    if (name && result.projects.length) {
      return (
        result.projects
          .find((project) => project.name === name)
          ?.chats.find((chat) => chat.number_of_messages === 0) ?? null
      );
    }

    return '';
  });

export const getVisualizePrompt = createSelector(
  [projectsSelectors],
  ({ visualizePrompt }) => {
    return visualizePrompt;
  },
);

export const getCurrentProject = (name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (name && projects.length) {
      return projects.find((project) => project.name === name) ?? null;
    }

    return null;
  });

export const getChatData = (chatId?: string) =>
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
        currentYearId: new Date(foundChat.created_at).getFullYear(),
        currentMonthId: new Date(foundChat.created_at).toLocaleString('en-US', {
          month: 'long',
        }),
        id: chatId,
      };
    }

    return { currentYearId: null, currentMonthId: null, id: null };
  });

export const getCurrentFile = (chatId?: string, name?: string) =>
  createSelector([projectsSelectors], ({ projects }) => {
    if (chatId && name) {
      const project = projects.find((project) => project.name === name);
      const chat = project?.chats.find((chat) => chat.id === chatId);

      return {
        file: chat?.files[0] ?? null,
        is_file_context: chat?.is_file_context ?? false,
      };
    }

    return {
      file: null,
      is_file_context: false,
    };
  });
