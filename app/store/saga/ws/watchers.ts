import * as effects from 'redux-saga/effects';
import { sendMessageRequest } from "~/store/saga/ws/workers/sendMessageRequest";
import { wsActions } from "~/store/saga/ws/actions";

function* watchSendMessageRequest() {
  yield effects.takeEvery(
    wsActions.sendMessageRequest.type,
    sendMessageRequest,
  );
}

export function* watchWs() {
  yield effects.all([
    effects.call(watchSendMessageRequest),
    // INJECT
  ]);
}