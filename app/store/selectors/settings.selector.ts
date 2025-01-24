import { createSelector } from "reselect";
import { RootState } from "~/store";

const settingsSelector = (state: RootState) => state.settings;

export const getIsSettingsFetching = createSelector(
  [settingsSelector],
  (result) => {
    return result.isFetching;
  },
);

export const getSettings = createSelector([settingsSelector], (result) => {
  return result.settings;
});

export const getVisualizingTimer = createSelector(
  [settingsSelector],
  (result) => {
    return result.settings?.time_left_to_visualize ?? 0;
  },
);

export const getAudioTimer = createSelector([settingsSelector], (result) => {
  return result.settings?.audio_recording_limit ?? 0;
});

export const getAllowCountdown = createSelector(
  [settingsSelector],
  (result) => {
    return result.allowCountdown;
  },
);
