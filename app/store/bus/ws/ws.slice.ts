import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    isFetching: false,
    socketStatus: '',
    isClosedSockets: false,
    isOpenedSockets: false,
    isApprovedOrder: false,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    setSocketsStatus(state, action: PayloadAction<string>) {
      state.socketStatus = action.payload;
    },
    setClosedSockets(state, action: PayloadAction<boolean>) {
      state.isClosedSockets = action.payload;
    },
    setOpenedSockets(state, action: PayloadAction<boolean>) {
      state.isOpenedSockets = action.payload;
    },
    setApprovedOrder(state, action: PayloadAction<boolean>) {
      state.isApprovedOrder = action.payload;
    },
  },
});