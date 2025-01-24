import { createSelector } from "reselect";

import { RootState } from "~/store";

const savedMessagesSelector = (state: RootState) => state.savedMessages;

export const getIsSavedMessagesFetching = createSelector(
  [savedMessagesSelector],
  (result) => {
    return result.isFetching;
  },
);

export const getSavedMessagesProjects = createSelector(
  [savedMessagesSelector],
  (result) => {
    return result.savedProjects;
  },
);

export const getScrollToMessageId = createSelector(
  [savedMessagesSelector],
  (result) => {
    return result.scrollToMessageId;
  },
);

export const getSavedMessages = (id?: string) =>
  createSelector([savedMessagesSelector], (result) => {
    if (!id) {
      return null;
    }

    return result.savedProjects.find((project) => project.id === id);
  });

export const getSavedMessagesTitle = (id?: string) =>
  createSelector([savedMessagesSelector], (result) => {
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
  createSelector([savedMessagesSelector], ({ savedProjects }) => {
    if (id && savedProjects.length) {
      return (
        savedProjects.find((project) => project.id === id)?.messages?.next ??
        ''
      );
    }

    return null;
  });
