import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";

import { useSocketContext } from "~/segments/chat/view/ChatIndexView/SocketContext";

import { ILoaderFunctionResult } from "~/routes/chat";

import { IMessage } from "~/utils/typedefs";


export const useChatSocket = () => {
  const { projects, authUser } = useLoaderData<ILoaderFunctionResult>();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.emit("joinChat", projects[0].chats[0].id);

      socket.on("receiveMessage", (payload: IMessage) => {
        console.log(payload);
      });
    }

    return () => {
      socket?.off("receiveMessage");
    }
  }, [projects, authUser, socket]);
}