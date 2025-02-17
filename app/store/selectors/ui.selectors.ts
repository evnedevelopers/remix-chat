import { createSelector } from "reselect";

import { RootState } from "~/store";

const uiSelectors = (state: RootState) => state.ui;

export const getIsMobileSidebarOpen = createSelector([uiSelectors], (result) => {
  return result.isMobileSidebarOpen;
});
export const getIsSidebarDatasetOpen = createSelector(
  [uiSelectors],
  (result) => {
    return result.isSidebarDataset;
  },
);
export const getIsSidebarDescriptionOpen = createSelector(
  [uiSelectors],
  (result) => {
    return result.isSidebarDescription;
  },
);
export const getIsSidebarConversationDatasetOpen = createSelector(
  [uiSelectors],
  (result) => {
    return result.isSidebarConversationDataset;
  },
);
export const getIsSidebarConversationDescriptionOpen = createSelector(
  [uiSelectors],
  (result) => {
    return result.isSidebarConversationDescription;
  },
);

export const getTheme = createSelector([uiSelectors], (result) => {
  return result.theme;
});

export const getIsGlobalSpeaking = createSelector([uiSelectors], (result) => {
  return result.globalSpeaking;
});

export const getIsGlobalListening = createSelector([uiSelectors], (result) => {
  return result.globalListening;
});

export const getIsOneTimeSpeaking = createSelector([uiSelectors], (result) => {
  return result.oneTimeSpeaking;
});

export const getIsFirstGlobalListeningIOS = createSelector(
  [uiSelectors],
  (result) => {
    return result.firstGlobalListeningIOS;
  },
);

export const getIsFirstGlobalSpeakingIOS = createSelector(
  [uiSelectors],
  (result) => {
    return result.firstGlobalSpeakingIOS;
  },
);

export const getIsFirstOneTimeSpeakingIOS = createSelector(
  [uiSelectors],
  (result) => {
    return result.firstOneTimeSpeakingIOS;
  },
);
