import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/middlewares/is-authenticate.middleware";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'delete',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({});
    }
  })
  .make();