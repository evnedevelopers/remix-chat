import { createSelector } from "reselect";
import { RootState } from "~/store";

const settingsSelectors = (state: RootState) => state.settings;

export const getSettings = createSelector([settingsSelectors], (result) => {
  return result.settings;
});

export const getAudioTimer = createSelector([settingsSelectors], (result) => {
  return result.settings?.audioRecordingLimit ?? 0;
});
