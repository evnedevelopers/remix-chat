import { createAsyncThunk } from "@reduxjs/toolkit";

import { savedMessagesSlice } from "~/store/slices/saved-messages.slice";
import { projectsActions } from "~/store/actions/projects.actions";

import {
  FetchSavedMessagesActionPayload,
  FillSaveMessageActionPayload
} from "~/store/typedefs";
import { ISavedMessages } from "~/utils/typedefs";

import {
  DeleteSavedMessagePayload,
  FetchMessagesSavedPayload,
  SaveMessagePayload
} from "~/store/actions/typedefs";

export const savedMessagesActions = {
  ...savedMessagesSlice.actions,
  saveMessage: createAsyncThunk(
    'savedMessages/saveMessage',
    async (
      { payload, meta }: SaveMessagePayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(savedMessagesActions.startFetching());

        const body: string = JSON.stringify(payload);
        const response: Response = await fetch(`messages/${payload.message_id}/save`, { method: "POST", body });

        if (!response.ok) {
          meta.reject();
          return rejectWithValue(response);
        }

        const data: FillSaveMessageActionPayload = await response.json();

        dispatch(projectsActions.saveMessage(data));
        dispatch(savedMessagesActions.fetchSavedProjects());

        meta.resolve();
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(savedMessagesActions.stopFetching());
      }
    }
  ),
  deleteSavedMessage: createAsyncThunk(
    'savedMessages/deleteSavedMessage',
    async (
      { payload }: DeleteSavedMessagePayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(savedMessagesActions.startFetching());

        const response: Response = await fetch(`messages/${payload.message_id}/unsave`, { method: 'DELETE' });

        if (!response.ok) {
          return rejectWithValue(response);
        }

        dispatch(projectsActions.removeSavedMessage(payload.message_id));

        if (payload.isLastMessage && payload.isSavedPage) {
          dispatch(savedMessagesActions.removeSavedProject(payload.message_id));
        }

        if (!payload.isLastMessage && payload.isSavedPage) {
          dispatch(savedMessagesActions.removeSavedMessages(payload.message_id));
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
        dispatch(savedMessagesActions.stopFetching());
      }
    }
  ),
  fetchSavedProjects: createAsyncThunk(
    'savedMessages/fetchSavedProjects',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        dispatch(savedMessagesActions.startFetching());

        const response: Response = await fetch('saved-messages/projects');

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: FetchSavedMessagesActionPayload = await response.json();

        dispatch(savedMessagesActions.fillSavedProjects(data));
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(savedMessagesActions.stopFetching());
      }
    }
  ),
  fetchMessagesSaved: createAsyncThunk(
    'savedMessages/fillMessagesSaved',
    async (
      { payload }: FetchMessagesSavedPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(savedMessagesActions.startFetching());

        const response: Response = await fetch(`saved-messages/projects/${payload.projectId}`)

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: ISavedMessages = await response.json();

        dispatch(
          savedMessagesActions.fillSavedMessages({
            data,
            projectId: payload.projectId,
          }),
        )
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(savedMessagesActions.stopFetching());
      }
    }
  ),
}