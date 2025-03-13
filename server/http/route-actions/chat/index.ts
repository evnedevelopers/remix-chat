import { RouteAction } from "../route-action";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { isAuthenticateWithRedirect } from "../../middlewares/is-authenticate-with-redirect.middleware";
import { ProjectService } from "../../../services/project/project.service";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";
import { ChatService } from "../../../services/chat/chat.service";

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

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'PUT',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request, params }) => {
      const data = await request.json();

      const chatId = Number(params.chatId);
      const name = data.name || '';

      if (!name.trim().length) {
        return json({ name: "Name is required" }, { status: 400 });
      }

      const isUserChat = await ChatService.isUserChat(request.authUser!.id, chatId);

      if (!isUserChat) {
        throw new Response("Forbidden", { status: 403 });
      }

      await ChatService.updateChatName(chatId, name);

      return json({ id: chatId, name });
    }
  })
  .make()
