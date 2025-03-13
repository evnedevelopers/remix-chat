import fs from "fs/promises";
import path from "path";
import { LoaderFunction } from "@remix-run/node";
import { RouteAction } from "../route-action";
import { isAuthenticateMiddleware } from "../../middlewares/is-authenticate.middleware";

export const loader: LoaderFunction = new RouteAction()
  .addMethod({
    method: 'get',
    middlewares: [isAuthenticateMiddleware],
    actionFunction: async () => {
      const filePath = path.join(process.cwd(), "server/http/route-actions/messages/mock", "Gotcha!!!.mp3");

      try {
        const fileBuffer = await fs.readFile(filePath);
        const blob = new Blob([fileBuffer], { type: "audio/mpeg" });

        return new Response(blob, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Length": blob.size.toString(),
            "Content-Disposition": "inline; filename=Gotcha!!!.mp3",
          },
        });
      } catch (error) {
        return new Response("File not found", { status: 404 });
      }
    }
  })
  .make();