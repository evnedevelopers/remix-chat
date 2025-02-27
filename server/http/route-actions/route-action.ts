import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { MiddlewareFunction } from "../middlewares/typedefs";

export type AddLoaderOptions = {
  method: 'get' | 'GET';
  middlewares?: MiddlewareFunction[];
  actionFunction: LoaderFunction;
}
export type AddActionOptions = {
  method: string;
  middlewares?: MiddlewareFunction[];
  actionFunction: ActionFunction;
}
export type AddMethodOptions = AddLoaderOptions | AddActionOptions;

export interface RouteActionInterface {
  make: () => ActionFunction | LoaderFunction;
  addMethod: (options: AddMethodOptions) => RouteActionInterface;
}

export class RouteAction implements RouteActionInterface {
  private availableMethods = new Map<string, { middlewares: MiddlewareFunction[], action: ActionFunction | LoaderFunction; }>();

  public addMethod({ method, middlewares = [], actionFunction }: AddMethodOptions) {
    method = method.toUpperCase();

    const availableMethod = this.availableMethods.get(method);
    if (!availableMethod) this.availableMethods.set(method, { middlewares, action: actionFunction });

    return this;
  }

  public make() {
    const action: ActionFunction = async (args) => {
      const { request } = args;
      const actionFunction = this.availableMethods.get(request.method.toUpperCase());

      if (actionFunction === undefined) {
        throw new Response("Method Not Allowed", {
          status: 405,
          statusText: "Method Not Allowed",
        });
      }

      const executeSequentially = async () => {
        return actionFunction.middlewares.reduce(async (acc, middleware) => {
          return await middleware(await acc);
        }, Promise.resolve(args));
      };

      args = await executeSequentially();

      return actionFunction.action(args);
    }

    return action;
  }
}