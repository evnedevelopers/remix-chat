import { createSelector } from 'reselect';

import { RootState } from "~/store";

export const profileSelectors = (state: RootState) => state.profile;

export const getProfile = createSelector([profileSelectors], (result) => {
  return result.profile;
});

export const getScaleImage = createSelector([profileSelectors], (result) => {
  return result.scaleImage;
});

export const getIsVisualAdjustments = createSelector(
  [profileSelectors],
  ({ profile }) => {
    return profile?.visualAdjustments ?? false;
  },
);

export const getCurrentDataset = createSelector(
  [profileSelectors],
  ({ currentDataset }) => {
    return currentDataset;
  },
);

export const getFullName = createSelector(
  [profileSelectors],
  ({ profile }) => `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim()
);