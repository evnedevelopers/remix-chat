import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../../server/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/middlewares/is-authenticate.middleware";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        count: 0,
        next: null,
        previous: null,
        results: []
      });
    }
  })
  .make()