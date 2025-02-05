import { createAction, Dispatch } from '@reduxjs/toolkit';
import { Manager, Socket } from "socket.io-client";
import { AppThunk } from "~/store";
import { wsSlice } from "~/store/slices/ws.slice";

export let socket: Socket | null = null;

export const wsActions = {
  sendMessageRequest: createAction(
    'ws/sendMessageRequest',
    ({ values, resolve, send }) => {
      return {
        payload: values,
        meta: { resolve, send },
      };
    },
  ),
  connect: (nsp: string): AppThunk => (dispatch: Dispatch) => {
    if (!socket) {
      const manager = new Manager({autoConnect: false});
      socket = manager.socket(nsp);

      socket.on("connect", () => {
        dispatch(wsSlice.actions.setClosedSockets(false));
        dispatch(wsSlice.actions.setOpenedSockets(true));
      });

      socket.on("disconnect", () => {
        dispatch(wsSlice.actions.setSocketsStatus(manager!._readyState));
        dispatch(wsSlice.actions.setClosedSockets(true));
        dispatch(wsSlice.actions.setOpenedSockets(false));
      });

      socket.connect();
    }
  },
  send: (...args: any[]): AppThunk => () => {
    socket?.send(...args);
  },
  joinChat: (...args: any[]): AppThunk => () => {
    socket?.emit("joinChat", ...args);
  }
}