import { LoaderFunction } from "@remix-run/node";
import { logout } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return logout(request);
}