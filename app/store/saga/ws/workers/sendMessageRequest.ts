import * as effects from 'redux-saga/effects';

import { put } from 'redux-saga/effects';

import { wsSlice } from "~/store/slices/ws.slice";
import { chatSlice } from "~/store/slices/chat.slice";
import { wsActions } from "~/store/saga/ws/actions";
import { handleError } from "~/store/saga/ui/workers/handleError";

export function* sendMessageRequest({
  payload,
  meta: { resolve },
}: any) {
  try {
    yield effects.put(wsSlice.actions.setSocketsStatus('SEND'));
    yield effects.put(wsSlice.actions.setClosedSockets(false));
    yield effects.put(wsSlice.actions.startFetching());
    if (payload.event !== 'visualize' && payload.app === 'chat') {
      yield effects.put(chatSlice.actions.startTyping());
    }

    yield put(wsActions.send(payload));

    if (payload.event === 'visualize') {
      yield effects.put(chatSlice.actions.startIsImageLoading());
    }

    if (resolve !== undefined) {
      resolve();
    }
  } catch (e) {
    yield handleError(e);
  } finally {
    yield effects.put(wsSlice.actions.stopFetching());
  }
}
