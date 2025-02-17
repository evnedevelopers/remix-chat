import { createSelector } from 'reselect';

import { ModalState } from '../types';

type RootState = {
  modal: ModalState;
};

const modalSelectors = (state: RootState) => state.modal;

export const getModalData = createSelector([modalSelectors], ({ modalData }) => {
  return modalData;
});
