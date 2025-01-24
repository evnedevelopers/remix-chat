export enum PaymentPlatform {
  app_store = 'app_store',
  paypal = 'paypal',
  play_market = 'play_market',
}

export enum SubPlansCode {
  free = 'free',
  basicAnnual = 'basic_annual',
  premiumAnnual = 'premium_annual',
  ultimateAnnual = 'ultimate_annual',
  basicMonthly = 'basic_monthly',
  premiumMonthly = 'premium_monthly',
  ultimateMonthly = 'ultimate_monthly',
}

// entity types

export interface IGuidanceEntity {
  id: string;
  text: string;
  is_read: boolean;
  title: string;
  parentId?: IGuidanceEntity['id'];
}

export interface IUserEntity {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo: string | null;
  date_of_birth: string | null;
  gender: string | null;
  on_boarding: boolean;
  paypal_payment_status: string | null;
  ennealogy_number: number | null;
  visual_adjustments: boolean;
  show_update_modal_window: boolean;
  tokens: number;
  token_question_price: number;
  token_visualization_price: number;
  token_story_price: number;
  min_tokens: number;
  max_tokens: number;
  token_price: number;
  token_metametric_price: number;
}

export interface ISubscriptionEntity {
  uuid: string;
  userId: IUserEntity['id'];
  subscription_plan_id: ISubscriptionPlanEntity['id'];
  subscription_coupon_id: ISubscriptionCouponEntity['uuid'];
  payment_platform: PaymentPlatform | null;
  paypal_subscription_id: string;
  paypal_status: string | null;
  limits: number;
  metametric_limit: number;
  storyteller_limit: number;
  visualize_limits: number;
  available_until: string;
  next_subscription_plan_id?: ISubscriptionPlanEntity['id'] | null;
  tokens: number;
}

export interface ISubscriptionPlanEntity {
  id: string;
  code: SubPlansCode;
  name: string;
  price_title: string;
  header: null | string;
  text_line_1: null | string;
  text_line_2: null | string;
  text_line_3: null | string;
  text_line_4: null | string;
  text_line_5: null | string;
  interval_unit: string;
  plan_limit: number;
  plan_visualize_limit: number;
  plan_metametric_limit: number;
  plan_visualize_minute_limit: number;
  plan_storyteller_prompt_limit: number;
  plan_storyteller_prompt_image_limit: number;
  plan_storyteller_limit: number;
  price: string;
  paypal_plan_id: null | string;
  created_at: string;
}

export interface ISubscriptionCouponEntity {
  uuid: string;
  subscription_type: Omit<ISubscriptionPlanEntity, 'id' | 'price_title' | 'interval_unit' | 'price' | 'paypal_plan_id' | 'created_at'>
    & {
    plan_tokens: string,
    trial_period_days: number
  };
}

export interface IInvoiceEntity {
  id: string;
  created_at: string;
  invoice_number: string;
  invoice_pdf: string | null;
  subscription_id: ISubscriptionEntity['uuid'];
}

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
  participantIds: IUserEntity['id'][];
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
  humanMessageId?: string;
  type?: string;
  tokenIndex?: number;
  continueStatus?: boolean;
  nextToken?: boolean;
  show_create_chat_message: boolean;
}

export interface IChatFileEntity {
  id: string;
  file: string;
  created_at: string;
  file_name: string;
  error?: boolean;
}

// response types

export interface IGuidance extends Omit<IGuidanceEntity, 'parentId'> {
  sub_guidances: Omit<IGuidance, 'sub_guidances'>[];
}

export interface IUser extends IUserEntity {
  subscription: null | ISubscription;
}

export interface ISubscription extends ISubscriptionEntity {
  subscription_plan: ISubscriptionPlan;
  subscription_coupon: ISubscriptionCoupon;
  next_subscription_plan: ISubscriptionPlan | null;
  invoice: IInvoice;
}

export interface ISubscriptionPlan extends ISubscriptionPlanEntity {}

export interface ISubscriptionCoupon extends ISubscriptionCouponEntity {}

export interface IInvoice extends Omit<IInvoiceEntity, 'subscription_id'> {}

export interface IProjects extends IProjectEntity {
  chats: IChat[];
  years: IYearChat[];
  guidances: IGuidance[];
}

export interface ISavedProjects {
  id: string;
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
  id: string;
  created_at: string;
  saved_at: string;
  project: {
    id: string;
    name: string;
    icon_light: string;
    icon_dark: string;
  };
  show_create_chat_message: boolean;
  message_rate: null | boolean;
  text: string;
  author: string;
  images: IMessageImage[];
  chat: IChat;
  fork_chat: null | IChat;
  files: IChatFile[];
}

export interface IChat extends Omit<IChatEntity, 'participantIds' | 'projectId'> {
  number_of_messages: number;
  messages: IMessages | null;
  files: IChatFile[];
  is_file_context: boolean;
}

export interface IMessages {
  status?: boolean;
  count?: number;
  results: IMessage[];
}

export interface IMessage extends IMessageEntity {
  project: IMessageProject | null;
  images: IMessageImage[];
  fork_chat: IForkChat | null;
  chat: IMessageChat | null;
  suggestingQuestions?: any;
  files: any[];
}

export interface IMessageImage {
  id: string;
  image: string | null;
  created_at: string;
  ratio: string | null;
  deleted_at: string | null;
  error?: boolean | string;
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

export interface IYearChat {
  id: string;
  months: IMonthChat[];
}

export interface IMonthChat {
  id: string;
  chats: IChat[];
}

export interface IChatFile extends IChatFileEntity {}