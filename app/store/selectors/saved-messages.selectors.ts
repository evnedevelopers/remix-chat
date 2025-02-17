import { createSelector } from "reselect";

import { RootState } from "~/store";

const savedMessagesSelectors = (state: RootState) => state.savedMessages;

export const getIsSavedMessagesFetching = createSelector(
  [savedMessagesSelectors],
  (result) => {
    return result.isFetching;
  },
);

export const getSavedMessagesProjects = createSelector(
  [savedMessagesSelectors],
  (result) => {
    return result.savedProjects;
  },
);

export const getScrollToMessageId = createSelector(
  [savedMessagesSelectors],
  (result) => {
    return result.scrollToMessageId;
  },
);

export const getSavedMessages = (id?: string) =>
  createSelector([savedMessagesSelectors], (result) => {
    if (!id) {
      return null;
    }

    return result.savedProjects.find((project) => project.id === id);
  });

export const getSavedMessagesTitle = (id?: string) =>
  createSelector([savedMessagesSelectors], (result) => {
    if (!id) {
      return '';
    }

    const savedProject = result.savedProjects.find(
      (project) => project.id === id,
    );

    if (savedProject && savedProject.id === '0') {
      return savedProject?.name ?? '';
    }

    if (savedProject) {
      return `Saved in ${savedProject?.name ?? ''}`;
    }
  });

export const getNextSavedMessagesUrl = (id?: string) =>
  createSelector([savedMessagesSelectors], ({ savedProjects }) => {
    if (id && savedProjects.length) {
      return (
        savedProjects.find((project) => project.id === id)?.messages?.next ??
        ''
      );
    }

    return null;
  });
