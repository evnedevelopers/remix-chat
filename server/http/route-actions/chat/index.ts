import { RouteAction } from "../route-action";
import { json, LoaderFunction } from "@remix-run/node";
import { isAuthenticateWithRedirect } from "../../middlewares/is-authenticate-with-redirect.middleware";
import { ProjectService } from "../../../services/project/project.service";

export interface ILoaderFunctionResult {
  authUser: { id: number; };
  projects: { id: number; }[];
}

export const loader: LoaderFunction = new RouteAction()
  .addMethod(
    {
      method: 'get',
      middlewares: [isAuthenticateWithRedirect],
      actionFunction: async ({ request }) => {
        const userId = request.authUser!.id;

        const projects = await ProjectService.findUserProjects(userId);
        const messages = await ProjectService.findUserChatMessages({
          userId,
          chatId: (projects[0].chats as { id: number }[])[0].id,
        });

        return json({
          authUser: request.authUser,
          projects,
          messages,
        } as ILoaderFunctionResult);
      }
    }
  )
  .make();
