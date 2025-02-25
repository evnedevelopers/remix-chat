import { createSelector } from "reselect";

import { RootState } from "~/store";

const wsSelectors = (state: RootState) => state.ws;

export const getSocketOpened = createSelector([wsSelectors], (result) => {
  return result.socketStatus.toLowerCase();
});

export const getIsClosedSockets = createSelector([wsSelectors], (result) => {
  return result.isClosedSockets;
});

export const getIsOpenedSockets = createSelector([wsSelectors], (result) => {
  return result.isOpenedSockets;
});