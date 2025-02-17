import { LoaderFunction } from "@remix-run/node";
import { logout } from "~/utils/auth.server";
import { RouteAction } from "../../server/route-actions/route-action";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    actionFunction: async ({ request }) => {
      return logout(request);
    }
  })
  .make();