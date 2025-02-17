import { ActionFunctionArgs }  from "@remix-run/node";
import { MiddlewareFunction } from "./typedefs";
import { authenticate } from "~/utils/auth.server";

export const isAuthenticateMiddleware: MiddlewareFunction<ActionFunctionArgs> = async (args) => {
  const authUser = await authenticate(args.request);

  if (!authUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  (args.request as any).user = authUser

  return args;
}