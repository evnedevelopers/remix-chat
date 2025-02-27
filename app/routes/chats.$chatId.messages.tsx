import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../../server/http/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/http/middlewares/is-authenticate.middleware";
import { ProjectService } from "../../server/services/project/project.service";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ params, request }) => {
      const chatId = Number(params.chatId);
      const userId = request.authUser!.id;

      const messages = await ProjectService.findUserChatMessages({ chatId, userId });

      return json(messages);
    }
  })
  .make();