export type FillChatsActionPayload = IChat[];
export type FillAddChatFileActionPayload = IChatFile;
export type FillMessagesActionPayload = IMessages;
export type PushMoreMessagesActionPayload = IMessages;
// INJECT

//common types__________________________________

export interface IChat {
  id: number;
  name: string;
}

export interface IChatFile {
  id: number;
  file: string;
  createdAt: string;
  filename: string;
  error?: boolean;
}

export interface IMessages {
  status?: boolean;
  count?: number;
  results: IMessage[];
}

export interface IMessage {
  id: number | string;
  text: string;
  author: { id: number | string; };
  audio?: string | null;
  createdAt: string;
  messageRate: { id: number; authorId: number; action: string}[];
  savedAt: { id: number; createdAt: string; authorId: number }[];
  chatId?: number;
  projectId?: number;
  type?: string;
  tokenIndex?: number;
  continueStatus?: boolean;
  nextToken?: boolean;
  project: {
    id: number;
    name: string;
    iconLight: string;
    iconDark: string;
  };
  showCreateChatMessage: boolean;
  images: IMessageImage[];
  forkChat: {
    id: number;
    name: string;
    project: {
      id: number;
      name: string;
    };
    createdAt: string;
  } | null;
  chat: {
    id: number;
    name: string;
    project: {
      id: number;
      name: string;
    };
    createdAt: string;
  };
  suggestingQuestions?: ISuggestingQuestions;
  files: IChatFile[];
}

export interface ISuggestingQuestions {
  isSkeleton: boolean;
  questions: string[];
}

export interface IMessageImage {
  id: number | string;
  image: string | null;
  createdAt: string;
  ratio: string | null;
  deletedAt: string | null;
  error?: boolean | string;
  chatId?: number;
  shortImage?: string;
}

export interface IScrollToLoadingImageId {
  imageId: number;
  chatId: number;
  projectId: number;
}

export interface ITooltip {
  id: number | string;
  isBackground: boolean;
  isOpacityBackground: boolean;
}
