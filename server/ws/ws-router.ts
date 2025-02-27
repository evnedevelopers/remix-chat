import { Socket } from "socket.io-client";
import { MessageData, WsBaseMessageAction } from "./actions/ws-base-socket-action";
import { Server } from "socket.io";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteAction = new (socket: Socket, io: Server, data: any) => WsBaseMessageAction;

export class WsRouter {
  private routes: Map<string, RouteAction> = new Map();

  async handleMessageAction(data: MessageData, socket: Socket, io: Server) {
    const key = this.getRouteKey(data);
    const RouteAction = this.routes.get(key);

    if (!RouteAction) {
      console.log(`RouteAction not implemented: ${key}`);
      return;
    }

    const route = new RouteAction(socket, io, data.data);
    return route.handle();
  }

  addRoute(key: Omit<MessageData, 'data'>, action: RouteAction) {
    this.routes.set(this.getRouteKey(key), action);

    return this;
  }

  private getRouteKey(params: Omit<MessageData, 'data'>) {
    return `${params.app}:${params.event}:${params.action}`;
  }
}