import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";

import { projectsActions } from "~/store/bus/projects/projects.actions";
import { profileActions } from "~/store/bus/profile/profile.actions";
import { wsActions } from "~/store/bus/ws/ws.actions";
import { IProjects } from "~/store/bus/projects/typedefs";
import { IProfile } from "~/store/bus/profile/typedefs";
import { AppDispatch } from "~/store";

export interface ILoaderFunctionResult {
  authUser: IProfile;
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

  console.table(projects);

  dispatch(projectsActions.fillProjects(projects));
  dispatch(profileActions.fillProfile(authUser));

  useEffect(() => {
    dispatch(wsActions.connect('/'));
  }, []);

  return (
    <ChatIndexView />
  )
}