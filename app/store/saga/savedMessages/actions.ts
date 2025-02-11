import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovePromiseToMeta } from "~/store/saga/projects/actions";
import { savedMessagesSlice } from "~/store/slices/saved-messages.slice";
import { FetchSavedMessagesActionPayload, FillSaveMessageActionPayload } from "~/store/typedefs";
import { projectsSlice } from "~/store/slices/projects.slice";
import { ISavedMessages } from "~/utils/typedefs";

export const savedMessagesActions = {
  saveMessage: createAsyncThunk('savedMessages/saveMessage', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      dispatch(savedMessagesSlice.actions.startFetching());

      const body: string = JSON.stringify(payload);
      const response: Response = await fetch(`messages/${payload.message_id}/save`, { method: "POST", body });

      if (!response.ok) {
        meta.reject();
        return rejectWithValue(response);
      }

      const data: FillSaveMessageActionPayload = await response.json();

      dispatch(projectsSlice.actions.saveMessage(data));
      dispatch(savedMessagesActions.fetchSavedProjects());

      meta.resolve();
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(savedMessagesSlice.actions.stopFetching());
    }
  }),
  deleteSavedMessage: createAsyncThunk('savedMessages/deleteSavedMessage', async ({ payload }: Omit<MovePromiseToMeta, 'meta'>, { dispatch, rejectWithValue }) => {
    try {
      dispatch(savedMessagesSlice.actions.startFetching());

      const response: Response = await fetch(`messages/${payload.message_id}/unsave`, { method: 'DELETE' });

      if (!response.ok) {
        return rejectWithValue(response);
      }

      dispatch(projectsSlice.actions.removeSavedMessage(payload.message_id));

      if (payload.isLastMessage && payload.isSavedPage) {
        dispatch(savedMessagesSlice.actions.removeSavedProject(payload.message_id));
      }

      if (!payload.isLastMessage && payload.isSavedPage) {
        dispatch(savedMessagesSlice.actions.removeSavedMessages(payload.message_id));
        dispatch(savedMessagesActions.fetchMessagesSaved({
          payload: {
            projectId: payload.project,
          }
        }))
      }

      if (!payload.isSavedPage || payload.isLastMessage) {
        dispatch(savedMessagesActions.fetchSavedProjects());
        dispatch(savedMessagesActions.fetchMessagesSaved({
          payload: {
            projectId: payload.project,
          },
        }))
      }
    } catch (e){
      rejectWithValue(e);
    } finally {
      dispatch(savedMessagesSlice.actions.stopFetching());
    }
  }),
  fetchSavedProjects: createAsyncThunk('savedMessages/fetchSavedProjects', async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(savedMessagesSlice.actions.startFetching());

      const response: Response = await fetch('saved-messages/projects');

      if (!response.ok) {
        return rejectWithValue(response);
      }

      const data: FetchSavedMessagesActionPayload = await response.json();

      dispatch(savedMessagesSlice.actions.fillSavedProjects(data));
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(savedMessagesSlice.actions.stopFetching());
    }
  }),
  fetchMessagesSaved: createAsyncThunk(
    'savedMessages/fillMessagesSaved',
    async (payload: any, { dispatch, rejectWithValue }) => {
      try {
        dispatch(savedMessagesSlice.actions.startFetching());

        const response: Response = await fetch(`saved-messages/projects/${payload.projectId}`)

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: ISavedMessages = await response.json();

        dispatch(
          savedMessagesSlice.actions.fillSavedMessages({
            data,
            projectId: payload.projectId,
          }),
        )
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(savedMessagesSlice.actions.stopFetching());
      }
    }
  ),
}