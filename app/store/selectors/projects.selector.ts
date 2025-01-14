import { createSelector } from "reselect";
import { RootState } from "~/store";

const projectsSelector = (state: RootState) => state.projects;

export const getIsProjectsFetching = createSelector(
  [projectsSelector],
  (result) => {
    return result.isFetching;
  },
);

export const getIsFileFetching = createSelector(
  [projectsSelector],
  (result) => {
    return result.isFileFetching;
  },
);

export const getIsProjectsAudioFetching = createSelector(
  [projectsSelector],
  (result) => {
    return result.isAudioFetching;
  },
);

export const getIsPromptFetching = createSelector(
  [projectsSelector],
  (result) => {
    return result.isPromptFetching;
  },
);

export const getProjects = createSelector([projectsSelector], (result) => {
  return result.projects;
});

export const getProject = (id: string) =>
  createSelector([projectsSelector], (result) => {
    return result.projects.find((project) => project.id === id) ?? null;
  });

export const getProjectIcon = (name?: string) =>
  createSelector([projectsSelector], (result) => {
    return result.projects.find((project) => project.name === name);
  });

export const getProjectId = (name?: string) =>
  createSelector([projectsSelector], (result) => {
    return result.projects.find((project) => project.name === name)?.id ?? 0;
  });

export const getProjectsMessages = (chatId?: string, name?: string) =>
  createSelector([projectsSelector], ({ projects }) => {
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
  createSelector([projectsSelector], ({ projects }) => {
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
  createSelector([projectsSelector], ({ projects }) => {
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
  createSelector([projectsSelector], ({ projects }) => {
    if (chatId && projects.length) {
      return (
        projects
          .find((project) => project.chats.some((chat) => chat.id === +chatId))
          ?.chats.find((chat) => chat.id === chatId)?.messages ?? null
      );
    }

    return null;
  });

export const getOldestMessageId = (chatId?: string, name?: string) =>
  createSelector([projectsSelector], ({ projects }) => {
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
  createSelector([projectsSelector], ({ projects }) => {
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
  createSelector([projectsSelector], (result) => {
    return (
      result.projects.find((project) => project.name === name)?.description ??
      ''
    );
  });

export const getCurrentGuidance = (name?: string) =>
  createSelector([projectsSelector], (result) => {
    return (
      result.projects.find((project) => project.name === name)?.guidances ?? []
    );
  });

export const getGuidanceQuestion = createSelector(
  [projectsSelector],
  (result) => {
    return result.guidanceQuestion;
  },
);

export const getChatName = (name?: string, chatId?: string) =>
  createSelector([projectsSelector], (result) => {
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
  createSelector([projectsSelector], (result) => {
    if (id && result.projects.length) {
      return result.projects.find((project) => project.id === id)?.name ?? '';
    }

    return '';
  });

export const getEmptyChat = (name: string) =>
  createSelector([projectsSelector], (result) => {
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
  [projectsSelector],
  ({ visualizePrompt }) => {
    return visualizePrompt;
  },
);

export const getCurrentProject = (name?: string) =>
  createSelector([projectsSelector], ({ projects }) => {
    if (name && projects.length) {
      return projects.find((project) => project.name === name) ?? null;
    }

    return null;
  });

export const getChatData = (chatId?: string) =>
  createSelector([projectsSelector], ({ projects }) => {
    if (!chatId) {
      return { currentYearId: null, currentMonthId: null, id: null };
    }

    const id = parseInt(chatId, 10);

    const foundChat = projects
      .flatMap((project) => project.years)
      .flatMap((year) => {
        return year.months.flatMap((month) => {
          return month.chats;
        });
      })
      .find((chat) => chat.id === id);

    if (foundChat) {
      return {
        currentYearId: new Date(foundChat.created_at).getFullYear(),
        currentMonthId: new Date(foundChat.created_at).toLocaleString('en-US', {
          month: 'long',
        }),
        id,
      };
    }

    return { currentYearId: null, currentMonthId: null, id: null };
  });

export const getCurrentFile = (chatId?: string, name?: string) =>
  createSelector([projectsSelector], ({ projects }) => {
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