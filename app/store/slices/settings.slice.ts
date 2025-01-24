import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FillSettingsActionPayload, ISettings } from "~/store/typedefs";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    isFetching: false,
    settings: null as null | ISettings,
    allowCountdown: false,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    fillSettings(state, action: PayloadAction<FillSettingsActionPayload>) {
      state.settings = action.payload;
    },
    clearVisualizeTimer(state) {
      if (state.settings) {
        state.settings = {
          ...state.settings,
          time_left_to_visualize: 0,
        };
      }
    },
    allowCountdown(state, action: PayloadAction<boolean>) {
      state.allowCountdown = action.payload;
    },
  },
});