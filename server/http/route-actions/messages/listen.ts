import { json, LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";

export const action: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'post',
    middlewares: [],
    actionFunction: async () => {
      return json({
        text: 'Gotcha!!!'
      });
    }
  })
  .make();