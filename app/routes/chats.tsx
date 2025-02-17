import { v4 as uuidv4 } from 'uuid';
import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/middlewares/is-authenticate.middleware";
import { IChat } from "~/utils/typedefs";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: "post",
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request }) => {
      const { name } = await request.json();

      return json({
        id: uuidv4(),
        name,
        created_at: new Date().toString(),
        waiting_user_response: null,
        number_of_messages: 0,
        messages: {
          status: false,
          results: [],
          count: 0,
        },
        files: [],
        is_file_context: false
      } as IChat);
    }
  })
  .make();