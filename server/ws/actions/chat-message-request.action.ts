import { WsBaseMessageAction } from "./ws-base-socket-action";
import { MessageService } from "../../services/message/message.service";

type MessageActionData = {
  query: string;
  projectId: number;
  projectName: string;
  chatId: number;
  authorId: number;
  continue: null;
  datasetMatching: boolean;
}

export class ChatMessageRequestAction extends WsBaseMessageAction<MessageActionData> {
  async handle() {
    const { query, chatId, authorId, projectName } = this.data;
    const message = await MessageService.create({
      text: query,
      chatId,
      authorId,
    });

    this.io
      .to(chatId.toString())
      .emit("receiveMessage", {
        message,
        projectName,
        chatId
      });
  }
}