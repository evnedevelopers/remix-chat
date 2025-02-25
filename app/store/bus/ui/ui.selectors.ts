import { createSelector } from "reselect";

import { RootState } from "~/store";

const uiSelectors = (state: RootState) => state.ui;

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

