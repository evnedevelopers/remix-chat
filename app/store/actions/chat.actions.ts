import { createAsyncThunk } from "@reduxjs/toolkit";

import { chatSlice } from "~/store/slices/chat.slice";
import { projectsActions } from "~/store/actions/projects.actions";

import {
  FillMessagesActionPayload,
  PushMoreMessagesActionPayload
} from "~/store/typedefs";
import {
  FetchMessagesPayload,
  LoadMoreMessagesPayload,
  LoadPrevMessagesPayload
} from "~/store/actions/typedefs";

export const chatActions = {
  ...chatSlice.actions,
  fetchMessages: createAsyncThunk(
    'chat/fetchMessages',
    async (
      chatId: FetchMessagesPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(chatActions.startFetching());

        const response: Response = await fetch(`chats/${chatId}/messages`);

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: FillMessagesActionPayload = await response.json();

        dispatch(projectsActions.fillMessages({ data, chatId }));
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(chatActions.stopFetching());
      }
    }
  ),
  loadMoreMessages: createAsyncThunk(
    'chat/loadMoreMessages',
    async (
      { payload }: LoadMoreMessagesPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(chatActions.startFetching());

        const response: Response = await fetch(payload.url);

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: PushMoreMessagesActionPayload = await response.json();

        if (payload.isNext) {
          dispatch(
            projectsActions.pushMoreMessages({ data, chatId: payload.chatId })
          )
        }

        if (payload.isPrev) {
          dispatch(
            projectsActions.pushMoreMessages({ data, chatId: payload.chatId })
          )
        }
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(chatActions.stopFetching());
      }
    }
  ),
  loadPrevMessages: createAsyncThunk(
    'chat/loadPrevMessages',
    async (
      { payload, meta: { resolve } }: LoadPrevMessagesPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(chatActions.startFetching());

        const response: Response = await fetch(payload.url);

        if (!response.ok) {
          return rejectWithValue(response);
        }

        const data: PushMoreMessagesActionPayload = await response.json();

        dispatch(
          projectsActions.pushPrevMoreMessages({ data, chatId: payload.chatId })
        );

        resolve();
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(chatActions.stopFetching());
      }
    }
  ),
}