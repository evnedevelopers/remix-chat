import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/http/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/http/middlewares/is-authenticate.middleware";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'post',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({});
    }
  })
  .make();