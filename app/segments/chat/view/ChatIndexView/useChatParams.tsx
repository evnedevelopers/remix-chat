import { useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import { ILoaderFunctionResult } from "~/routes/chat";

export const useChatParams = () => {
  const { projects } = useLoaderData<ILoaderFunctionResult>();

  return useMemo(() => {
    return {
      projectName: projects[0]?.name,
      chatId: projects[0]?.chats[0]?.id,
    }
  }, [projects]);
}