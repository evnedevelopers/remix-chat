import { createAsyncThunk } from "@reduxjs/toolkit";

import { projectsSlice } from "~/store/slices/projects.slice";
import { profileActions } from "~/store/actions/profile.actions";

import {
  AddChatActionPayload,
  ChangeChatActionPayload,
  FillGuidanceActionPayload,
  ServerFormErrors
} from "~/store/typedefs";
import {
  CreateNewChatPayload,
  DeleteChatFilePayload,
  FetchMessageAudioPayload,
  PostRatePayload,
  ReadGuidancePayload,
  UpdateChatPayload
} from "~/store/actions/typedefs";

export const projectsActions = {
  ...projectsSlice.actions,
  createNewChat: createAsyncThunk(
    'projects/createNewChat',
    async (
      { payload, meta }: CreateNewChatPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(projectsActions.startFetching());

        const body: string = JSON.stringify(payload);
        const response: Response = await fetch(`chats/`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body,
        });

        if (!response.ok) {
          meta.reject();
          return rejectWithValue(response);
        }

        const data: AddChatActionPayload = await response.json();

        dispatch(projectsActions.addChat({ data, projectId: payload.project_id }));

        meta.resolve(data);
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(projectsActions.stopFetching());
      }
    }
  ),
  updateChat: createAsyncThunk(
    'projects/updateChat',
    async (
      { payload, meta }: UpdateChatPayload,
      { dispatch, rejectWithValue }
    ) => {
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
        dispatch(projectsActions.changeChat(data));
        dispatch(profileActions.changeCurrentDataset(data));
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  deleteChatFile: createAsyncThunk(
    'projects/deleteChatFile',
    async (
      { payload, meta }: DeleteChatFilePayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        const response: Response = await fetch(`chats/${payload.chatId}/files/${payload.fileId}`, { method: 'DELETE' });

        if (!response.ok) {
          meta.reject();
          return rejectWithValue(response);
        }

        dispatch(
          projectsActions.removeChatFile({
            chatId: payload.chatId,
            fileId: payload.fileId,
          }),
        );

        dispatch(
          profileActions.removeChatFile({
            chatId: payload.chatId,
            fileId: payload.fileId,
          }),
        );

        meta.resolve();
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
  fetchMessageAudio: createAsyncThunk(
    'projects/fetchMessageAudio',
    async (
      { payload, meta }: FetchMessageAudioPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(projectsActions.startAudioFetching());
        const response: Response = await fetch(`messages/${payload.messageId}/play`);

        if (!response.ok) {
          meta.reject();
          return rejectWithValue(response);
        }

        const data: Blob = await response.blob();
        const mp3Url = URL.createObjectURL(data);

        dispatch(
          projectsActions.fillMessageAudio({
            audio: mp3Url,
            messageId: payload.messageId,
          }),
        )

        meta.resolve();

      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(projectsActions.stopAudioFetching());
      }
    }
  ),
  postRate: createAsyncThunk(
    'projects/postRate',
    async (
      { payload, meta }: PostRatePayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        const newPayload = {
          rate: payload.rate,
          message_id: payload.message_id,
        };
        const body: string = JSON.stringify(newPayload);
        const response: Response = await fetch(`messages/${payload.message_id}/rate`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body
        });

        if (!response.ok) {
          meta.reject();
        }

        dispatch(projectsActions.changeRate(payload));
        meta.resolve();
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(projectsActions.stopFetching());
      }
    }
  ),
  readGuidance: createAsyncThunk(
    'projects/readGuidance',
    async (
      payload: ReadGuidancePayload,
      { dispatch, rejectWithValue }
    ) => {
      const newData = {
        guidance_id: payload.guidance_id,
        subguidance_id: payload.subguidance_id,
      };

      try {
        const body: string = JSON.stringify(newData);
        const response: Response = await fetch('guidances/view', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body
        });

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: FillGuidanceActionPayload = await response.json();
        const newGuide = {
          guide: data.guidance,
          projectId: payload.projectId,
        };

        dispatch(projectsActions.updateGuidance(newGuide));
        dispatch(profileActions.updateGuidance(newGuide));
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),
}