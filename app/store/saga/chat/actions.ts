import { createAsyncThunk } from "@reduxjs/toolkit";

import { chatSlice } from "~/store/slices/chat.slice";
import { FillMessagesActionPayload, PushMoreMessagesActionPayload } from "~/store/typedefs";
import { projectsSlice } from "~/store/slices/projects.slice";
import { PromiseResolve } from "~/helpers/prepareActions";

export type LoadMoreMessagesPayload = { url: string; chatId: string; isNext?: boolean; isPrev?: boolean; };

export const chatActions = {
  fetchMessages: createAsyncThunk('chat/fetchMessages', async (chatId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(chatSlice.actions.startFetching());

      const response: Response = await fetch(`chats/${chatId}/messages`);

      if (!response.ok) {
        return rejectWithValue(response);
      }

      const data: FillMessagesActionPayload = await response.json();

      dispatch(projectsSlice.actions.fillMessages({ data, chatId }));
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(chatSlice.actions.stopFetching());
    }
  }),
  loadMoreMessages: createAsyncThunk('chat/loadMoreMessages', async (payload: LoadMoreMessagesPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(chatSlice.actions.startFetching());

      const response: Response = await fetch(payload.url);

      if (!response.ok) {
        return rejectWithValue(response);
      }

      const data: PushMoreMessagesActionPayload = await response.json();

      if (payload.isNext) {
        dispatch(
          projectsSlice.actions.pushMoreMessages({ data, chatId: payload.chatId })
        )
      }

      if (payload.isPrev) {
        dispatch(
          projectsSlice.actions.pushMoreMessages({ data, chatId: payload.chatId })
        )
      }
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(chatSlice.actions.stopFetching());
    }
  }),
  loadPrevMessages: createAsyncThunk('chat/loadPrevMessages', async (payload: LoadMoreMessagesPayload & { resolve: PromiseResolve }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(chatSlice.actions.startFetching());

      const response: Response = await fetch(payload.url);

      if (!response.ok) {
        return rejectWithValue(response);
      }

      const data: PushMoreMessagesActionPayload = await response.json();

      dispatch(
        projectsSlice.actions.pushPrevMoreMessages({ data, chatId: payload.chatId })
      );

      payload.resolve();
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(chatSlice.actions.stopFetching());
    }
  }),
}