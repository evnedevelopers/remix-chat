import { IMessage } from "~/utils/typedefs";

export interface IProjects {
  id: number;
  name: string;
  description: string;
  iconDark: string;
  iconLight: string;
  chats: IChat[];
}
export interface IChat {
  id: number;
  name: string;
  createdAt: string;
  numberOfMessages: number;
  messages: IMessages | null;
  files: IChatFile[];
}
export interface IMessages {
  status?: boolean;
  count?: number;
  results: IMessage[];
}
export interface IChatFile {}