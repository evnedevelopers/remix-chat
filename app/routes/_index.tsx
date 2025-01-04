import { ActionFunction, json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { getAuthUser, login } from "~/utils/auth.server";
import { AuthForm } from "~/components/forms/AuthForm";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getAuthUser(request);

  if (user) {
    return redirect("/chat");
  }

  return null;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get('_action')
  const username = form.get('username');
  const password = form.get('password');

  const isInvalid = typeof username !== 'string' || typeof password !== 'string';

  if (isInvalid) {
    return json({ error: 'Invalid Form Data', form: action });
  }

  return login({ username, password });
}

export default function Index() {
  return (
    <AuthForm />
  );
}
