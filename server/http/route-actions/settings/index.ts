import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        audioRecordingLimit: 60,
        timeLeftToVisualize: 60,
      })
    }
  })
  .make();