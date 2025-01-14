import { createSelector } from "reselect";
import { RootState } from "~/store";

const wsSelector = (state: RootState) => state.ws;

export const getSocketOpened = createSelector([wsSelector], (result) => {
  return result.socketStatus.toLowerCase();
});

export const getIsClosedSockets = createSelector([wsSelector], (result) => {
  return result.isClosedSockets;
});

export const getIsOpenedSockets = createSelector([wsSelector], (result) => {
  return result.isOpenedSockets;
});