// entity types

export interface IProjectEntity {
  id: string;
  name: string;
  description: string;
  icon_dark: string;
  icon_light: string;
}

export interface IChatEntity {
  id: string;
  name: string;
  created_at: string;
  participantIds: IUser['id'][];
  projectId: IProjectEntity['id'];
  waiting_user_response: boolean | null;
}

export interface IMessageEntity {
  id: string;
  text: string;
  author: string;
  audio?: string | null;
  created_at: string;
  message_rate: boolean | null;
  saved_at: string | null;
  chatId?: string;
  projectId?: string;
  humanMessageId?: number;
  type?: string;
  tokenIndex?: number;
  continueStatus?: boolean;
  nextToken?: boolean;
  show_create_chat_message: boolean;
}

// response types

export interface IProjects extends IProjectEntity {
  chats: IChat[];
  years: [];
  guidances: []
}

export interface IChat extends Omit<IChatEntity, 'participantIds' | 'projectId'> {
  number_of_messages: number;
  messages: IMessages | null;
  files: [];
  is_file_context: boolean;
}

export interface IMessages {
  status?: boolean;
  count?: number;
  results: IMessage[];
}

export interface IMessage extends IMessageEntity {
  project: IMessageProject | null;
  images: [];
  fork_chat: IForkChat | null;
  chat: IMessageChat | null;
  suggestingQuestions?: any;
  files: [];
}

export interface IMessageChat {
  id: string;
  name: string;
  project: IMessageChatProject | null;
  created_at: string;
}

export interface IMessageChatProject {
  id: string;
  name: string;
}

export interface IMessageProject {
  id: string;
  name: string;
  icon_light: string;
  icon_dark: string;
}

export interface IForkChat {
  id: string;
  name: string;
  project: { id: string; name: string; } | null;
  created_at: string;
}













export interface IUser {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  tokens: number;
  token_question_price: number;
  token_visualization_price: number;
  token_story_price: number;
  on_boarding: boolean;
  paypal_payment_status?: string;
  visual_adjustments?: boolean;
  show_update_modal_window?: boolean;
  subscription: {
    limits: number;
    visualize_limits: number;
    storyteller_limit: number;
    token_story_price: number;
    paypal_status?: string;
    subscription_plan: {
      code: string;
      paypal_plan_id?: string;
      price: string;
    };
    subscription_coupon: {
      subscription_type: Record<string, string>
    }
  }
}








export interface IChatFile {}

export interface IScaleImage {
  type: string;
  image: string;
  short_image: string;
  ratio: string;
  separator: string;
  chatId: number;
  isSwap?: boolean;
  id?: number | string;
  isShare: boolean;
  isDelete?: boolean;
  // eslint-disable-next-line
  handleDelete?: any;
}