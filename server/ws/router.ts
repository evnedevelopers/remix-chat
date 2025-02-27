import { WsRouter } from "./ws-router";
import { ChatMessageRequestAction } from "./actions/chat-message-request.action";
import { ChatTypingRequestAction } from "./actions/chat-typing-request.action";

const wsRouter = new WsRouter();
wsRouter.addRoute({ action: 'request', app: 'chat', event: 'message' }, ChatMessageRequestAction);
wsRouter.addRoute({ action: 'request', app: 'chat', event: 'typing' }, ChatTypingRequestAction);

export { wsRouter };