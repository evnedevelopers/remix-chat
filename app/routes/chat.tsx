import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import {json, LoaderFunction, MetaFunction} from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";

import { IUser, IProjects } from "~/utils/typedefs";

import { projectsActions } from "~/store/actions/projects.actions";
import { profileActions } from "~/store/actions/profile.actions";
import { wsActions } from "~/store/actions/ws.actions";
import { AppDispatch } from "~/store";

export interface ILoaderFunctionResult {
  authUser: IUser;
  projects: IProjects[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Chat" },
    { name: "description", content: "Welcome to Remix Chat!" }
  ]
}

export { loader } from "server/route-actions/chat";

export default function ChatIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, authUser } = useLoaderData<ILoaderFunctionResult>();

  dispatch(projectsActions.fillProjects(projects));
  dispatch(profileActions.fillProfile(authUser));

  useEffect(() => {
    dispatch(wsActions.connect('/'));
  }, []);

  return (
    <ChatIndexView />
  )
}