import { IChatFile, IMessageImage } from "~/store/bus/chat/typedefs";

export type FetchSavedMessagesActionPayload = ISavedProjects[];
export type FillSavedMessagesActionPayload = ISavedProjects[];
export type FillSaveMessageActionPayload = ISavedMessage;
export type PushMoreSavedMessagesActionPayload = ISavedMessages;
// INJECT

//common types__________________________________

export interface ISavedProjects {
  id: number;
  name: string;
  description: string;
  messages: ISavedMessages | null;
}

export interface ISavedMessages {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISavedMessage[];
}

export interface ISavedMessage {
  id: number;
  createdAt: string;
  savedAt: { createdAt: string; id: number; authorId: number; }[];
  project: {
    id: number;
    name: string;
    iconLight: string;
    iconDark: string;
  };
  showCreateChatMessage: boolean;
  messageRate: null | boolean;
  text: string;
  author: { id: number | string; };
  images: IMessageImage[];
  chat: IChat;
  forkChat: null | IChat;
  files: IChatFile[];
}

export interface IChat {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
  createdAt: string;
}
