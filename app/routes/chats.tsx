import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/http/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/http/middlewares/is-authenticate.middleware";
import { IChat } from "~/store/bus/projects/typedefs";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: "post",
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async ({ request }) => {
      const { name } = await request.json();

      return json({} as IChat);
    }
  })
  .make();