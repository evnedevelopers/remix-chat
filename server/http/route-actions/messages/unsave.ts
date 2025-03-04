import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";
import { MessageService } from "../../../services/message/message.service";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'delete',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ params, request }) => {
      const authorId = request.authUser!.id;
      const messageId = Number(params.messageId);

      const message = await MessageService.getUserMessage(authorId, messageId);
      await MessageService.unmarkSaved({ authorId, messageId });

      message.savedAt = (message.savedAt as { messageId: number; authorId: number }[])
        .filter((entity) => !(entity.messageId === messageId && entity.authorId === authorId));

      return json(message);
    }
  })
  .make();