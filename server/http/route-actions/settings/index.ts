import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      return json({
        audio_recording_limit: 1000,
        time_left_to_visualize: 0,
      })
    }
  })
  .make();