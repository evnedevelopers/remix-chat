import { PromiseReject, PromiseResolve } from "~/helpers/prepareActions";

export type ServerFormErrors = {
  error: { details: { [key: string]: string[] } };
};

export type PromiseMetaPayload = { resolve: PromiseResolve; reject: PromiseReject };
export type WithMetaPayload<P, M = undefined> =
  M extends undefined
    ? { payload: P }
    : { payload: P; meta: M };

export type LoadMessages = {
  url: string;
  chatId: number;
  isNext?: boolean;
  isPrev?: boolean;
}
export type NewChat = {
  name: string,
  projectId: number;
  projectName: string;
}
export type UpdateChat = {
  id: number;
  waitingUserResponse: boolean;
}
export type DeleteChatFile = {
  chatId: number;
  fileId: number;
}
export type FetchMessageAudio = {
  messageId: number | string;
}
export type PostRate = {
  rate: boolean | null;
  messageId: number;
  chatId: number | null;
}
export type SaveMessage = {
  messageId: number;
  project: number;
}
export type DeleteMessage = {
  messageId: number;
  isLastMessage?: boolean;
  isSavedPage?: boolean;
  project: number;
}
export type FetchMessagesSaved = {
  projectId: number;
}
export type SendMessageRequest = {
  event: string;
  app: string;
  action: string;
  data: Record<string, unknown>;
}

export type FetchMessagesPayload = number;
export type LoadMoreMessagesPayload = WithMetaPayload<LoadMessages>;
export type LoadPrevMessagesPayload = WithMetaPayload<LoadMessages, Omit<PromiseMetaPayload, 'reject'>>;
export type CreateNewChatPayload = WithMetaPayload<NewChat, PromiseMetaPayload>;
export type UpdateChatPayload = WithMetaPayload<UpdateChat, PromiseMetaPayload>;
export type DeleteChatFilePayload = WithMetaPayload<DeleteChatFile, PromiseMetaPayload>;
export type FetchMessageAudioPayload = WithMetaPayload<FetchMessageAudio, PromiseMetaPayload>;
export type PostRatePayload = WithMetaPayload<PostRate, PromiseMetaPayload>;
export type ReadGuidancePayload = {
  guidanceId: number;
  subguidanceId: number | null;
  projectId: number;
};
export type SaveMessagePayload = WithMetaPayload<SaveMessage, PromiseMetaPayload>;
export type DeleteSavedMessagePayload = WithMetaPayload<DeleteMessage>;
export type FetchMessagesSavedPayload = WithMetaPayload<FetchMessagesSaved>;
export type SendMessageRequestPayload = WithMetaPayload<SendMessageRequest, Partial<PromiseMetaPayload>>;