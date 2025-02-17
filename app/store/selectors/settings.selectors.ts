import { createSelector } from "reselect";
import { RootState } from "~/store";

const settingsSelectors = (state: RootState) => state.settings;

export const getIsSettingsFetching = createSelector(
  [settingsSelectors],
  (result) => {
    return result.isFetching;
  },
);

export const getSettings = createSelector([settingsSelectors], (result) => {
  return result.settings;
});

export const getVisualizingTimer = createSelector(
  [settingsSelectors],
  (result) => {
    return result.settings?.time_left_to_visualize ?? 0;
  },
);

export const getAudioTimer = createSelector([settingsSelectors], (result) => {
  return result.settings?.audio_recording_limit ?? 0;
});

export const getAllowCountdown = createSelector(
  [settingsSelectors],
  (result) => {
    return result.allowCountdown;
  },
);
