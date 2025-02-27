import { v4 as uuidv4 } from 'uuid';
import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/http/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/http/middlewares/is-authenticate.middleware";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'PUT',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        id: uuidv4(),
        name: 'Updated Chat'
      });
    }
  })
  .make()