import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalTypes } from "~/store/types";

const initialState = {
  modalData: {} as Record<string, ModalTypes.ModalPayload<unknown>>,
  formValues: {} as Record<string, unknown>,
};

export const persistSlice = createSlice({
  name: 'persist',
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
    fillForm(state, action: PayloadAction<any>) {
      state.formValues = action.payload;
    },
    clearForm(state) {
      state.formValues = {};
    },
    // INJECT
  },
});