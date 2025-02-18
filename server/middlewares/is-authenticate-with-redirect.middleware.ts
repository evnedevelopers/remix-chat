import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { AuthService } from "server/services/auth/auth.service";
import { MiddlewareFunction } from "./typedefs";

export const isAuthenticateWithRedirect: MiddlewareFunction<ActionFunctionArgs> = async (args) => {
  const authService = new AuthService(args.request);
  const authUser = await authService.authUser();

  if (!authUser) {
    const session = await authService.userSession();

    throw redirect('/', {
      headers: {
        'Set-Cookie': await authService.storage.destroySession(session),
      }
    });
  }

  args.request.authUser = authUser;

  return args;
}