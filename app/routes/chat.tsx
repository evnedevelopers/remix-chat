import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";

import { authenticate } from "~/utils/auth.server";
import { IUser, IProjects } from "~/utils/typedefs";
import { findUserProjects } from "~/utils/project.server";

import { projectsSlice } from "~/store/slices/projects.slice";
import { profileSlice } from "~/store/slices/profile.slice";

import { wsActions } from "~/store/saga/ws/actions";
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

export const loader: LoaderFunction = async ({ request }) => {
  const authUser = await authenticate(request);
  const projects = findUserProjects(authUser.id);

  return json({
    authUser,
    projects,
  } as ILoaderFunctionResult);
}

export default function ChatIndex() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, authUser } = useLoaderData<ILoaderFunctionResult>();

  dispatch(projectsSlice.actions.fillProjects(projects));
  dispatch(profileSlice.actions.fillProfile(authUser));

  useEffect(() => {
    dispatch(wsActions.connect('/'));
  }, []);

  return (
    <ChatIndexView />
  )
}