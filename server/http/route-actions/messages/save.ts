import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";
import { MessageService } from "../../../services/message/message.service";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'post',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request, params }) => {
      const { messageId } = params;

      const saved = await MessageService.markAsSaved({
        authorId: request.authUser!.id, messageId: Number(messageId)
      })

      return json({ saved });
    }
  })
  .make();