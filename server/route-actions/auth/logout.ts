import { LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { AuthService } from "../../services/auth/auth.service";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    actionFunction: async ({ request }) => {
      const authService = new AuthService(request);

      return authService.logout();
    }
  })
  .make();