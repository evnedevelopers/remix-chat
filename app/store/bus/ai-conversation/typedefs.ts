//payload types_________________________________
export type FillNextSessionActionPayload = ISessionNextItem;
export type FillMessagesActionPayload = IMessagesPagination;
export type FillMessageAudioActionPayload = {
  audio: string;
  messageId: number;
  sessionId: number;
};
// INJECT

//common types__________________________________

export interface ISession {
  id: number;
  months: ISessionMonth[];
}
export interface ISessionMonth {
  id: string;
  isLive?: boolean;
  isNextSession?: boolean;
  sessions: ISessionItem[];
}

export interface ISessionItem {
  endAt: string;
  id: number | string;
  startAt: string;
  messages: IMessagesPagination | null;
  nextSession?: boolean;
  isCompleted: boolean;
  projectDescription: string;
}
export interface ISessionNextItem {
  endAt: string;
  id: number;
  startAt: string;
  isCompleted?: boolean | null;
  detail?: string;
  nextSession?: boolean;
  projectDescription: string;
}

export interface IMessagesPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: IMessage[];
}

export interface IMessage {
  id: number | string;
  createdAt: string;
  type: string;
  text: string | null;
  images: IMessageImage[] | null;
  audio?: string | null;
  isLive?: boolean;
  audios: IMessageAudio[];
  dataset: {
    id: number;
    project: {
      description: string;
      id: number;
      name: string;
    };
  };
}

export interface IMessageImage {
  id: number | string;
  createdAt: string;
  image: string;
  error?: boolean;
  ratio: string | null;
}

export interface IMessageAudio {
  id: number | string;
  order: string;
  audio: string;
  createdAt: string;
}