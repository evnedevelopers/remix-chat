import {
  createContext,
  FC,
  ReactNode, useContext,
  useMemo,
  useState
} from "react";
import { useLoaderData } from "@remix-run/react";
import { ILoaderFunctionResult } from "~/routes/chat";
import { IUser } from "~/utils/typedefs";

export type ChatIndexContextValue = {
  profile: IUser;
  ws: {
    socketStatus: string;
    isClosedSockets: boolean;
    isOpenedSockets: boolean;
  }
}

const ChatIndexContext = createContext<ChatIndexContextValue | null>(null);

export const ChatIndexContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const data = useLoaderData<ILoaderFunctionResult>();
  const [profile] = useState<IUser>(data.authUser);
  const [ws] = useState<ChatIndexContextValue['ws']>({
    socketStatus: '',
    isOpenedSockets: false,
    isClosedSockets: true,
  })

  const value = useMemo(() => {
    return {
      profile,
      ws
    }
  }, [profile, ws]);

  return (
    <ChatIndexContext.Provider value={value}>
      {children}
    </ChatIndexContext.Provider>
  );
}

type CustomSelector = (context: ChatIndexContextValue) => ChatIndexContextValue[keyof ChatIndexContextValue];

export const useChatIndexSelector = (selector: CustomSelector) => {
  const context = useContext(ChatIndexContext);
  if (!context) throw new Error('ChatIndexContext should be initialized before.');

  return useMemo(() => {
    return selector(context);
  }, [context, selector]);
}