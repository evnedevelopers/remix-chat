import { ActionFunctionArgs }  from "@remix-run/node";
import { AuthService } from "server/services/auth/auth.service";
import { MiddlewareFunction } from "./typedefs";

export const isAuthenticateMiddleware: MiddlewareFunction<ActionFunctionArgs> = async (args) => {
  const authUser = await AuthService.make(args.request).authUser();

  if (!authUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  args.request.authUser = authUser;

  return args;
}