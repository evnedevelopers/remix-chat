import { json, LoaderFunction } from "@remix-run/node";
import { getAuthUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = getAuthUser(request);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return json({
    audio_recording_limit: 1000,
    time_left_to_visualize: 1000,
  })
}