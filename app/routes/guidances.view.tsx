import { v4 as uuidv4 } from 'uuid';
import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/middlewares/is-authenticate.middleware";
import { IGuidance } from "~/utils/typedefs";

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: "post",
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        detail: "",
        guidance: {
          id: uuidv4(),
          text: '',
          is_read: false,
          title: '',
          sub_guidances: []
        } as IGuidance
      });
    }
  })
  .make();