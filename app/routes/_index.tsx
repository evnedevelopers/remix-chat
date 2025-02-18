import { MetaFunction } from "@remix-run/node";
import { AuthForm } from "~/components/forms/AuthForm";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export { loader, action } from "server/route-actions/home";

export default function Index() {
  return (
    <AuthForm />
  );
}
