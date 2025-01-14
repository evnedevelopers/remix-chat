import { json, LoaderFunction, MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";
import { SocketProvider } from "~/segments/chat/view/ChatIndexView/SocketContext";

import { authenticate } from "~/utils/auth.server";
import { findUserChat } from "~/utils/chat.server";
import { findChatMessages } from "~/utils/message.server";
import { IChat, IMessage, IUser, IProjects } from "~/utils/typedefs";
import { findUserProjects } from "~/utils/project.server";
import {useLoaderData} from "@remix-run/react";
import {useEffect} from "react";
import {projectsSlice} from "~/store/slices/projects.slice";

export interface ILoaderFunctionResult {
  authUser: IUser;
  chat: Exclude<IChat, 'participants'> & { participants: IUser[] };
  messages: IMessage[];
  projects: IProjects[];
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
  const projects = findUserProjects(authUser.id);

  return json({
    authUser,
    chat,
    messages,
    projects
  } as ILoaderFunctionResult);
}

export default function ChatIndex() {
  const { projects } = useLoaderData<ILoaderFunctionResult>();

  useEffect(() => {
    projectsSlice.actions.fillProjects(projects);
  }, [projects]);

  return (
    <SocketProvider>
      <ChatIndexView />
    </SocketProvider>
  )
}