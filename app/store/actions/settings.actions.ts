import { createAsyncThunk } from "@reduxjs/toolkit";

import { settingsSlice } from "~/store/slices/settings.slice";

import { FillSettingsActionPayload } from "~/store/typedefs";

export const settingsActions = {
  ...settingsSlice.actions,
  fetchSettings: createAsyncThunk(
    'settings/fetchSettings',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(settingsActions.startFetching());

        const response: Response = await fetch('settings/');

        if (!response.ok) {
          rejectWithValue(response);
        }

        const data: FillSettingsActionPayload = await response.json();
        dispatch(settingsActions.fillSettings(data));
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(settingsActions.stopFetching());
      }
    }
  )
}