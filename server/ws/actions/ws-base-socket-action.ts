import { Socket } from "socket.io-client";
import { Server } from "socket.io";

export type MessageData = {
  action: string;
  app: string;
  event: string;
  data: unknown;
};

export abstract class WsBaseMessageAction<T = unknown> {
  constructor(
    protected readonly socket: Socket,
    protected readonly io: Server,
    protected readonly data: T,
  ) {}

  abstract handle(): Promise<unknown>;
}