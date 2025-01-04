import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { Server } from "socket.io";

type InitSocketContextArgs = LoaderFunctionArgs['context'] & { io?: Server };

export const initSocket = ({ io }: InitSocketContextArgs) => {
  io?.emit("server-event", { message: "Hello from the server!" });
}