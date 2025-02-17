import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";

import { authenticate } from "~/utils/auth.server";
import { IUser, IProjects } from "~/utils/typedefs";
import { findUserProjects } from "~/utils/project.server";

import { projectsActions } from "~/store/actions/projects.actions";
import { profileActions } from "~/store/actions/profile.actions";
import { wsActions } from "~/store/actions/ws.actions";
import { AppDispatch } from "~/store";
import { isAuthenticateMiddleware } from "server/middlewares/is-authenticate.middleware";
import { RouteAction } from "server/route-actions/route-action";
import { db } from "server/services/db";

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

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request }) => {
      const result = await db.query.usersTable.findMany();

      console.log({ result });

      const authUser = await authenticate(request);
      const projects = findUserProjects(authUser.id);

      return json({
        authUser,
        projects,
      } as ILoaderFunctionResult);
    }
  })
  .make();

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