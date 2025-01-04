export interface IUser {
  id: string;
  username: string;
  password?: string;
  fullName: string;
}

export interface IChat {
  id: string;
  name: string;
  participants: string[];
}

export interface IMessage {
  id: string;
  text: string;
  chatId: string;
  authorId: string;
  createdAt: string;
}