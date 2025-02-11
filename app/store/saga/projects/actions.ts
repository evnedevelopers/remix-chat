import { createAsyncThunk } from "@reduxjs/toolkit";
import { PromiseReject, PromiseResolve } from "~/helpers/prepareActions";
import { projectsSlice } from "~/store/slices/projects.slice";
import {
  AddChatActionPayload,
  ChangeChatActionPayload,
  FillGuidanceActionPayload,
  ServerFormErrors
} from "~/store/typedefs";
import { profileSlice } from "~/store/slices/profile.slice";

export type MovePromiseToMeta = {
  payload: any,
  meta: {
    resolve: PromiseResolve,
    reject: PromiseReject,
  }
}

export const projectsActions = {
  createNewChat: createAsyncThunk('projects/createNewChat', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      dispatch(projectsSlice.actions.startFetching());
      const body: string = JSON.stringify(payload);
      const response: Response = await fetch(`chats/`, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        meta.reject();
      }

      const data: AddChatActionPayload = await response.json();

      dispatch(projectsSlice.actions.addChat({ data, projectId: payload.project_id }));

      meta.resolve();
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(projectsSlice.actions.stopFetching());
    }
  }),
  updateChat: createAsyncThunk('projects/updateChat', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      const body: string = JSON.stringify(payload);
      const response: Response = await fetch(`chats/${payload.id}`, {
        method: 'PUT',
        body,
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errors: ServerFormErrors = await response.json();
        meta.reject(errors);
        return rejectWithValue(response);
      }

      const data: ChangeChatActionPayload = await response.json();
      dispatch(projectsSlice.actions.changeChat(data));
      dispatch(profileSlice.actions.changeCurrentDataset(data));
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
  deleteChatFile: createAsyncThunk('projects/deleteChatFile', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      const response: Response = await fetch(`chats/${payload.chatId}/files/${payload.fileId}`, { method: 'DELETE' });

      if (!response.ok) {
        meta.reject();
        return rejectWithValue(response);
      }

      dispatch(
        projectsSlice.actions.removeChatFile({
          chatId: payload.chatId,
          fileId: payload.fileId,
        }),
      );

      dispatch(
        profileSlice.actions.removeChatFile({
          chatId: payload.chatId,
          fileId: payload.fileId,
        }),
      );

      meta.resolve();
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
  fetchMessageAudio: createAsyncThunk('projects/fetchMessageAudio', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      dispatch(projectsSlice.actions.startAudioFetching());
      const response: Response = await fetch(`messages/${payload.messageId}/play`);

      if (!response.ok) {
        meta.reject();
        return rejectWithValue(response);
      }

      const data: Blob = await response.blob();
      const mp3Url = URL.createObjectURL(data);

      dispatch(
        projectsSlice.actions.fillMessageAudio({
          audio: mp3Url,
          messageId: payload.messageId,
        }),
      )

      meta.resolve();

    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(projectsSlice.actions.stopAudioFetching());
    }
  }),
  postRate: createAsyncThunk('projects/postRate', async ({ payload, meta }: MovePromiseToMeta, { dispatch, rejectWithValue }) => {
    try {
      const newPayload = {
        rate: payload.rate,
        message_id: payload.message_id,
      };
      const body: string = JSON.stringify(newPayload);
      const response: Response = await fetch(`messages/${payload.message_id}/rate`, { method: 'POST', body });

      if (!response.ok) {
        meta.reject();
      }

      dispatch(projectsSlice.actions.changeRate(payload));
      meta.resolve();
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(projectsSlice.actions.stopFetching());
    }
  }),
  readGuidance: createAsyncThunk('projects/readGuidance', async (payload: any, { dispatch, rejectWithValue }) => {
    const newData = {
      guidance_id: payload.guidance_id,
      subguidance_id: payload.subguidance_id,
    };

    try {
      const body: string = JSON.stringify(newData);
      const response: Response = await fetch('guidances/view', { method: 'POST', body });

      if (!response.ok) {
        return rejectWithValue(response);
      }

      const data: FillGuidanceActionPayload = await response.json();
      const newGuide = {
        guide: data.guidance,
        projectId: payload.projectId,
      };

      dispatch(projectsSlice.actions.updateGuidance(newGuide));
      dispatch(profileSlice.actions.updateGuidance(newGuide));
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
}