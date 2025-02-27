import { v4 as uuidv4 } from 'uuid';
import { ActionFunction, json } from "@remix-run/node";
import { RouteAction } from "../../server/http/route-actions/route-action";
import { isAuthenticateMiddleware } from "../../server/http/middlewares/is-authenticate.middleware";
import { IGuidance } from '~/store/bus/projects/typedefs';

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: "post",
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        detail: "",
        guidance: {
          id: 1,
          text: '',
          isRead: false,
          title: '',
          subGuidances: []
        } as IGuidance
      });
    }
  })
  .make();