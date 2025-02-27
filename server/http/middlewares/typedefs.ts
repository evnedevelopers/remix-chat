import { ActionFunctionArgs } from "@remix-run/node";

export type MiddlewareFunction<T = ActionFunctionArgs> = (args: ActionFunctionArgs) => Promise<T>;