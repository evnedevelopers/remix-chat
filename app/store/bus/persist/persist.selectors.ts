import { createSelector } from "reselect";

import { RootState } from "~/store";

const persistSelector = (state: RootState) => state.persist;

export const getPersistModalData = createSelector(
  [persistSelector],
  ({ modalData }) => {
    return modalData;
  },
);

export const getPersistFormData = createSelector(
  [persistSelector],
  ({ formValues }) => {
    return formValues;
  },
);
