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

export interface IProjects {
  id: string;
  name: string;
  chats: IChat[],
  years: [],
  description: string;
  icon_light: string;
  icon_dark: string;
  guidances: [];
}

export interface IChat {
  id: string;
  name: string;
  description: string;
  participants: string[];
}

export interface IMessage {
  id: string;
  text: string;
  chatId: string;
  authorId: string;
  createdAt: string;
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
  handleDelete?: any;
}