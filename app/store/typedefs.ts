import {
  IChat,
  IChatFile,
  IGuidance,
  IMessage,
  IMessages,
  IProjects, ISavedMessages, ISavedProjects,
  IUser
} from "~/utils/typedefs";

export interface IScaleImage {
  type: string;
  image: string;
  short_image: string;
  ratio: string;
  separator: string;
  chatId: string;
  isSwap?: boolean;
  id?: string;
  isShare: boolean;
  isDelete?: boolean;
  handleDelete?: any;
}
export interface IProjectCurrent {
  id: string;
  icon: string;
  icon_light: string;
  icon_dark: string;
  name: string;
  description: string;
}
export interface IAutoName {
  created_at: string;
  id: string;
  name: string;
  number_of_messages: number;
}
export interface ITooltip {
  id: string;
  isBackground: boolean;
  isOpacityBackground: boolean;
}

export interface ISuggestingQuestions {
  isSkeleton: boolean;
  questions: string[];
}

export interface ISettings {
  audio_recording_limit: number;
  time_left_to_visualize: number;
}

export interface IScrollToLoadingImageId {
  imageId: string;
  chatId: string;
  projectId: string;
}

export interface ISession {
  id: string;
  months: ISessionMonth[];
}
export interface ISessionMonth {
  id: string;
  is_live?: boolean;
  is_next_session?: boolean;
  sessions: ISessionItem[];
}

export interface ISessionItem {
  end_at: string;
  id: number | string;
  start_at: string;
  messages: IMessagesPagination | null;
  nextSession?: boolean;
  is_completed: boolean;
  project_description: string;
}

export interface ISessionNextItem {
  end_at: string;
  id: number;
  start_at: string;
  is_completed?: boolean | null;
  detail?: string;
  nextSession?: boolean;
  project_description: string;
}

export interface IMessagesPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: IMessage[];
}

export type FillChatsActionPayload = IChat[];

export type FillProfileActionPayload = IUser;
export type ChangePhotoActionPayload = {
  photo: string | null;
};
export type UpdateGuidanceActionPayload = {
  guide: IGuidance;
  projectId: string;
};
export type ChangeChatActionPayload = {
  id: string;
  name: string;
};
export type FillTokensSettingsActionPayload = {
  token_question_price: number;
  token_visualization_price: number;
  token_story_price: number;
  min_tokens: number;
  max_tokens: number;
  token_price: number;
  token_metametric_price: number;
};
export type FillSettingsActionPayload = ISettings;
export type FillVisualizePromptActionPayload = {
  messageId: string;
  prompt: string;
};
export type FillAddChatFileActionPayload = IChatFile;
export type FillProjectMatchingActionPayload = IProjectCurrent;
export type FillMessageChatActionPayload = {
  new_chat: {
    id: string;
    name: string;
    number_of_messages: number;
    created_at: string;
    waiting_user_response: boolean | null;
    files: IChatFile[];
    is_file_context: boolean;
  };
  new_message: IMessage;
  original_message: IMessage;
};
export type FillAutoNameActionPayload = IAutoName;
export type FillMessageAudioActionPayload = {
  audio: string;
  messageId: string;
};
export type AddChatActionPayload = IChat;
export type FillSaveMessageActionPayload = IMessage;
export type FillProjectsActionPayload = IProjects[];
export type FillMessagesActionPayload = IMessages;
export type PostRateActionPayload = {
  chatId: string | null;
  message_id: string;
  rate: boolean;
};
export type FetchSavedMessagesActionPayload = ISavedProjects[];
export type FillSavedMessagesActionPayload = ISavedProjects[];
export type PushMoreSavedMessagesActionPayload = ISavedMessages;

export type FillThemeActionPayload = ThemeVariant;

export type PushMoreMessagesActionPayload = IMessages;

export type FillNextSessionActionPayload = ISessionNextItem;
export type FillSessionsActionPayload = ISessionItem[];
export type FillGuidanceActionPayload = {
  detail: string;
  guidance: IGuidance;
};
export type ServerFormErrors = {
  error: { details: { [key: string]: string[] } };
};

export type FormErrors = {
  [key: string]: any;
};


//common types__________________________________
export enum ThemeVariant {
  dark = 'dark',
  light = 'light',
}