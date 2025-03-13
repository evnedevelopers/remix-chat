import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import { Box } from "@mui/material";

import { Modals } from "app/components/modals/Modals";
import { registeredModals } from "~/components/modals/registeredModals";

import { ChatIndexView } from "~/segments/chat/view/ChatIndexView";

import { projectsActions } from "~/store/bus/projects/projects.actions";
import { profileActions } from "~/store/bus/profile/profile.actions";
import { wsActions } from "~/store/bus/ws/ws.actions";
import { IProjects } from "~/store/bus/projects/typedefs";
import { IProfile } from "~/store/bus/profile/typedefs";
import { IMessages } from "~/store/bus/chat/typedefs";
import { AppDispatch } from "~/store";
import SideMenu, {drawerWidth} from "~/components/common/SideMenu";
import AppNavbar from "~/components/common/AppNavbar";

export interface ILoaderFunctionResult {
  authUser: IProfile;
  projects: IProjects[];
  messages: IMessages;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Chat" },
    { name: "description", content: "Welcome to Remix Chat!" }
  ]
}

export { loader } from "../../server/http/route-actions/chat";

export default function ChatIndex() {
  const dispatch = useDispatch<AppDispatch>();

  const { projects, messages, authUser } = useLoaderData<ILoaderFunctionResult>();

  dispatch(projectsActions.fillProjects(projects));
  dispatch(profileActions.fillProfile(authUser));
  dispatch(projectsActions.fillMessages({
    data: messages,
    chatId: projects[0].chats[0].id
  }));

  useEffect(() => {
    dispatch(wsActions.connect('/'));
  }, []);

  return (
    <>
      <Modals registeredModals={registeredModals} />
      <SideMenu />
      <Box
        component="main"
        sx={{
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { md: 'auto' }
        }}>
        <AppNavbar />
        <ChatIndexView />
      </Box>
    </>
  )
}