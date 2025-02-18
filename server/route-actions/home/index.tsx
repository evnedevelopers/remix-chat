import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { AuthService } from "../../services/auth/auth.service";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    actionFunction: async ({ request }) => {
      const authService = new AuthService(request);
      const user = await authService.authUser();

      if (user) {
        return redirect("/chat");
      }

      return null;
    }
  })
  .make();

export const action: ActionFunction = new RouteAction()
  .addMethod({
    method: 'post',
    actionFunction: async ({ request }) => {
      const form = await request.formData();

      const action = form.get('_action')
      const username = form.get('username');
      const password = form.get('password');

      const isInvalid = typeof username !== 'string' || typeof password !== 'string';

      console.log({ username, password, isInvalid });

      if (isInvalid) {
        return json({ error: 'Invalid Form Data', form: action });
      }

      const authService = new AuthService(request);

      return authService.login(username, password);
    }
  })
  .make();