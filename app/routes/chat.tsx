import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";
import { SocketProvider } from "~/segments/chat/view/ChatIndexView/SocketContext";

import { authenticate } from "~/utils/auth.server";
import { IChat, IMessage, IUser, IProjects } from "~/utils/typedefs";
import { findUserProjects } from "~/utils/project.server";

import { projectsSlice } from "~/store/slices/projects.slice";

export interface ILoaderFunctionResult {
  authUser: IUser;
  chat: Exclude<IChat, 'participants'> & { participants: IUser[] };
  messages: IMessage[];
  // eslint-disable-next-line
  projects: Array<IProjects & Record<string, any>>;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Chat" },
    { name: "description", content: "Welcome to Remix Chat!" }
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const authUser = await authenticate(request);
  const projects = findUserProjects(authUser.id);

  return json({
    authUser,
    projects
  } as ILoaderFunctionResult);
}

export default function ChatIndex() {
  const dispatch = useDispatch();
  const { projects } = useLoaderData<ILoaderFunctionResult>();

  useEffect(() => {
    dispatch(projectsSlice.actions.fillProjects(projects));
  }, [dispatch, projects]);

  return (
    <SocketProvider>
      <ChatIndexView />
    </SocketProvider>
  )
}