import { v4 as uuidv4 } from "uuid";
import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/middlewares/is-authenticate.middleware";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        id: uuidv4(),
        text: '',
        author: '',
        created_at: new Date().toString(),
        message_rate: false,
        saved_at: null,
        show_create_chat_message: true,
        project: null,
        images: [],
        fork_chat: null,
        chat: null,
        file: [],
        suggestingQuestions: null,
      });
    }
  })
  .make()