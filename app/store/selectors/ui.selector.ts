import { createSelector } from "reselect";

import { RootState } from "~/store";

const uiSelector = (state: RootState) => state.ui;

export const getIsMobileSidebarOpen = createSelector([uiSelector], (result) => {
  return result.isMobileSidebarOpen;
});
export const getIsSidebarDatasetOpen = createSelector(
  [uiSelector],
  (result) => {
    return result.isSidebarDataset;
  },
);
export const getIsSidebarDescriptionOpen = createSelector(
  [uiSelector],
  (result) => {
    return result.isSidebarDescription;
  },
);
export const getIsSidebarConversationDatasetOpen = createSelector(
  [uiSelector],
  (result) => {
    return result.isSidebarConversationDataset;
  },
);
export const getIsSidebarConversationDescriptionOpen = createSelector(
  [uiSelector],
  (result) => {
    return result.isSidebarConversationDescription;
  },
);

export const getTheme = createSelector([uiSelector], (result) => {
  return result.theme;
});

export const getIsGlobalSpeaking = createSelector([uiSelector], (result) => {
  return result.globalSpeaking;
});

export const getIsGlobalListening = createSelector([uiSelector], (result) => {
  return result.globalListening;
});

export const getIsOneTimeSpeaking = createSelector([uiSelector], (result) => {
  return result.oneTimeSpeaking;
});

export const getIsFirstGlobalListeningIOS = createSelector(
  [uiSelector],
  (result) => {
    return result.firstGlobalListeningIOS;
  },
);

export const getIsFirstGlobalSpeakingIOS = createSelector(
  [uiSelector],
  (result) => {
    return result.firstGlobalSpeakingIOS;
  },
);

export const getIsFirstOneTimeSpeakingIOS = createSelector(
  [uiSelector],
  (result) => {
    return result.firstOneTimeSpeakingIOS;
  },
);
