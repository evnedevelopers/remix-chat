import { createAsyncThunk } from '@reduxjs/toolkit';

import { Manager, Socket } from "socket.io-client";

import { wsSlice } from "~/store/bus/ws/ws.slice";
import { chatSlice } from "~/store/bus/chat/chat.slice";

import { SendMessageRequestPayload } from "~/store/bus/typedefs";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { RootState } from "~/store";
import { getProjectsMessages } from "~/store/bus/projects/projects.selectors";
import { chatActions } from "~/store/bus/chat/chat.actions";
import { IMessage } from "~/store/bus/chat/typedefs";
import { getProfile } from "~/store/bus/profile/profile.selectors";

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
  connect: createAsyncThunk('ws/connect', async (nsp: string, { dispatch, getState, }) => {
    if (!socket) {
      const manager = new Manager({ autoConnect: false });
      socket = manager.socket(nsp);

      socket.on("connect", () => {
        dispatch(wsActions.setSocketsStatus(manager!._readyState));
        dispatch(wsActions.setClosedSockets(false));
        dispatch(wsActions.setOpenedSockets(true));
      });

      socket.on("receiveMessage", ({
        chatId,
        message,
        projectName,
      }: {
        chatId: number,
        message: IMessage,
        projectName: string;
      }) => {
        const state = getState();
        const projectsMessages = getProjectsMessages(chatId, projectName)((state as RootState));

        dispatch(
          projectsActions.setMessages({
            chatId,
            projectsMessages: [
              message,
              ...(projectsMessages?.results ?? [])
            ]
          })
        );
      });

      socket.on("userTyping", ({
        typingIds
      }: {
        typingIds: number[]
      }) => {
        const state = getState();
        const profile = getProfile(state as RootState);

        dispatch(
          chatActions.setTyping(
            typingIds.filter(
              (id) => id !== profile?.id
            )
          )
        );
      });

      socket.on("disconnect", () => {
        dispatch(wsActions.setSocketsStatus(manager!._readyState));
        dispatch(wsActions.setClosedSockets(true));
        dispatch(wsActions.setOpenedSockets(false));
      });

      socket.connect();
    }
  }),
  send: createAsyncThunk('ws/send', async (payload: unknown[]) => {
    socket?.send(...payload);
  }),
  joinChat: createAsyncThunk('ws/joinChat', async (chatId: string) => {
    socket?.emit("joinChat", chatId);
  }),
}