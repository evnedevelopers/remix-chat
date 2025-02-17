import { PromiseReject, PromiseResolve } from "~/helpers/prepareActions";

export type PromiseMetaPayload = { resolve: PromiseResolve; reject: PromiseReject };
export type WithMetaPayload<P, M = undefined> =
  M extends undefined
    ? { payload: P }
    : { payload: P; meta: M };

export type LoadMessages = {
  url: string;
  chatId: string;
  isNext?: boolean;
  isPrev?: boolean;
}
export type NewChat = {
  name: string,
  project_id: string;
  projectName: string
}
export type UpdateChat = {
  id: string;
  waiting_user_response: boolean;
}
export type DeleteChatFile = {
  chatId: string;
  fileId: string;
}
export type FetchMessageAudio = {
  messageId: string;
}
export type PostRate = {
  rate: boolean | null;
  message_id: string;
  chatId: string | null;
}
export type SaveMessage = {
  message_id: string;
  project: string;
}
export type DeleteMessage = {
  message_id: string;
  isLastMessage?: boolean;
  isSavedPage?: boolean;
  project: string;
}
export type FetchMessagesSaved = {
  projectId: string;
}
export type SendMessageRequest = {
  event: string;
  app: string;
  action: string;
  data: Record<string, any>;
}

export type FetchMessagesPayload = string;
export type LoadMoreMessagesPayload = WithMetaPayload<LoadMessages>;
export type LoadPrevMessagesPayload = WithMetaPayload<LoadMessages, Omit<PromiseMetaPayload, 'reject'>>;
export type CreateNewChatPayload = WithMetaPayload<NewChat, PromiseMetaPayload>;
export type UpdateChatPayload = WithMetaPayload<UpdateChat, PromiseMetaPayload>;
export type DeleteChatFilePayload = WithMetaPayload<DeleteChatFile, PromiseMetaPayload>;
export type FetchMessageAudioPayload = WithMetaPayload<FetchMessageAudio, PromiseMetaPayload>;
export type PostRatePayload = WithMetaPayload<PostRate, PromiseMetaPayload>;
export type ReadGuidancePayload = {
  guidance_id: string;
  subguidance_id: string | null;
  projectId: string;
};
export type SaveMessagePayload = WithMetaPayload<SaveMessage, PromiseMetaPayload>;
export type DeleteSavedMessagePayload = WithMetaPayload<DeleteMessage>;
export type FetchMessagesSavedPayload = WithMetaPayload<FetchMessagesSaved>;
export type SendMessageRequestPayload = WithMetaPayload<SendMessageRequest, Partial<PromiseMetaPayload>>;