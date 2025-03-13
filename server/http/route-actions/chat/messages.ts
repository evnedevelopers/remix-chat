import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";
import { ProjectService } from "../../../services/project/project.service";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ params, request }) => {
      const chatId = Number(params.chatId);
      const userId = request.authUser!.id;
      const url = new URL(request.url);
      const ltId = url.searchParams.get("lt_id");
      const mtId = url.searchParams.get("mt_id");

      const messages = await ProjectService.findUserChatMessages({
        chatId,
        userId,
        mtId: mtId ? +mtId : undefined,
        ltId: ltId ? +ltId : undefined
      });

      return json(messages);
    }
  })
  .make();