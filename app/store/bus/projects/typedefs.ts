import { IChatFile, IMessage, IMessages } from "~/store/bus/chat/typedefs";

//payload types_________________________________
export type FillProjectsActionPayload = IProjects[];
export type PostRateActionPayload = {
  chatId: number | null;
  messageId: number;
  rate: boolean;
};
export type UpdateGuidanceActionPayload = {
  guide: IGuidance;
  projectId: number;
};
export type FillGuidanceActionPayload = {
  detail: string;
  guidance: IGuidance;
};
export type ChangeChatActionPayload = {
  id: number;
  name: string;
};
export type AddChatActionPayload = IChat;
export type FillMessageAudioActionPayload = {
  audio: string;
  messageId: number;
};
export type FillVisualizePromptActionPayload = {
  messageId: number;
  prompt: string;
};
export type FillAutoNameActionPayload = IAutoName;
export type FillMessageChatActionPayload = {
  newChat: {
    id: number;
    name: string;
    numberOfMessages: number;
    createdAt: string;
    waitingUserResponse: boolean | null;
    files: IChatFile[];
    isFileContext: boolean;
  };
  newMessage: IMessage;
  originalMessage: IMessage;
};
export type FillProjectMatchingActionPayload = IProjectCurrent;
// INJECT

//common types__________________________________

export interface IAutoName {
  createdAt: string;
  id: number;
  name: string;
  numberOfMessages: number;
}

export interface IProjectMatching {
  status: boolean;
  project: IProjectCurrent;
}

export interface IProjectCurrent {
  id: number;
  icon: string;
  iconLight: string;
  iconDark: string;
  name: string;
  description: string;
}

export interface IProjects {
  id: number;
  name: string;
  chats: IChat[];
  years: IYearChat[];
  description: string;
  iconDark: string;
  iconLight: string;
  guidances: IGuidance[];
}

export interface IGuidance {
  id: number;
  text: string;
  isRead: boolean;
  title: string;
  subGuidances: Omit<IGuidance, 'subGuidances'>[];
}

export interface IChat {
  id: number;
  name: string;
  createdAt: string;
  numberOfMessages: number;
  waitingUserResponse: boolean | null;
  messages: IMessages | null;
  files: IChatFile[];
  isFileContext: boolean;
}

export interface IYearChat {
  id: number;
  months: IMonthChat[];
}

export interface IMonthChat {
  id: string;
  chats: IChat[];
}

