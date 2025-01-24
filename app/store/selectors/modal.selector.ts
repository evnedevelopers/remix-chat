import { createSelector } from 'reselect';

import { ModalState } from '../types';

type RootState = {
  modal: ModalState;
};

const modalSelector = (state: RootState) => state.modal;

export const getModalData = createSelector([modalSelector], ({ modalData }) => {
  return modalData;
});
