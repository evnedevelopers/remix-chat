import { createAsyncThunk } from '@reduxjs/toolkit';

import { Manager, Socket } from "socket.io-client";

import { wsSlice } from "~/store/slices/ws.slice";
import { chatSlice } from "~/store/slices/chat.slice";

import { SendMessageRequestPayload } from "~/store/actions/typedefs";

export let socket: Socket | null = null;

export const wsActions = {
  ...wsSlice.actions,
  sendMessageRequest: createAsyncThunk(
    'ws/sendMessageRequest',
    async (
      { payload, meta }: SendMessageRequestPayload,
      { dispatch, rejectWithValue }
    ) => {
      try {
        dispatch(wsActions.setSocketsStatus('SEND'));
        dispatch(wsActions.setClosedSockets(false));
        dispatch(wsActions.startFetching());

        if (payload.event !== 'visualize' && payload.app === 'chat') {
          dispatch(chatSlice.actions.startTyping());
        }

        dispatch(wsActions.send([payload]));

        if (payload.event === 'visualize') {
          dispatch(chatSlice.actions.startIsImageLoading());
        }

        if (meta.resolve !== undefined) {
          meta.resolve();
        }
      } catch (e) {
        return rejectWithValue(e);
      } finally {
        dispatch(wsSlice.actions.stopFetching())
      }
    }
  ),
  connect: createAsyncThunk('ws/connect', async (nsp: string, { dispatch }) => {
    if (!socket) {
      const manager = new Manager({autoConnect: false});
      socket = manager.socket(nsp);

      socket.on("connect", () => {
        dispatch(wsActions.setClosedSockets(false));
        dispatch(wsActions.setOpenedSockets(true));
      });

      socket.on("disconnect", () => {
        dispatch(wsActions.setSocketsStatus(manager!._readyState));
        dispatch(wsActions.setClosedSockets(true));
        dispatch(wsActions.setOpenedSockets(false));
      });

      socket.connect();
    }
  }),
  send: createAsyncThunk('ws/send', async (payload: any[]) => {
    socket?.send(...payload);
  }),
  joinChat: createAsyncThunk('ws/joinChat', async (payload: any[]) => {
    socket?.emit("joinChat", ...payload);
  }),
}