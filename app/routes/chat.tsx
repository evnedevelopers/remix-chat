import { json, LoaderFunction, MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/components/segments/chat/view/ChatIndexView";

import { authenticate } from "~/utils/auth.server";
import { findUserChat } from "~/utils/chat.server";
import { findChatMessages } from "~/utils/message.server";
import { IChat, IMessage, IUser } from "~/utils/typedefs";

export interface ILoaderFunctionResult {
  authUser: IUser;
  chat: Exclude<IChat, 'participants'> & { participants: IUser[] };
  messages: IMessage[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Chat" },
    { name: "description", content: "Welcome to Remix Chat!" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const authUser = await authenticate(request);
  const chat = findUserChat(authUser.id);
  const messages = findChatMessages(chat.id);

  return json({
    authUser,
    chat,
    messages
  } as ILoaderFunctionResult);
}

export default function ChatIndex() {
  return (
    <ChatIndexView />
  )
}