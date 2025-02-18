import { RouteAction } from "../route-action";
import { json, LoaderFunction } from "@remix-run/node";
import { isAuthenticateWithRedirect } from "../../middlewares/is-authenticate-with-redirect.middleware";
import { ProjectService } from "../../services/project/project.service";

export interface ILoaderFunctionResult {
  authUser: { id: number; };
  projects: { id: number; }[];
}

export const loader: LoaderFunction = new RouteAction()
  .addMethod(
    {
      method: 'get',
      middlewares: [isAuthenticateWithRedirect],
      actionFunction: async ({ request }) => {
        const projects = await ProjectService.findUserProjects(request.authUser!.id);

        return json({
          authUser: request.authUser,
          projects,
        } as ILoaderFunctionResult);
      }
    }
  )
  .make();
