import { createAsyncThunk } from "@reduxjs/toolkit";
import { settingsSlice } from "~/store/slices/settings.slice";
import { FillSettingsActionPayload } from "~/store/typedefs";

export const settingsActions = {
  fetchSettings: createAsyncThunk('settings/fetchSettings', async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(settingsSlice.actions.startFetching());

      const response: Response = await fetch('settings/');

      if (!response.ok) {
        rejectWithValue(response);
      }

      const data: FillSettingsActionPayload = await response.json();
      dispatch(settingsSlice.actions.fillSettings(data));
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(settingsSlice.actions.stopFetching());
    }
  })
}