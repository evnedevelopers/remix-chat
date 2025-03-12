import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";
import { MessageService } from "../../../services/message/message.service";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'post',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request, params }) => {
      const authorId = request.authUser!.id;
      const messageId = Number(params.messageId);
      const { rate = null } = await request.json()

      const message = await MessageService.getUserMessage(authorId, messageId);

      if (rate === null) {
        await MessageService.removeMessageAction(messageId, authorId);
        message.messageRate = (message.messageRate as { authorId: number; messageId: number }[])
          .filter((item) => item.authorId !== authorId);

        return json(message);
      }

      const [messageRate] = await MessageService.createOrUpdateMessageAction({ authorId, messageId, rate });

      message.messageRate = [
        messageRate,
        ...(
          message.messageRate as (typeof messageRate)[])
          .filter(( {id }) => id !== messageRate.id
        ),
      ]

      return json(message);
    }
  })
  .make();