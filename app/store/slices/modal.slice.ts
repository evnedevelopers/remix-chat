import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ModalState, ModalTypes } from '../types';

const initialState: ModalState = {
  modalData: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modal(state, action: PayloadAction<ModalTypes.ModalPayload<any>>) {
      state.modalData = {
        ...state.modalData,
        [action.payload.component]: action.payload,
      };
    },
    closeModal(state, action: PayloadAction<any>) {
      delete state.modalData[action.payload];
    },
    clearModals(state) {
      state.modalData = {};
    },
  },
});
