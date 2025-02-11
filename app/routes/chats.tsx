import { ActionFunction, json } from "@remix-run/node";
import { authenticate } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toUpperCase() !== "POST") {
    throw new Response("Method Not Allowed", {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  const authUser = await authenticate(request);

  if (!authUser) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const { name } = await request.json();

  return json({ name });
}