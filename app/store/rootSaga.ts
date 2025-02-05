import { all, call } from 'redux-saga/effects';

import { watchWs as wsSaga } from './saga/ws/watchers';

export function* rootSaga() {
  yield all([
    call(wsSaga),
  ])
}